export interface LoginStore {
  email: string;
  password: string;
  rememberMe: boolean;
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  setRememberMe: (remember: boolean) => void;
  resetForm: () => void;
}

export interface PasswordStore {
  email: string;
  setEmail: (email: string) => void;
}

export interface SignupStore {
  userType: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  rememberMe: boolean;
  setUserType: (type: string) => void;
  setFirstName: (name: string) => void;
  setLastName: (name: string) => void;
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  setRememberMe: (remember: boolean) => void;
}

export interface FilterStore {
  selectedFilter: string;
  setSelectedFilter: (filter: string) => void;
}

export interface CourseStore {
  selectedCourse: number | null;
  showAbout: boolean;
  showReviews: boolean;
  showResources: boolean;
  selectCourse: (courseId: number) => void;
  toggleAbout: () => void;
  toggleReviews: () => void;
  toggleResources: () => void;
}

export interface FormState {
  currentIndex: number;
  setCurrentIndex: (index: number) => void;
}

export interface Resource {
  lesson_resources: string;
}

export interface Lesson {
  lesson_title: string;
  lesson_image: File;
  lesson_description: string;
  resources: Resource[];
}

export interface Faq {
  faq: string;
  faq_answer: string;
}

export interface AddCourseDetail {
  course_title: string;
  course_description: string;
  course_category: string;
  course_image: File;
  course_price: number;
}

export interface AddCourseFields {
  course_title: string;
  course_description: string;
  course_category: string;
  course_image: File;
  course_price: number;
  lessons: Lesson[];
  sales_image: File;
  faqs: Faq[];
  key_learning: string;
}

export interface AddSingleCourse {
  data: AddCourseFields;
  updateCourseFields: (fields: Partial<AddCourseFields>) => void;
  resetForm: () => void;
}

export interface CourseData {
  course_title: string;
  course_description: string;
  course_category: string;
  course_image: File;
  course_price: number;
}

export interface LessonData {
  lessons: Lesson[];
}

export interface SaleData {
  sales_image: File;
  faqs: Faq[];
  key_learning: string;
}
