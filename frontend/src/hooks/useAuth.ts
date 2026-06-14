import { useState } from 'react';
import { useAuthContext, useAuthDispatch } from '@/contexts/AuthContext';
import { loginRequest, logoutRequest } from '@services/authService';
import type { LoginInput } from '@validators/schemas';
import { useRouter } from 'next/navigation';

export default function useAuth() {
  const { authUser, isHydrating } = useAuthContext();
  const { setAuthUser } = useAuthDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>();
  const router = useRouter();

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

  const signOut = async () => {
    try {
      await logoutRequest();
    } catch {
      // Continue clearing local state
    } finally {
      clearAuthUser();
      router.push('/sign-in');
    }
  };

  const goToProfile = () => {
    if (authUser) router.push(`/profiles/${authUser.id}`);
  };

  return {
    user: authUser,
    loading: loading || hydrating,
    error,
    signIn,
    signOut,
    goToProfile,
  };
}
