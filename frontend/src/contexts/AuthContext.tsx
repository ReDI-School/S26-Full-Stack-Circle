'use client';

import { createContext, useContext, useState } from 'react';
import type { AuthUser } from '@services/authService';

interface AuthContextValue {
  authUser: AuthUser | null;
  authenticateUser: (user: AuthUser) => void;
  clearAuthUser: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [authUser, setAuthUser] = useState<AuthUser | null>(null);

  const authenticateUser = (user: AuthUser) => {
    setAuthUser(user);
  };

  const clearAuthUser = () => {
    setAuthUser(null);
  };

  return (
    <AuthContext.Provider value={{ authUser, authenticateUser, clearAuthUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = (): AuthContextValue => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuthContext must be used within an AuthProvider');
  return context;
};
