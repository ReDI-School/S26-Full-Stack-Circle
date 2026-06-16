import { config } from '@config';
import type { LoginInput, RegisterInput } from '@validators/schemas';

export interface AuthUser {
  id: string;
  email: string;
  role: 'USER' | 'ADMIN';
  firstName: string;
  lastName: string;
}

export async function loginRequest(data: LoginInput): Promise<AuthUser> {
  const res = await fetch('/api/auth/login', {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  console.log(`Respuesta: ${res}`);

  const json = await res.json();

  if (!res.ok) {
    throw new Error(json?.error || 'Login failed');
  }

  return json.user;
}

export async function getProfileRequest(): Promise<AuthUser | null> {
  const res = await fetch('/api/auth/me', { credentials: 'include' });
  const json = await res.json();
  if (!res.ok) return null;
  return json.user;
}

export async function logoutRequest(): Promise<void> {
  const res = await fetch('/api/auth/logout', {
    credentials: 'include',
    method: 'POST',
  });
  if (!res.ok) {
    throw new Error('Logout failed');
  }
}

export async function registerRequest(data: Omit<RegisterInput, 'repeatPassword'>): Promise<void> {
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
}
