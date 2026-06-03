import { config } from '../config';
import type { RegisterInput } from '@validators/schemas';

export interface RegisterResponse {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
}

export async function loginRequest(email: string, password: string): Promise<void> {
  const { apiUrl } = await config();

  const res = await fetch(`${apiUrl}/auth/login`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data?.error || 'Login failed');
  }
}

export async function registerRequest(
  data: Omit<RegisterInput, 'repeatPassword'>
): Promise<RegisterResponse> {
  const { apiUrl } = await config();

  const res = await fetch(`${apiUrl}/auth/register`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  const json = await res.json();

  if (!res.ok) {
    throw new Error(json?.error || 'Registration failed');
  }

  return json as RegisterResponse;
}
