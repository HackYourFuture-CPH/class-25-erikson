import { create } from "zustand";
import { CourseStore } from "../types/component";

export const useCourseStore = create<CourseStore>((set) => ({
  selectedCourse: null,
  showAbout: true,
  showReviews: false,
  showResources: false,
  selectCourse: (courseId) => {
    set({ selectedCourse: courseId, showAbout: true, showReviews: false, showResources: false });
  },
  toggleAbout: () => set(() => ({ showAbout: true, showReviews: false, showResources: false })),
  toggleReviews: () => set(() => ({ showAbout: false, showReviews: true, showResources: false })),
  toggleResources: () => set(() => ({ showAbout: false, showReviews: false, showResources: true })),
}));
