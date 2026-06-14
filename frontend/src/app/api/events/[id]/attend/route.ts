import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { getBackendApiUrl } from '@/lib/getBackendApiUrl';
import { AUTH_COOKIE_NAME } from '@/lib/authCookie';

async function proxy(method: string, id: string) {
  const token = (await cookies()).get(AUTH_COOKIE_NAME)?.value;
  if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const apiUrl = await getBackendApiUrl();
  const backendRes = await fetch(`${apiUrl}/events/${id}/attend`, {
    method,
    headers: { Authorization: `Bearer ${token}` },
  });

  if (method === 'DELETE' && backendRes.status === 204) {
    return new NextResponse(null, { status: 204 });
  }

  const json = await backendRes.json();
  return NextResponse.json(json, { status: backendRes.status });
}

export async function POST(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return proxy('POST', id);
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return proxy('DELETE', id);
}
