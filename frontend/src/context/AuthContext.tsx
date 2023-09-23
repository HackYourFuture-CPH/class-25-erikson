import { createContext, ReactNode, useEffect } from 'react';
import { auth, onAuthStateChanged } from '../firebase/config';
import { AuthContextStore } from '../types';
import useAuthContextStore from '../store/context.store';

export const AuthContext = createContext<AuthContextStore | undefined>(undefined);

export const AuthContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { user, setUser } = useAuthContextStore();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        setUser(authUser);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, [setUser]);

  return (
    <AuthContext.Provider value={{ user, setUser }}>{children}</AuthContext.Provider>
  );
};
