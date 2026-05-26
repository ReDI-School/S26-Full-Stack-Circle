// src/hooks/useAuth.ts
import { useState } from 'react';
import { loginRequest } from 'src/service/eventService';

export function useAuth() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true);
      setError(null);

      const data = await loginRequest(email, password);

      return data; // token
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { signIn, loading, error };
}
