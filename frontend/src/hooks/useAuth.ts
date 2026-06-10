import { useState, useEffect } from 'react';
import { useAuthContext } from '@/contexts/AuthContext';
import { loginRequest, getProfileRequest, logoutRequest } from '@service/authService';
import { updateUserRequest } from '@service/userService';
import type { LoginInput, UpdateUserInput } from '@validators/schemas';
import { useRouter } from 'next/navigation';

export default function useAuth() {
  const { authUser, authenticateUser, clearAuthUser } = useAuthContext();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>();
  const [hydrating, setHydrating] = useState(true);
  const [successMessage, setSuccessMessage] = useState<string>();
  const router = useRouter();

  // Hydrate user from cookie on mount
  useEffect(() => {
    const hydrate = async () => {
      try {
        const user = await getProfileRequest();
        if (user) authenticateUser(user);
      } catch {
        // Not authenticated, user stays null
      } finally {
        setHydrating(false);
      }
    };
    hydrate();
  }, []);

  const signIn =  async (data: LoginInput) => {
      try {
        setLoading(true);
        setError(undefined);
        const user = await loginRequest(data);
        authenticateUser(user);
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

  const updateUser = async ({ firstName, lastName, newPassword }: UpdateUserInput) => {
    try {
      setLoading(true);
      setError(undefined);
      setSuccessMessage(undefined);
      await updateUserRequest({ firstName, lastName, password: newPassword || undefined });
      setSuccessMessage('Settings saved successfully.');
      return true;
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

  const goToProfile = () => {
    if (authUser) router.push(`/profiles/${authUser.id}`);
  };

  return {
    user: authUser,
    loading: loading || hydrating,
    error,
    successMessage,
    signIn,
    signOut,
    updateUser,
    goToProfile,
  };
}
