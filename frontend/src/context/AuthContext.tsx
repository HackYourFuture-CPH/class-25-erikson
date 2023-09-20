import { createContext, useContext, ReactNode } from 'react';
import { User } from 'firebase/auth';
import useAuthState from '../hooks/useAuthState';

export type AuthContextType = {
  user: User | null;
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const user = useAuthState();

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
