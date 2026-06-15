import { NextRequest, NextResponse } from 'next/server';
import { forwardAuthHeaders } from '@/lib/forwardAuthHeaders';
import { getBackendApiUrl } from '@/lib/getBackendApiUrl';

export async function GET(req: NextRequest) {
  const apiUrl = await getBackendApiUrl();

  const backendRes = await fetch(`${apiUrl}/auth/me`, {
    cache: 'no-store',
    headers: forwardAuthHeaders(req),
  });

  const json = await backendRes.json();

  return NextResponse.json(json, {
    status: backendRes.status,
  });
}
