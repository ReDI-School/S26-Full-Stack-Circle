import { config } from '@config';

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
}

export async function getUserById(id: string, token: string): Promise<User | null> {
  const { apiUrl } = await config();

  const res = await fetch(`${apiUrl}/users/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) return null;

  const { user } = await res.json();

  return { id: user.id, email: user.email, firstName: user.firstName, lastName: user.lastName };
}
