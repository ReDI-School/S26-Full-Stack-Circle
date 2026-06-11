'use client';

import { createContext, useContext, useState, useCallback, useMemo, useEffect } from 'react';
import { getProfileRequest } from '@service/authService';
import type { AuthUser } from '@service/authService';

interface AuthContextValue {
  authUser: AuthUser | null;
  hydrating: boolean;
  authenticateUser: (user: AuthUser) => void;
  clearAuthUser: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [authUser, setAuthUser] = useState<AuthUser | null>(null);
  const [hydrating, setHydrating] = useState(true);

  const authenticateUser = useCallback((user: AuthUser) => {
    setAuthUser(user);
  }, []);

  const clearAuthUser = useCallback(() => {
    setAuthUser(null);
  }, []);

  useEffect(() => {
    const hydrate = async () => {
      try {
        const user = await getProfileRequest();
        if (user) setAuthUser(user);
      } catch {
        // Not authenticated, user stays null
      } finally {
        setHydrating(false);
      }
    };
    hydrate();
  }, []);

  const value = useMemo(
    () => ({ authUser, hydrating, authenticateUser, clearAuthUser }),
    [authUser, hydrating, authenticateUser, clearAuthUser],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuthContext = (): AuthContextValue => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuthContext must be used within an AuthProvider');
  return context;
};
