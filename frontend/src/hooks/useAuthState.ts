import { useEffect } from 'react';
import { User } from 'firebase/auth';
import { auth, onAuthStateChanged } from '../firebase/config';
import { create } from 'zustand';

type AuthStore = {
  user: User | null;
  setUser: (user: User | null) => void;
}

const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}));

const useAuthState = () => {
  const { user, setUser } = useAuthStore();

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

  return user;
};

export default useAuthState;
