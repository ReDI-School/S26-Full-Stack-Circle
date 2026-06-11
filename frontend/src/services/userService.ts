import { config } from '@config';

export interface UpdateUserData {
  firstName: string;
  lastName: string;
  password?: string;
}

export async function updateUserRequest(userId: string, data: UpdateUserData): Promise<void> {
  const { apiUrl } = await config();
  const body: Record<string, string> = {
    firstName: data.firstName,
    lastName: data.lastName,
  };
  if (data.password) body.password = data.password;

  const res = await fetch(`${apiUrl}/users/${userId}`, {
    method: 'PUT',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err?.error || 'Update failed.');
  }
}
