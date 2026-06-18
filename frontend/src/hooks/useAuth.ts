import { useState } from 'react';
import { useAuthContext, useAuthDispatch } from '@/contexts/AuthContext';
import { loginRequest, logoutRequest } from '@services/authService';
import type { LoginInput } from '@validators/schemas';
import { useRouter } from 'next/navigation';
interface UserData {
  name: string;
  initials: string;
}

const MOCK_USER: UserData = { name: 'Fabio Rodrigues', initials: 'FR' };

export default function useAuth() {
  const { authUser, isHydrating } = useAuthContext();
  const { setAuthUser } = useAuthDispatch();
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState<string | undefined>();
  const [user, setUser] = useState<UserData | null>(null);
  const router = useRouter();

  const signOut = async () => {
    try {
      setLoading(true);
      setError(undefined);
      await logoutRequest();
      return true;
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred');
      }
    } finally {
      setLoading(false);
      setAuthUser(null);
      router.push('/sign-in');
    }
  };

  const signIn = async (data: LoginInput) => {
    try {
      setLoading(true);
      setError(undefined);
      const user = await loginRequest(data);
      setAuthUser(user);
      return true;
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred');
      }
      return false;
    } finally {
      setLoading(false);
    }
  };

  const goToProfile = () => {
    if (authUser) router.push(`/profiles/${authUser.id}`);
  };

  return {
    user: authUser,
    loading: loading || isHydrating,
    error,
    signIn,
    signOut,
    goToProfile,
  };
}
