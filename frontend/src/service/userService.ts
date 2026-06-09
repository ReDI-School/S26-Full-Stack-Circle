import { config } from '../config';

export async function deleteMe(): Promise<void> {
  const { apiUrl } = await config();

  const res = await fetch(`${apiUrl}/users/me`, {
    method: 'DELETE',
    credentials: 'include',
  });

  if (!res.ok) {
    throw new Error('Delete failed');
  }
}
