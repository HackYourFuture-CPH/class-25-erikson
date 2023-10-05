export interface Benefit {
  benefit_individual: string;
  benefit_monthly: string;
}

export interface FAQ {
  faq: string;
  faq_answer: string;
}

export interface Resource {
  lesson_resources: string;
}

export interface Lesson {
  lesson_title: string;
  lesson_description: string;
  lesson_image:string;
  lesson_resources: Resource[];
}

export interface Course {
  course_title: string;
  course_description: string;
  course_category: string;
  course_image: string;
  lessons: Lesson[];
  faqs: FAQ[];
  benefits: Benefit[];
}
