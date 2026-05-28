import { useState } from 'react';
import { loginRequest } from 'src/service/authService';
//import { tokenStorage } from 'src/utils/tokenStorage';

export function useAuth() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>();

  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true);
      setError(undefined);

      const { token } = await loginRequest(email, password);

      return token;
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  return { signIn, loading, error };
}
