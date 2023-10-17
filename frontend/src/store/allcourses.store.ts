import { create } from 'zustand';
import { GetAllCourseDetails } from '../types/component';

const useAllCoursesStore = create<GetAllCourseDetails>((set) => ({
  allCourses: [],
  filteredCourses: [],
  setAllCourses: (allCourses) => set({ allCourses }),
  setFilteredCourses: (filteredCourses) => set({ filteredCourses }),
}));

export default useAllCoursesStore;
