import { create } from 'zustand';
import { ErrorState } from '../types';

const useErrorSignupState = create<ErrorState>((set) => ({
  error: null,
  setError: (error) => set({ error }),
}));

export default useErrorSignupState;
