import { create } from "zustand";
import { CourseStore } from "../types/component";

export const useCourseStore = create<CourseStore>((set) => ({
  selectedCourse: null,
  showAbout: true,
  showFaqs: false,
  showResources: false,
  selectCourse: (courseId) => {
    set({ selectedCourse: courseId, showAbout: true, showFaqs: false, showResources: false });
  },
  toggleAbout: () => set(() => ({ showAbout: true, showFaqs: false, showResources: false })),
  toggleFAQs: () => set(() => ({ showAbout: false, showFaqs: true, showResources: false })),
  toggleResources: () => set(() => ({ showAbout: false, showFaqs: false, showResources: true })),
}));
