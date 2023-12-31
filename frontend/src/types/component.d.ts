// login
export interface LoginStore {
  email: string;
  password: string;
  rememberMe: boolean;
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  setRememberMe: (remember: boolean) => void;
  resetForm: () => void;
}

// forgot password
export interface PasswordStore {
  email: string;
  setEmail: (email: string) => void;
}

// signup
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

// filters
export interface FilterStore {
  selectedFilter: string;
  setSelectedFilter: (filter: string) => void;
}

// temporary data
export interface CourseStore {
  selectedCourse: number | null;
  showAbout: boolean;
  showFaqs: boolean;
  showResources: boolean;
  selectCourse: (courseId: number) => void;
  toggleAbout: () => void;
  toggleFAQs: () => void;
  toggleResources: () => void;
}

// multi-step form
export interface FormState {
  currentIndex: number;
  setCurrentIndex: (index: number) => void;
}

// user
export interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  user_type: string;
  uid: string;
}

// courses
export interface Resource {
  lesson_resources: string;
}

export interface Lesson {
  lesson_title: string;
  lesson_image: File | undefined;
  lesson_description: string;
  resources: Resource[];
}

export interface GetLesson {
  lesson_title: string;
  lesson_image: string;
  lesson_description: string;
  lesson_resources: Resource[];
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

export interface GetCourseFields {
  id: number;
  course_title: string;
  course_description: string;
  course_category: string;
  course_image: string;
  course_price: number;
  lessons: GetLesson[];
  faqs: Faq[];
  key_learning: string;
}

export interface AddCourseFields {
  course_title: string;
  course_description: string;
  course_category: string;
  course_image: File | undefined;
  course_price: number;
  lessons: Lesson[];
  sales_image: File | undefined;
  faqs: Faq[];
  key_learning: string;
}

export interface AllCourseFields {
  id: number;
  course_title: string;
  course_category: string;
  course_image: string;
  mentor: number;
  course_price: number;
  students?: (number | undefined)[];
  lesson_count: number;
}

// get user
export interface GetUser {
  currentUser: User | null;
  setCurrentUser: (currentUser: User | null) => void;
}

// get courses
export interface GetAllCourses {
  courses: GetCourseFields[];
  setCourses: (courses: GetCourseFields[]) => void;
}

export interface GetAllCourseDetails {
  allCourses: AllCourseFields[];
  filteredCourses: AllCourseFields[];
  setAllCourses: (allCourses: AllCourseFields[]) => void;
  setFilteredCourses: (filteredCourses: AllCourseFields[]) => void;
}

// post a course
export interface AddSingleCourse {
  data: AddCourseFields;
  updateCourseFields: (fields: Partial<AddCourseFields>) => void;
  resetForm: () => void;
}

// form
export interface CourseData {
  course_title: string;
  course_description: string;
  course_category: string;
  course_image: File | undefined;
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
