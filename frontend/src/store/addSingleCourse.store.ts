import { create } from 'zustand';
import { AddCourseFields, AddSingleCourse } from '../types/component';

const emptyFile: File = new File([], '', { type: '' });
const initialCourseData: AddCourseFields = {
  course_title: '',
  course_description: '',
  course_category: '',
  course_image: emptyFile,
  course_subscriptionType: '',
  course_price: 0,
  lesson_title: '',
  lesson_image: emptyFile,
  lesson_description: '',
  lesson_resources: '',
  sales_image: emptyFile,
  faq: '',
  faq_answer: '',
  key_learning: '',
  pricing_benefits: '',
};

const useSingleCourseStore = create<AddSingleCourse>((set) => ({
  data: initialCourseData,
  updateCourseFields: (fields) =>
    set((state) => ({
      data: { ...state.data, ...fields },
    })),
  resetForm: () => set({ data: initialCourseData }),
}));

export default useSingleCourseStore;
