import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { getBackendApiUrl } from '@/lib/getBackendApiUrl';
import {
  AUTH_COOKIE_NAME,
  authCookieOptions,
  extractTokenFromSetCookieHeaders,
} from '@/lib/authCookie';

export async function POST(request: Request) {
  const body = await request.json();
  const apiUrl = await getBackendApiUrl();

  const backendRes = await fetch(`${apiUrl}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  const json = await backendRes.json();

  if (!backendRes.ok) {
    return NextResponse.json(json, { status: backendRes.status });
  }

  const token = extractTokenFromSetCookieHeaders(backendRes.headers);
  if (token) {
    (await cookies()).set(AUTH_COOKIE_NAME, token, authCookieOptions);
  }

  return NextResponse.json(json);
}
