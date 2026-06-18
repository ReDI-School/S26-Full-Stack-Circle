import { resolveApiUrl } from '@/config/resolveApiUrl';
import { getEnvironment } from '@/config/environment';
import { NextResponse } from 'next/server';

export async function GET() {
  const environment = getEnvironment();
  const apiUrl = await resolveApiUrl(environment);

  return NextResponse.json({ environment, apiUrl });
}
