// src/hooks/useAuth.ts
import { useState } from 'react';
import { loginRequest } from 'src/service/authService';

export function useAuth() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);

  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true);
      setError(undefined);

      const data = await loginRequest(email, password);

      return data; // token
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred');
      }
    } finally {
      setLoading(false);
      setTimeout(() => {
        setError(undefined);
      }, 3000);
    }
  };

  return { signIn, loading, error };
}
