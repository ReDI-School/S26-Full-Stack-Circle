import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { AUTH_COOKIE_NAME } from '@/lib/authCookie';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isPublicAuthPath = ['/sign-in', '/sign-up'].some((path) => pathname.startsWith(path));

  const isAlwaysPublic = ['/network-error'].some((path) => pathname.startsWith(path));

  if (isAlwaysPublic) {
    return NextResponse.next();
  }

  const token = request.cookies.get(AUTH_COOKIE_NAME)?.value;

  if (!isPublicAuthPath && !token) {
    return NextResponse.redirect(new URL('/sign-in', request.url));
  }

  if (isPublicAuthPath && token) {
    return NextResponse.redirect(new URL('/events', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
