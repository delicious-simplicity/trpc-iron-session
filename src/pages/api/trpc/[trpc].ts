import * as trpcNext from '@trpc/server/adapters/next';
import { withIronSessionApiRoute } from 'iron-session/next';
import { createContext } from '~/server/context';
import { appRouter } from '~/server/routers/_app';
import { sessionOptions } from '~/server/session';

export default withIronSessionApiRoute(
  trpcNext.createNextApiHandler({
    router: appRouter,
    createContext,
    batching: {
      enabled: true,
    },
  }),
  sessionOptions,
);
