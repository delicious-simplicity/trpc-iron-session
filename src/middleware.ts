import { NextResponse, type NextRequest } from 'next/server';
import { getIronSession } from 'iron-session/edge';
import { sessionOptions } from '~/server/session';

export const config = {
  matcher: ['/dashboard', '/'],
};

export const middleware = async (req: NextRequest) => {
  const res = NextResponse.next();
  const { pathname } = req.nextUrl;

  const session = await getIronSession(req, res, sessionOptions);

  if (session.user && pathname === '/') {
    return NextResponse.redirect(new URL('/dashboard', req.url));
  }

  if (!session.user && pathname === '/dashboard') {
    return NextResponse.redirect(new URL('/', req.url));
  }

  return res;
};
