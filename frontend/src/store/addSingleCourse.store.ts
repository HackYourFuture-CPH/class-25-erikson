import { create } from 'zustand';
import { AddCourseFields, AddSingleCourse } from '../types/component';

const initialCourseData: AddCourseFields = {
  course_title: '',
  course_description: '',
  course_category: 'Personal',
  course_image: undefined,
  course_price: 50.0,
  lessons: [
    {
      lesson_title: '',
      lesson_image: undefined,
      lesson_description: '',
      resources: [
        {
          lesson_resources: '',
        },
      ],
    },
  ],
  sales_image: undefined,
  faqs: [
    {
      faq: '',
      faq_answer: '',
    },
  ],
  key_learning: '',
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
