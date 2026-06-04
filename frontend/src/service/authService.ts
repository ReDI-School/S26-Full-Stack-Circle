import { getInitials } from '@/utils/utils';
import { config } from '../config';
import type { LoginInput, RegisterInput } from '@validators/schemas';

export async function loginRequest(data: LoginInput): Promise<{ name: string; initials: string }> {
  const { apiUrl } = await config();

  const res = await fetch(`${apiUrl}/auth/login`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  const json = await res.json();

  if (!res.ok) {
    throw new Error(json?.error || 'Login failed');
  }

  const firstName = json.user.firstName;
  const lastName = json.user.lastName;
  const initials = getInitials(firstName+' '+lastName);

  return {
    name: `${firstName} ${lastName}`,
    initials: initials,
  };
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
