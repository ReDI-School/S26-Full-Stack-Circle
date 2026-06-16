import { NextRequest, NextResponse } from 'next/server';
import { backendFetch } from '@/lib/backendClient';
import { jsonHeaders } from '@/lib/forwardAuthHeaders';

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const backendRes = await backendFetch(req, `/events/${id}`, {
    method: 'GET',
    cache: 'no-store',
  });

  const json = await backendRes.json();

  return NextResponse.json(json, {
    status: backendRes.status,
  });
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const body = await req.json().catch(() => null);

  const backendRes = await backendFetch(req, `/events/${id}`, {
    method: 'PUT',
    headers: {
      ...jsonHeaders,
    },
    body: JSON.stringify(body),
  });

  const json = await backendRes.json();

  return NextResponse.json(json, {
    status: backendRes.status,
  });
}
