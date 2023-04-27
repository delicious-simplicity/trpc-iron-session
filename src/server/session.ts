import type { IronSessionOptions } from 'iron-session';
import { env } from '~/env.mjs';

export const sessionOptions: IronSessionOptions = {
  password: env.IRON_SESSION_PASSWORD,
  cookieName: '__session',
  ttl: 604800, // 1 week (in seconds)
  cookieOptions: {
    sameSite: 'strict',
    secure: env.NODE_ENV === 'production',
  },
};

export interface IronSessionUser {
  id: string;
}

// This is where we specify the typings of req.session.*
declare module 'iron-session' {
  interface IronSessionData {
    user?: IronSessionUser;
  }
}
