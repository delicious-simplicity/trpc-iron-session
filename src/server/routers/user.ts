import { protectedProcedure, publicProcedure, router } from '~/server/trpc';

export const userRouter = router({
  current: publicProcedure.query(async ({ ctx }) => {
    const session = ctx.req?.session;

    if (!session?.user?.id) return null;

    const user = await ctx.prisma.user.findUniqueOrThrow({
      where: { id: session.user.id },
    });

    return user;
  }),

  delete: protectedProcedure.mutation(async ({ ctx }) => {
    const session = ctx.req.session;

    await ctx.prisma.user.delete({ where: { id: session.user.id } });

    if (ctx.req) {
      session.destroy();
    }

    return { success: true };
  }),
});
