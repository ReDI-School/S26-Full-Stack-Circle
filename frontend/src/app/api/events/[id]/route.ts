import { NextRequest, NextResponse } from 'next/server';
import { getBackendApiUrl } from '@/lib/getBackendApiUrl';
import { forwardAuthHeaders, jsonHeaders } from '@/lib/forwardAuthHeaders';

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const apiUrl = await getBackendApiUrl();
  const backendRes = await fetch(`${apiUrl}/events/${id}`, {
    headers: forwardAuthHeaders(req),
    cache: 'no-store',
  });

  const json = await backendRes.json();
  return NextResponse.json(json, { status: backendRes.status });
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const apiUrl = await getBackendApiUrl();
  const body = await req.json().catch(() => null);

  const backendRes = await fetch(`${apiUrl}/events/${id}`, {
    method: 'PUT',
    headers: {
      ...forwardAuthHeaders(req),
      ...jsonHeaders,
    },
    body: JSON.stringify(body),
  });

  const json = await backendRes.json();
  return NextResponse.json(json, { status: backendRes.status });
}
