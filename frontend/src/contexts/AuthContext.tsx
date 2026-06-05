'use client';

import { createContext, useContext, useState } from 'react';
import type { AuthUser } from '@service/authService';

interface AuthContextValue {
  authUser: AuthUser | null;
  setAuthUser: (user: AuthUser | null) => void;
  clearAuthUser: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [authUser, setAuthUser] = useState<AuthUser | null>(null);

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
