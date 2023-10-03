import { create } from 'zustand';

const useAllCoursesStore = create((set) => ({
  courses: [],
  setCourses: (courses: any) => set({ courses }),
}));

export default useAllCoursesStore;
