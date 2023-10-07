import { create } from 'zustand';

interface AllCoursesStore {
  courses: any[]; 
  setCourses: (courses: any[]) => void;
}

const useAllCoursesStore = create<AllCoursesStore>((set) => ({
  courses: [],
  setCourses: (courses: any) => set({ courses }),
}));

export default useAllCoursesStore;
