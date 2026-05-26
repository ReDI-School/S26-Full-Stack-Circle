export async function loginRequest(email: string, password: string) {
  const api_url = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

  console.log(`${api_url}/auth/login`);

  const res = await fetch(`${api_url}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    const error = await res.json().catch(() => null);
    throw new Error(error?.error || 'Login failed');
  }

  return res.json();
}
