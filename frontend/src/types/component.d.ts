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

export interface AddCourseFields {
  course_name: string;
  tag: string;
  description: string;
  mentor: {
    name: string;
    image: string;
    role: string;
    socialNetworks: {
      linkedin: string;
      twitter: string;
      instagram: string;
      facebook: string;
    };
    bio: string;
    categories: string[];
  };
  contentOutline: {
    lessons: {
      title: string;
      duration: string;
      video: string;
      pdfs: {
        title: string;
        file: string;
      }[];
    }[];
  };
  date: string;
  comments: string[];
}
