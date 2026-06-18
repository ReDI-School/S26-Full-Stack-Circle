import { NextRequest, NextResponse } from 'next/server';
import { backendFetch } from '@/lib/backendClient';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const filter = searchParams.get('filter');

  const path = filter
    ? `/events/user/events?filter=${encodeURIComponent(filter)}`
    : '/events/user/events';

  const backendRes = await backendFetch(request, path, {
    method: 'GET',
    cache: 'no-store',
  });

  const json = await backendRes.json();
  return NextResponse.json(json, { status: backendRes.status });
}
