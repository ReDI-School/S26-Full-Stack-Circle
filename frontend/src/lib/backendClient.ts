import { getBackendApiUrl } from './getBackendApiUrl';
import { forwardAuthHeaders } from './forwardAuthHeaders';
import { NextRequest } from 'next/server';

export async function backendFetch(req: NextRequest, path: string, options: RequestInit = {}) {
  const apiUrl = await getBackendApiUrl();

  return fetch(`${apiUrl}${path}`, {
    ...options,
    headers: {
      ...forwardAuthHeaders(req),
      ...(options.headers || {}),
    },
  });
}
