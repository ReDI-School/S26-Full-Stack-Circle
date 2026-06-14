'use client';

import { createContext, useState, useEffect, useContext, useMemo } from 'react';
import { getProfileRequest } from '@services/authService';
import type { AuthUser } from '@services/authService';

interface AuthContextValue {
  authUser: AuthUser | null;
  isHydrating: boolean;
}

interface AuthDispatch {
  setAuthUser: (user: AuthUser | null) => void;
}

const AuthStateContext = createContext<AuthState | null>(null);
const AuthDispatchContext = createContext<AuthDispatch | null>(null);

AuthStateContext.displayName = 'AuthStateContext';
AuthDispatchContext.displayName = 'AuthDispatchContext';

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [authUser, setAuthUser] = useState<AuthUser | null>(null);
  const [isHydrating, setIsHydrating] = useState(true);

  useEffect(() => {
    const hydrate = async () => {
      try {
        const user = await getProfileRequest();
        if (user) setAuthUser(user);
      } catch {
        // Not authenticated, user stays null
      } finally {
        setIsHydrating(false);
      }
    };
    hydrate();
  }, []);

  const authState = useMemo(() => ({ authUser, isHydrating }), [authUser, isHydrating]);
  const dispatch = useMemo(() => ({ setAuthUser }), []);

  return (
    <AuthStateContext.Provider value={authState}>
      <AuthDispatchContext.Provider value={dispatch}>{children}</AuthDispatchContext.Provider>
    </AuthStateContext.Provider>
  );
};

export const useAuthContext = (): AuthContextValue => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuthContext must be used within an AuthProvider');
  return context;
};
