'use client';

import { createContext, useContext, useState } from 'react';
import type { AuthUser } from '@service/authService';

interface AuthContextValue {
  authUser: AuthUser | null;
  setAuthUser: (user: AuthUser | null) => void;
  clearAuthUser: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

interface AuthProviderProps {
  initialUser: AuthUser | null;
  children: React.ReactNode;
}

export const AuthProvider = ({ initialUser, children }: AuthProviderProps) => {
  const [authUser, setAuthUser] = useState<AuthUser | null>(initialUser);

  const clearAuthUser = () => {
    setAuthUser(null);
  };

  return (
    <AuthContext.Provider value={{ authUser, setAuthUser, clearAuthUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = (): AuthContextValue => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuthContext must be used within an AuthProvider');
  return context;
};
