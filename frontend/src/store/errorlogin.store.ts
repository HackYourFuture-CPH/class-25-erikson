import { create } from 'zustand';
import { ErrorState } from '../types';

const useErrorLoginState = create<ErrorState>((set) => ({
  error: null,
  setError: (error) => set({ error }),
}));

export default useErrorLoginState;
