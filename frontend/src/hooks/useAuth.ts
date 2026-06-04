import { useState } from 'react';
import { loginRequest } from '@service/authService';
import { LoginInput } from '@validators/schemas';
import { config } from '../config';

interface UserData {
  name: string;
  initials: string;
}

export default function useAuth() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>();
  const [user, setUser] = useState<UserData | null>(null);
  const signOut = async () => {
    try {
      const { apiUrl } = await config();
      await fetch(`${apiUrl}/auth/logout`, { method: 'POST', credentials: 'include' });
    } finally {
      setUser(null);
    }
  };

  const goToProfile = () => {
    // TODO: Implement navigation to profile page
  };

  const signIn = async (data: LoginInput) => {
    try {
      setLoading(true);
      setError(undefined);

      const loggedUser: UserData = await loginRequest(data);
      setUser(loggedUser);

      return true;
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred');
      }
      return;
    } finally {
      setLoading(false);
    }
  };

  return { signIn, loading, error, goToProfile, signOut, user, setUser };
}
