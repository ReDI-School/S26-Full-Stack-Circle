import type { ResponseCookie } from 'next/dist/compiled/@edge-runtime/cookies';

export const AUTH_COOKIE_NAME = 'token';

const isProduction = process.env.NODE_ENV === 'production';

export const authCookieOptions: Partial<ResponseCookie> = {
  httpOnly: true,
  secure: isProduction,
  sameSite: 'lax',
  path: '/',
  maxAge: 60 * 10,
};

export function extractTokenFromSetCookieHeaders(headers: Headers): string | null {
  const rawSetCookie = headers.get('set-cookie');
  const setCookies =
    typeof headers.getSetCookie === 'function'
      ? headers.getSetCookie()
      : rawSetCookie
        ? [rawSetCookie]
        : [];

  for (const header of setCookies) {
    if (header.startsWith(`${AUTH_COOKIE_NAME}=`)) {
      return header.split(';')[0].slice(`${AUTH_COOKIE_NAME}=`.length);
    }
  }

  return null;
}
