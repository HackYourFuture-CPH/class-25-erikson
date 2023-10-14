import { create } from 'zustand';
import { GetUser } from '../types/component';

const useUserStore = create<GetUser>((set) => ({
  currentUser: null,
  setCurrentUser: (currentUser) => set({ currentUser }),
}));

export default useUserStore;
