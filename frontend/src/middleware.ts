import { jwtVerify } from 'jose';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

const PUBLIC_AUTH_PATHS = ['/sign-in', '/sign-up'];
const ALWAYS_PUBLIC_PATHS = ['/network-error'];

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

  // bypass auth entirely — accessible to both authenticated and unauthenticated users
  if (ALWAYS_PUBLIC_PATHS.some((path) => pathname.startsWith(path))) {
    return NextResponse.next();
  }

  const isPublicAuthPath = PUBLIC_AUTH_PATHS.some((path) => pathname.startsWith(path));
  const authenticated = token ? await isValidToken(token) : false;

  if (!isPublicAuthPath && !authenticated) {
    return NextResponse.redirect(new URL('/sign-in', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
