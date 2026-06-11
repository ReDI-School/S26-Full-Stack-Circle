import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { getBackendApiUrl } from '@/lib/getBackendApiUrl';
import { AUTH_COOKIE_NAME } from '@/lib/authCookie';

export async function POST() {
  const cookieStore = await cookies();
  const token = cookieStore.get(AUTH_COOKIE_NAME)?.value;

  cookieStore.delete(AUTH_COOKIE_NAME);

  if (token) {
    const apiUrl = await getBackendApiUrl();
    await fetch(`${apiUrl}/auth/logout`, {
      method: 'POST',
      headers: { Cookie: `${AUTH_COOKIE_NAME}=${token}` },
    }).catch(() => undefined);
  }

  return NextResponse.json({ ok: true });
}
