import { NextRequest } from 'next/server';

export function forwardAuthHeaders(req: NextRequest) {
  return {
    cookie: req.headers.get('cookie') || '',
  };
}

export const jsonHeaders = {
  'Content-Type': 'application/json',
};
