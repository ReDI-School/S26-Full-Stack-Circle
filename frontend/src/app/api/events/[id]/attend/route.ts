import { NextRequest, NextResponse } from 'next/server';
import { getBackendApiUrl } from '@/lib/getBackendApiUrl';
import { forwardAuthHeaders } from '@/lib/forwardAuthHeaders';

async function proxy(method: string, req: NextRequest, id: string) {
  const apiUrl = await getBackendApiUrl();

  const backendRes = await fetch(`${apiUrl}/events/${id}/attend`, {
    method,
    headers: forwardAuthHeaders(req),
  });

  if (method === 'DELETE' && backendRes.status === 204) {
    return new NextResponse(null, { status: 204 });
  }

  const json = await backendRes.json();

  return NextResponse.json(json, {
    status: backendRes.status,
  });
}

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return proxy('POST', req, id);
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return proxy('DELETE', req, id);
}
