import { render } from '@react-email/render';
import { TRPCError } from '@trpc/server';
import { sealData, unsealData } from 'iron-session';
import { Message } from 'postmark';
import { z } from 'zod';
import { WelcomeEmail, MagicLinkEmail, WaitlistEmail } from '~/components/emails';
import { env } from '~/env.mjs';
import { client as postmark } from '~/server/postmark';
import { protectedProcedure, publicProcedure, router } from '~/server/trpc';
import { siteURL } from '~/utils/vercel';

export const authRouter = router({
  signup: publicProcedure
    .input(
      z.object({
        firstName: z.string().min(1, 'First name is required'),
        lastName: z.string().min(1, 'Last name is required'),
        email: z.string().email('Invalid email address').min(1, 'Email address is required'),
      }),
    )
    .output(
      z.object({
        success: z.boolean(),
        waitlist: z.boolean(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      let user = await ctx.prisma.user.findUnique({
        where: { email: input.email },
      });

      if (user) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: `You are already ${user.status === 'waitlist' ? 'on the waitlist' : 'signed up'}`,
        });
      }

      user = await ctx.prisma.user.create({
        data: {
          firstName: input.firstName,
          lastName: input.lastName,
          email: input.email,
          status: env.NEXT_PUBLIC_WAITLIST_ENABLED ? 'waitlist' : 'pending',
        },
      });

      let email: Message = {
        From: env.POSTMARK_FROM_EMAIL,
        To: input.email,
        Subject: '',
      };

      let waitlist = false;

      if (env.NEXT_PUBLIC_WAITLIST_ENABLED) {
        email.Subject = 'You’re on the waitlist';
        email.HtmlBody = render(WaitlistEmail({ name: input.firstName }));
        waitlist = true;
      } else {
        const seal = await sealData(
          { userId: user.id },
          {
            password: env.IRON_SESSION_PASSWORD,
            ttl: 60 * 2, // 2 minutes in seconds
          },
        );

        email.Subject = 'Welcom to Rocket!';
        email.HtmlBody = render(
          WelcomeEmail({
            name: input.firstName,
            magicLink: `${siteURL()}/authenticate?token=${seal}`,
          }),
        );
      }

      await postmark.sendEmail(email);

      return { success: true, waitlist };
    }),

  login: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      let user = await ctx.prisma.user.findUnique({
        where: { email: input.email },
      });

      if (!user) {
        throw new TRPCError({ code: 'BAD_REQUEST', message: `Account does not exist` });
      }

      if (env.NEXT_PUBLIC_WAITLIST_ENABLED && user.status === 'waitlist') {
        throw new TRPCError({ code: 'BAD_REQUEST', message: `You are on the waitlist` });
      }

      const seal = await sealData(
        { userId: user.id },
        {
          password: env.IRON_SESSION_PASSWORD,
          ttl: 60 * 2, // 2 minutes in seconds
        },
      );

      await postmark.sendEmail({
        From: env.POSTMARK_FROM_EMAIL,
        To: input.email,
        Subject: 'Login',
        HtmlBody: render(
          MagicLinkEmail({
            name: user.firstName,
            magicLink: `${siteURL()}/authenticate?token=${seal}`,
          }),
        ),
      });

      return { success: true };
    }),

  authenticate: publicProcedure
    .input(
      z.object({
        token: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      if (!ctx.req || !ctx.res) {
        throw new Error('You are missing `req` or `res` in your call.');
      }

      const data = await unsealData<{ userId: string }>(input.token, {
        password: env.IRON_SESSION_PASSWORD,
        ttl: 60 * 2, // 2 minutes in seconds
      });

      if (!data || !data.userId) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'The magic link is either invalid or has since expired.',
        });
      }

      let isNew = false;

      let user = await ctx.prisma.user.findUniqueOrThrow({
        where: {
          id: data.userId,
        },
      });

      if (user.status === 'pending') {
        user = await ctx.prisma.user.update({
          where: {
            id: user.id,
          },
          data: {
            status: 'active',
          },
        });

        isNew = true;
      }

      ctx.req.session.user = {
        id: user.id,
      };

      await ctx.req.session.save();

      return { ...user, isNew };
    }),

  logout: protectedProcedure.mutation(async ({ ctx }) => {
    ctx.req.session.destroy();

    return { success: true };
  }),
});
