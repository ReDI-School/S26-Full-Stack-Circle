import { NextRequest, NextResponse } from 'next/server';
import { backendFetch } from '@/lib/backendClient';

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const backendRes = await backendFetch(req, `/events/${id}/attend`, { method: 'POST' });

  const json = await backendRes.json();

  return NextResponse.json(json, {
    status: backendRes.status,
  });
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const backendRes = await backendFetch(req, `/events/${id}/attend`, { method: 'DELETE' });

  if (backendRes.status === 204) {
    return new NextResponse(null, { status: 204 });
  }

  const json = await backendRes.json();

  return NextResponse.json(json, {
    status: backendRes.status,
  });
}
