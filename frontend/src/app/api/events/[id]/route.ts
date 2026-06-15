import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { getBackendApiUrl } from '@/lib/getBackendApiUrl';
import { AUTH_COOKIE_NAME } from '@/lib/authCookie';

async function getAuthHeaders() {
  const token = (await cookies()).get(AUTH_COOKIE_NAME)?.value;
  if (!token) return null;
  return { Authorization: `Bearer ${token}` };
}

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const authHeaders = await getAuthHeaders();
  if (!authHeaders) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id } = await params;
  const apiUrl = await getBackendApiUrl();
  const backendRes = await fetch(`${apiUrl}/events/${id}`, {
    headers: authHeaders,
    cache: 'no-store',
  });

  const json = await backendRes.json();
  return NextResponse.json(json, { status: backendRes.status });
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const authHeaders = await getAuthHeaders();
  if (!authHeaders) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id } = await params;
  const apiUrl = await getBackendApiUrl();
  const body = await req.json();

  const backendRes = await fetch(`${apiUrl}/events/${id}`, {
    method: 'PUT',
    headers: { ...authHeaders, 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  const json = await backendRes.json();
  return NextResponse.json(json, { status: backendRes.status });
}
