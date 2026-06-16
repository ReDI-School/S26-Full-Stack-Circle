import { NextRequest, NextResponse } from 'next/server';
import { backendFetch } from '@/lib/backendClient';

export async function GET(req: NextRequest) {
  const res = await backendFetch(req, '/auth/me', {
    method: 'GET',
    cache: 'no-store',
  });

  return NextResponse.json(await res.json(), {
    status: res.status,
  });
}
