import { NextRequest, NextResponse } from 'next/server';
import { backendFetch } from '@/lib/backendClient';
import { jsonHeaders } from '@/lib/forwardAuthHeaders';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const filter = searchParams.get('filter');

  const query = filter ? `/events?filter=${filter}` : '/events';

  const backendRes = await backendFetch(request, query, {
    method: 'GET',
    cache: 'no-store',
  });

  const json = await backendRes.json();

  return NextResponse.json(json, {
    status: backendRes.status,
  });
}

export async function POST(request: NextRequest) {
  const body = await request.json();

  const backendRes = await backendFetch(request, '/events', {
    method: 'POST',
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
