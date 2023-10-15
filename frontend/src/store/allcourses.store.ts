import { create } from 'zustand';
import { GetAllCourses } from '../types/component';

const useAllCoursesStore = create<GetAllCourses>((set) => ({
  courses: [],
  setCourses: (courses) => set({ courses }),
}));

export default useAllCoursesStore;
