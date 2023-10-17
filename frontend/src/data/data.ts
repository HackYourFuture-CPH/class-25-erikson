import { AllCourseFields, GetCourseFields, User } from '../types/component';

export const users: User[] = [
  {
    id: 1,
    first_name: 'John',
    last_name: 'Doe',
    email: 'john.doe@example.com',
    user_type: 'Student',
    uid: 'jd1234',
  },
  {
    id: 2,
    first_name: 'Alice',
    last_name: 'Smith',
    email: 'alice.smith@example.com',
    user_type: 'Mentor',
    uid: 'as5678',
  },
];

export const sampleCourses: AllCourseFields[] = [
  {
    id: 1,
    course_title: 'Introduction to Programming',
    course_category: 'Professional',
    course_image: 'https://example.com/intro-to-programming.jpg',
    mentor: 2, // Mentor ID
    students: [1, 3, 4], // Student IDs
    lesson_count: 10,
  },
  {
    id: 2,
    course_title: 'Web Development Basics',
    course_category: 'Finance',
    course_image: 'https://example.com/web-development-basics.jpg',
    mentor: 3, // Mentor ID
    students: [2, 5], // Student IDs
    lesson_count: 8,
  },
  {
    id: 3,
    course_title: 'Data Science Fundamentals',
    course_category: 'Personal',
    course_image: 'https://example.com/data-science-fundamentals.jpg',
    mentor: 1, // Mentor ID
    students: [6], // Student IDs
    lesson_count: 12,
  },
];

export const sampleCourse: GetCourseFields[] = [
  {
    id: 1,
    course_title: 'Web Development Masterclass',
    course_description: 'Learn the art of web development from scratch to advanced techniques.',
    course_category: 'Professional',
    course_image: 'https://code.visualstudio.com/assets/docs/editor/accessibility/zoomed-in.png',
    course_price: 99.99,
    lessons: [
      {
        lesson_title: 'Introduction to HTML',
        lesson_image:
          'https://code.visualstudio.com/assets/docs/editor/accessibility/zoomed-in.png',
        lesson_description:
          'Learn the basics of HTML, the standard markup language for creating web pages.',
        lesson_resources: [
          { lesson_resources: 'HTML Cheat Sheet: https://example.com/html-cheat-sheet.pdf' },
          { lesson_resources: 'W3Schools HTML Tutorial: https://www.w3schools.com/html/' },
        ],
      },
      {
        lesson_title: 'CSS Styling Techniques',
        lesson_image:
          'https://code.visualstudio.com/assets/docs/editor/accessibility/zoomed-in.png',
        lesson_description: 'Explore advanced CSS styling techniques and responsive web design.',
        lesson_resources: [
          { lesson_resources: 'CSS Tricks: https://css-tricks.com/' },
          {
            lesson_resources:
              'MDN Web Docs CSS Guide: https://developer.mozilla.org/en-US/docs/Web/CSS',
          },
        ],
      },
    ],
    faqs: [
      {
        faq: 'Is any prior programming knowledge required for this course?',
        faq_answer:
          'No, this course is designed for beginners with no prior programming experience.',
      },
      {
        faq: 'Can I access the course materials after completion?',
        faq_answer: "Yes, you'll have lifetime access to the course materials and updates.",
      },
    ],
    key_learning:
      'Master the fundamentals of web development, including HTML, CSS, and responsive design techniques.',
  },
];
