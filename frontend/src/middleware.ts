import { jwtVerify } from 'jose';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

const PUBLIC_AUTH_PATHS = ['/sign-in', '/sign-up'];

async function isValidToken(token: string): Promise<boolean> {
  const secret = process.env.JWT_SECRET;
  if (!secret) return false;

  try {
    await jwtVerify(token, new TextEncoder().encode(secret));
    return true;
  } catch {
    return false;
  }
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get('token')?.value;

  const isAuthPath = PUBLIC_AUTH_PATHS.some((path) => pathname.startsWith(path));
  const authenticated = token ? await isValidToken(token) : false;

  if (authenticated && isAuthPath) {
    //return NextResponse.redirect(new URL('/events', request.url));
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  if (!authenticated && !isAuthPath) {
    return NextResponse.redirect(new URL('/sign-in', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
