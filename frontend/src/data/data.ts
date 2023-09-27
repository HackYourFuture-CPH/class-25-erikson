export interface Users {
  id: number;
  name: string;
  type: string;
}

export interface Course {
  id: number;
  image: string;
  course_name: string;
  tag: string;
  description: string;
  mentor: Mentor;
  contentOutline: ContentOutline;
  date: string;
  comments: Comment[];
}

export interface Mentor {
  name: string;
  image: string;
  role: string;
  socialNetworks: {
    facebook?: string;
    twitter?: string;
    instagram?: string;
    linkedin?: string;
  };
  bio: string;
  categories: string[];
}

export interface ContentOutline {
  lessons: Lesson[];
}

export interface Lesson {
  title: string;
  duration: string;
  video: string;
  pdfs: Pdf[];
}

export interface Pdf {
  title: string;
  file: string;
}

export interface Comment {
  user_name: string;
  comment: string;
  likes: number;
  dislikes: number;
  timestamp: string;
}

export const users: Users[] = [
  {
    id: 1,
    name: "John Doe",
    type: "Student",
  }
];

export const courses: Course[] = [
  // Personal Courses
  {
    id: 1,
    image: "course_image_url_1.jpg",
    course_name: "Personal Development Masterclass",
    tag: "Personal",
    description: "Unlock your potential with this comprehensive personal development masterclass.",
    mentor: {
      name: "Jessica Smith",
      image: "mentor_image_url_1.jpg",
      role: "Life Coach",
      socialNetworks: {
        linkedin: "linkedin.com/in/jessicasmith",
        twitter: "twitter.com/jessicacoach",
      },
      bio: "Guiding individuals to achieve personal growth and success.",
      categories: ["Personal Development", "Self-Improvement"],
    },
    contentOutline: {
      lessons: [
        {
          title: "Setting Personal Goals",
          duration: "30 minutes",
          video: "video_url_1.mp4",
          pdfs: [
            { title: "Goal Setting Workbook", file: "goal_setting_workbook.pdf" },
          ],
        },
        {
          title: "Time Management Mastery",
          duration: "40 minutes",
          video: "video_url_2.mp4",
          pdfs: [],
        },
        {
          title: "Building Self-Confidence",
          duration: "35 minutes",
          video: "video_url_3.mp4",
          pdfs: [],
        },
        {
          title: "Mindfulness and Meditation",
          duration: "45 minutes",
          video: "video_url_4.mp4",
          pdfs: [
            { title: "Mindfulness Guide", file: "mindfulness_guide.pdf" },
          ],
        },
        {
          title: "Healthy Lifestyle Habits",
          duration: "25 minutes",
          video: "video_url_5.mp4",
          pdfs: [],
        },
        {
          title: "Effective Communication Skills",
          duration: "50 minutes",
          video: "video_url_6.mp4",
          pdfs: [
            { title: "Communication Tips", file: "communication_tips.pdf" },
          ],
        },
        {
          title: "Overcoming Procrastination",
          duration: "30 minutes",
          video: "video_url_7.mp4",
          pdfs: [
            { title: "Procrastination Buster", file: "procrastination_buster.pdf" },
          ],
        },
        {
          title: "Achieving Work-Life Balance",
          duration: "45 minutes",
          video: "video_url_8.mp4",
          pdfs: [],
        },
      ],
    },
    date: "2023-10-01",
    comments: [
      {
        user_name: "User1",
        comment: "This course is amazing!",
        likes: 5,
        dislikes: 1,
        timestamp: "2023-10-02T10:00:00Z",
      },
      {
        user_name: "User2",
        comment: "I've learned so much from this masterclass!",
        likes: 8,
        dislikes: 0,
        timestamp: "2023-10-03T11:30:00Z",
      },
    ],
  },
  // Finance Courses
  {
    id: 2,
    image: "course_image_url_2.jpg",
    course_name: "Investing for Beginners",
    tag: "Finance",
    description: "Learn the basics of investing and start building wealth.",
    mentor: {
      name: "David Johnson",
      image: "mentor_image_url_3.jpg",
      role: "Financial Advisor",
      socialNetworks: {
        linkedin: "linkedin.com/in/davidjohnson",
        twitter: "twitter.com/davidfinance",
      },
      bio: "Empowering individuals to make smart financial decisions.",
      categories: ["Finance", "Investment", "Wealth Building"],
    },
    contentOutline: {
      lessons: [
        {
          title: "Understanding Budgeting",
          duration: "30 minutes",
          video: "video_url_9.mp4",
          pdfs: [
            { title: "Budgeting Guide", file: "budgeting_guide.pdf" },
          ],
        },
        {
          title: "Investment Strategies",
          duration: "35 minutes",
          video: "video_url_10.mp4",
          pdfs: [
            { title: "Investment Tips", file: "investment_tips.pdf" },
          ],
        },
        {
          title: "Retirement Planning",
          duration: "40 minutes",
          video: "video_url_11.mp4",
          pdfs: [
            { title: "Retirement Checklist", file: "retirement_checklist.pdf" },
          ],
        },
        {
          title: "Tax Planning",
          duration: "28 minutes",
          video: "video_url_12.mp4",
          pdfs: [],
        },
        {
          title: "Debt Management",
          duration: "25 minutes",
          video: "video_url_13.mp4",
          pdfs: [],
        },
        {
          title: "Creating a Diverse Portfolio",
          duration: "45 minutes",
          video: "video_url_14.mp4",
          pdfs: [
            { title: "Portfolio Management", file: "portfolio_management.pdf" },
          ],
        },
        {
          title: "Real Estate Investment",
          duration: "38 minutes",
          video: "video_url_15.mp4",
          pdfs: [],
        },
        {
          title: "Financial Q&A Session",
          duration: "60 minutes",
          video: "video_url_16.mp4",
          pdfs: [],
        },
      ],
    },
    date: "2023-10-04",
    comments: [
      {
        user_name: "User1",
        comment: "This course is very informative!",
        likes: 10,
        dislikes: 0,
        timestamp: "2023-10-05T11:30:00Z",
      },
      {
        user_name: "User2",
        comment: "I'm excited to start investing after this course!",
        likes: 12,
        dislikes: 2,
        timestamp: "2023-10-06T14:45:00Z",
      },
    ],
  },
  // Professional Courses
  {
    id: 3,
    image: "course_image_url_3.jpg",
    course_name: "Professional Photography Workshop",
    tag: "Professional",
    description: "Master the art of photography with this hands-on workshop.",
    mentor: {
      name: "Emma Watson",
      image: "mentor_image_url_5.jpg",
      role: "Professional Photographer",
      socialNetworks: {
        linkedin: "linkedin.com/in/emmawatson",
        instagram: "instagram.com/emmaphotography",
      },
      bio: "Capturing moments that last a lifetime.",
      categories: ["Photography", "Visual Arts"],
    },
    contentOutline: {
      lessons: [
        {
          title: "Introduction to Photography",
          duration: "40 minutes",
          video: "video_url_17.mp4",
          pdfs: [
            { title: "Photography Basics", file: "photography_basics.pdf" },
          ],
        },
        {
          title: "Camera Settings and Techniques",
          duration: "45 minutes",
          video: "video_url_18.mp4",
          pdfs: [],
        },
        {
          title: "Composition and Lighting",
          duration: "50 minutes",
          video: "video_url_19.mp4",
          pdfs: [],
        },
        {
          title: "Portrait Photography",
          duration: "30 minutes",
          video: "video_url_20.mp4",
          pdfs: [
            { title: "Portrait Photography Guide", file: "portrait_photography_guide.pdf" },
          ],
        },
        {
          title: "Landscape Photography",
          duration: "35 minutes",
          video: "video_url_21.mp4",
          pdfs: [],
        },
        {
          title: "Editing and Post-Processing",
          duration: "55 minutes",
          video: "video_url_22.mp4",
          pdfs: [
            { title: "Editing Tips", file: "editing_tips.pdf" },
          ],
        },
        {
          title: "Photography Business Essentials",
          duration: "40 minutes",
          video: "video_url_23.mp4",
          pdfs: [
            { title: "Starting a Photography Business", file: "starting_photography_business.pdf" },
          ],
        },
        {
          title: "Portfolio Showcase",
          duration: "60 minutes",
          video: "video_url_24.mp4",
          pdfs: [],
        },
      ],
    },
    date: "2023-10-07",
    comments: [
      {
        user_name: "User1",
        comment: "Emma Watson is an amazing mentor!",
        likes: 15,
        dislikes: 3,
        timestamp: "2023-10-08T12:15:00Z",
      },
      {
        user_name: "User2",
        comment: "I've improved my photography skills so much thanks to this workshop!",
        likes: 18,
        dislikes: 1,
        timestamp: "2023-10-09T14:30:00Z",
      },
    ],
  },
  // Life Event Courses
  {
    id: 4,
    image: "course_image_url_4.jpg",
    course_name: "Wedding Planning Workshop",
    tag: "Life Event",
    description: "Plan your dream wedding with expert guidance and tips.",
    mentor: {
      name: "Olivia Anderson",
      image: "mentor_image_url_7.jpg",
      role: "Wedding Planner",
      socialNetworks: {
        linkedin: "linkedin.com/in/oliviaanderson",
        instagram: "instagram.com/oliviaweddings",
      },
      bio: "Creating memorable weddings that last a lifetime.",
      categories: ["Life Event Planning", "Weddings"],
    },
    contentOutline: {
      lessons: [
        {
          title: "Getting Started with Wedding Planning",
          duration: "30 minutes",
          video: "video_url_25.mp4",
          pdfs: [
            { title: "Wedding Planning Checklist", file: "wedding_planning_checklist.pdf" },
          ],
        },
        {
          title: "Choosing the Perfect Venue",
          duration: "45 minutes",
          video: "video_url_26.mp4",
          pdfs: [],
        },
        {
          title: "Designing Your Dream Wedding",
          duration: "50 minutes",
          video: "video_url_27.mp4",
          pdfs: [],
        },
        {
          title: "Catering and Menu Selection",
          duration: "35 minutes",
          video: "video_url_28.mp4",
          pdfs: [
            { title: "Catering Guide", file: "catering_guide.pdf" },
          ],
        },
        {
          title: "Wedding Photography and Videography",
          duration: "40 minutes",
          video: "video_url_29.mp4",
          pdfs: [],
        },
        {
          title: "Budgeting for Your Wedding",
          duration: "55 minutes",
          video: "video_url_30.mp4",
          pdfs: [
            { title: "Budgeting Tips", file: "wedding_budgeting_tips.pdf" },
          ],
        },
        {
          title: "Wedding Day Coordination",
          duration: "40 minutes",
          video: "video_url_31.mp4",
          pdfs: [
            { title: "Day-Of Checklist", file: "day_of_checklist.pdf" },
          ],
        },
        {
          title: "Creating Lasting Memories",
          duration: "60 minutes",
          video: "video_url_32.mp4",
          pdfs: [],
        },
      ],
    },
    date: "2023-10-10",
    comments: [
      {
        user_name: "User1",
        comment: "This workshop made wedding planning so much easier!",
        likes: 10,
        dislikes: 2,
        timestamp: "2023-10-11T13:45:00Z",
      },
      {
        user_name: "User2",
        comment: "Olivia Anderson is a wedding planning genius!",
        likes: 20,
        dislikes: 0,
        timestamp: "2023-10-12T15:00:00Z",
      },
    ],
  },
];
