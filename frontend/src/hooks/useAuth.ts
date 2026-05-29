import { useState, useEffect } from 'react';

interface UserData {
  name: string;
  initials: string;
}

interface UseAuthReturn {
  user: UserData | null;
  loadingAuth: boolean;
  authError: string | null;
  signOut: () => void;
  goToProfile: () => void;
}

const MOCK_USER: UserData = { name: 'Fabio Rodrigues', initials: 'FR' };

const useAuth = (): UseAuthReturn => {
  const [user, setUser] = useState<UserData | null>(null);
  const [loadingAuth, setLoadingAuth] = useState<boolean>(true);
  const [authError, setAuthError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoadingAuth(true);
        setAuthError(null);
        // TODO: Replace with real auth session fetch
        setUser(MOCK_USER);
      } catch (err) {
        setAuthError(err instanceof Error ? err.message : 'Failed to load user');
      } finally {
        setLoadingAuth(false);
      }
    };

    fetchUser();
  }, []);

  const signOut = () => {
    // TODO: Implement real sign-out logic
  };

  const goToProfile = () => {
    // TODO: Implement navigation to profile page
  };

  return {
    user,
    loadingAuth,
    authError,
    signOut,
    goToProfile,
  };
};

export default useAuth;