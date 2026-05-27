export type LoginResponse = {
  token: string;
};

export async function loginRequest(email: string, password: string): Promise<LoginResponse> {
  const api_url = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

  const res = await fetch(`${api_url}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data?.error || 'Login failed');
  }

  return data;
}
