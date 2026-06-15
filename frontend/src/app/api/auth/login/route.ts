import { NextResponse } from 'next/server';
import { getBackendApiUrl } from '@/lib/getBackendApiUrl';

export async function POST(request: Request) {
  const body = await request.json();
  const apiUrl = await getBackendApiUrl();

  const backendRes = await fetch(`${apiUrl}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  const json = await backendRes.json();

  if (!backendRes.ok) {
    return NextResponse.json(json, { status: backendRes.status });
  }

  const response = NextResponse.json(json);

  const setCookie = backendRes.headers.get('set-cookie');

  if (setCookie) {
    response.headers.set('set-cookie', setCookie);
  }

  return response;
}
