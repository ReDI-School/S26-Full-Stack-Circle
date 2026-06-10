'use client';

import { createContext, useState, useEffect, useContext } from 'react';
import { getProfileRequest } from '@service/authService';
import type { AuthUser } from '@service/authService';

interface AuthState {
  authUser: AuthUser | null;
  isHydrating: boolean;
}

interface AuthDispatch {
  setAuthUser: (user: AuthUser | null) => void;
}

const AuthStateContext = createContext<AuthState | null>(null);
const AuthDispatchContext = createContext<AuthDispatch | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [authUser, setAuthUser] = useState<AuthUser | null>(null);
  const [isHydrating, setIsHydrating] = useState(true);

  useEffect(() => {
    const hydrate = async () => {
      try {
        const user = await getProfileRequest();
        if (user) setAuthUser(user);
      } catch {
        // Not authenticated â user stays null
      } finally {
        setIsHydrating(false);
      }
    };
    hydrate();
  }, []);

  return (
    <AuthStateContext.Provider value={{ authUser, isHydrating }}>
      <AuthDispatchContext.Provider value={{ setAuthUser }}>
        {children}
      </AuthDispatchContext.Provider>
    </AuthStateContext.Provider>
  );
};

export const useAuthContext = (): AuthState => {
  const context = useContext(AuthStateContext);
  if (!context) throw new Error('useAuthContext must be used within an AuthProvider');
  return context;
};

export const useAuthDispatch = (): AuthDispatch => {
  const context = useContext(AuthDispatchContext);
  if (!context) throw new Error('useAuthDispatch must be used within an AuthProvider');
  return context;
};
