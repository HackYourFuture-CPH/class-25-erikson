import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AllCourseFields } from '../../types/component';
import DashboardWrapper from '../../tmp_components/dashboardLayout/DashboardWrapper';
import styles from './MyCourses.module.css';
import events from '../../components/courses/CourseList.module.css';

const courses: AllCourseFields[] = [
  {
    id: 1,
    course_title: 'Introduction to Programming',
    course_category: 'Professional',
    course_image: 'intro-programming.jpg',
    mentor: 201,
    students: [101, 102, 103],
    lesson_count: 12,
  },
  {
    id: 2,
    course_title: 'Web Development Fundamentals',
    course_category: 'Professional',
    course_image: 'web-dev-fundamentals.jpg',
    mentor: 202,
    students: [104, 105, 106, 107],
    lesson_count: 20,
  },
  {
    id: 3,
    course_title: 'Data Structures and Algorithms',
    course_category: 'Finance',
    course_image: 'data-structures.jpg',
    mentor: 203,
    students: [108, 109],
    lesson_count: 18,
  },
  {
    id: 4,
    course_title: 'Mobile App Development',
    course_category: 'Personal',
    course_image: 'mobile-app-dev.jpg',
    mentor: 204,
    students: [110, 111, 112, 113, 114],
    lesson_count: 15,
  },
  {
    id: 5,
    course_title: 'Database Design and Management',
    course_category: 'Live Event',
    course_image: 'database-design.jpg',
    mentor: 205,
    students: [115, 116, 117],
    lesson_count: 22,
  },
];

const MyCourses: React.FC = () => {
  const navigate = useNavigate();

  return (
    <DashboardWrapper>
      <h1>My Courses</h1>
      <div className={styles.courseList}>
        <div className={styles.cardsWrapper}>
          {courses.map((course) => (
            <div
              className={styles.singleCard}
              key={course.id}
              onClick={() => navigate(`/course/${course.id}`)}
            >
              <div className={styles.imageDiv}>
                <img alt='course' src={course.course_image} />
              </div>
              <div className={styles.cardContent}>
                <div>
                  <div>
                    <div
                      className={`${events.tag} ${
                        course.course_category === 'Professional'
                          ? events.professional
                          : course.course_category === 'Personal'
                          ? events.personal
                          : course.course_category === 'Finance'
                          ? events.finance
                          : course.course_category === 'Live Event' && events.event
                      }`}
                    >
                      {course.course_category}
                    </div>
                  </div>

                  <h3 className={styles.overflow}>{course.course_title}</h3>

                  <div>{course.lesson_count} Lessons</div>

                  {/* <div>Enrolled: {course.students.length}</div> */}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardWrapper>
  );
};

export default MyCourses;
