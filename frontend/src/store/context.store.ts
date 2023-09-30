import { create } from 'zustand';
import { AuthContextStore } from '../types';

const useAuthContextStore = create<AuthContextStore>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}));

export default useAuthContextStore;
