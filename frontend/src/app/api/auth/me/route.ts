import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { getBackendApiUrl } from '@/lib/getBackendApiUrl';
import { AUTH_COOKIE_NAME } from '@/lib/authCookie';

export async function GET() {
  const token = (await cookies()).get(AUTH_COOKIE_NAME)?.value;

  if (!token) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const apiUrl = await getBackendApiUrl();
  const backendRes = await fetch(`${apiUrl}/auth/me`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: 'no-store',
  });

  const json = await backendRes.json();
  return NextResponse.json(json, { status: backendRes.status });
}
