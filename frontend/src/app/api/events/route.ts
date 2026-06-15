import { NextRequest, NextResponse } from 'next/server';
import { getBackendApiUrl } from '@/lib/getBackendApiUrl';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const filter = searchParams.get('filter');

  const apiUrl = await getBackendApiUrl();
  const url = filter ? `${apiUrl}/events?filter=${filter}` : `${apiUrl}/events`;

  const backendRes = await fetch(url, {
    cache: 'no-store',
    headers: {
      cookie: request.headers.get('cookie') || '',
    },
  });

  const json = await backendRes.json();

  return NextResponse.json(json, {
    status: backendRes.status,
  });
}

export async function POST(request: NextRequest) {
  const apiUrl = await getBackendApiUrl();
  const body = await request.json();

  const backendRes = await fetch(`${apiUrl}/events`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      cookie: request.headers.get('cookie') || '',
    },
    body: JSON.stringify(body),
  });

  const text = await backendRes.text();
  console.log('BACKEND RESPONSE:', backendRes.status, text);

  const json = await backendRes.json();

  return NextResponse.json(json, {
    status: backendRes.status,
  });
}
