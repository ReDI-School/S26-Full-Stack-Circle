import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { getBackendApiUrl } from '@/lib/getBackendApiUrl';
import { AUTH_COOKIE_NAME } from '@/lib/authCookie';

export async function GET(request: NextRequest) {
  const token = (await cookies()).get(AUTH_COOKIE_NAME)?.value;
  if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { searchParams } = new URL(request.url);
  const filter = searchParams.get('filter');
  const apiUrl = await getBackendApiUrl();
  const url = filter ? `${apiUrl}/events?filter=${filter}` : `${apiUrl}/events`;

  const backendRes = await fetch(url, {
    headers: { Authorization: `Bearer ${token}` },
    cache: 'no-store',
  });

  const json = await backendRes.json();
  return NextResponse.json(json, { status: backendRes.status });
}

export async function POST(request: Request) {
  const token = (await cookies()).get(AUTH_COOKIE_NAME)?.value;

  if (!token) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const apiUrl = await getBackendApiUrl();
  const body = await request.json();

  const backendRes = await fetch(`${apiUrl}/events`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });

  const json = await backendRes.json();
  return NextResponse.json(json, { status: backendRes.status });
}
