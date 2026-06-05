'use client';

import { createContext, useContext, useState } from 'react';

export interface AuthUser {
  id: string;
  email: string;
  role: 'USER' | 'ADMIN';
  firstName: string;
  lastName: string;
}

interface AuthContextValue {
  authUser: AuthUser | null;
  setAuthUser: (user: AuthUser | null) => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

interface AuthProviderProps {
  initialUser: AuthUser | null;
  children: React.ReactNode;
}

export const AuthProvider = ({ initialUser, children }: AuthProviderProps) => {
  const [authUser, setAuthUser] = useState<AuthUser | null>(initialUser);

  return <AuthContext.Provider value={{ authUser, setAuthUser }}>{children}</AuthContext.Provider>;
};

export const useAuthContext = (): AuthContextValue =>
  useContext(AuthContext) ?? { authUser: null, setAuthUser: () => {} };
