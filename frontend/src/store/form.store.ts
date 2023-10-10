import { create } from 'zustand';
import { FormState } from '../types/component';

const useFormStore = create<FormState>((set) => ({
  currentIndex: 0,
  setCurrentIndex: (index: number) => set({ currentIndex: index }),
}));

export default useFormStore;
