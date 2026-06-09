import { useState, useEffect, useCallback } from 'react';
import { useAuthContext } from '@/contexts/AuthContext';
import { loginRequest, getProfileRequest, logoutRequest } from '@service/authService';
import type { LoginInput } from '@validators/schemas';
import { useRouter } from 'next/navigation';
import { getInitials } from '../utils/utils';

interface UserData {
  name: string;
  initials: string;
}

function toUserData(authUser: { firstName: string; lastName: string } | null): UserData | null {
  if (!authUser) return null;
  const userFullName = `${authUser.firstName} ${authUser.lastName}`;
  const userInitials = getInitials(userFullName);
  return {
    name: userFullName,
    initials: userInitials,
  };
}

export default function useAuth() {
  const { authUser, authenticateUser, clearAuthUser } = useAuthContext();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>();
  const [hydrating, setHydrating] = useState(true);
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
  }, [authenticateUser]);

  const signIn = useCallback(
    async (data: LoginInput) => {
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
    },
    [authenticateUser]
  );

  const signOut = useCallback(async () => {
    try {
      await logoutRequest();
    } catch {
      // Continue clearing local state
    } finally {
      clearAuthUser();
      router.push('/sign-in');
    }
  }, [clearAuthUser, router]);

  const goToProfile = useCallback(() => {
    if (authUser) router.push(`/profiles/${authUser.id}`);
  }, [authUser, router]);

  return {
    user: toUserData(authUser),
    loading: loading || hydrating,
    error,
    signIn,
    signOut,
    goToProfile,
  };
}
