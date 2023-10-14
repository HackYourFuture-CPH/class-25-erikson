import { create } from 'zustand';
import { AddCourseFields, AddSingleCourse } from '../types/component';

const emptyFile: File = new File([], '', { type: '' });
const initialCourseData: AddCourseFields = {
  course_title: '',
  course_description: '',
  course_category: 'personal',
  course_image: emptyFile,
  course_price: 50.0,
  lessons: [
    {
      lesson_title: '',
      lesson_image: emptyFile,
      lesson_description: '',
      resources: [
        {
          lesson_resources: '',
        },
      ],
    },
  ],
  sales_image: emptyFile,
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
