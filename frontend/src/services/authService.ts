import { config } from '../config';

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
