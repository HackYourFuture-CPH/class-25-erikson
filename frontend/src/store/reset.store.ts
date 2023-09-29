import { create } from 'zustand';
import { ResetState } from '../types';

const useResetState = create<ResetState>((set) => ({
  error: null,
  successMessage: null,
  setError: (error) => set({ error }),
  setSuccessMessage: (message) => set({ successMessage: message }),
}));

export default useResetState;
