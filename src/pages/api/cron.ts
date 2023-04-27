import { render } from '@react-email/render';
import { type NextApiHandler } from 'next';

import { AccountReadyEmail } from '~/components/emails';
import { env } from '~/env.mjs';
import { client as postmark } from '~/server/postmark';
import { prisma } from '~/server/prisma';

/**
 * Cron jobs are invoked only for production deployments on Vercel.
 * Preview deployments are ignored.
 *
 * https://vercel.com/docs/cron-jobs#deploy-your-project.
 */

const handler: NextApiHandler = async (req, res) => {
  if (req.query.key !== '220658bdc8') {
    res.status(404).end();
    return;
  }

  if (env.NEXT_PUBLIC_WAITLIST_ENABLED) {
    const users = await prisma.user.findMany({
      where: { status: 'waitlist' },
      take: 10,
      orderBy: { createdAt: 'asc' },
    });

    for (const user of users) {
      await prisma.user.update({
        where: { id: user.id },
        data: { status: 'pending' },
      });

      await postmark
        .sendEmail({
          From: env.POSTMARK_FROM_EMAIL,
          To: user.email,
          Subject: 'Welcome to Rocket!',
          HtmlBody: render(AccountReadyEmail({ name: user.firstName })),
        })
        // fail silently
        .catch(() => {});
    }
  }

  return res.status(200).end('Success!');
};

export default handler;
