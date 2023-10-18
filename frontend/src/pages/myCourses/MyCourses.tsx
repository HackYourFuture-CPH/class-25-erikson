import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AllCourseFields, User } from '../../types/component';
import styles from './MyCourses.module.css';
import events from '../../components/courses/CourseList.module.css';

interface MyCoursesProps {
  currentUser: User | null;
  allCourses: AllCourseFields[];
  isLoading: boolean;
  error: Error | null;
}

const MyCourses: React.FC<MyCoursesProps> = ({ currentUser, allCourses, isLoading, error }) => {
  const navigate = useNavigate();

  const userType = currentUser?.user_type;
  const myCourses: AllCourseFields[] = [];

  if (userType === 'Mentor') {
    myCourses.push(...allCourses.filter((course) => course.mentor === currentUser?.id));
  } else if (userType === 'Student') {
    myCourses.push(...allCourses.filter((course) => course.students?.includes(currentUser?.id)));
  }

  if (isLoading) {
    return <div className='loading'>Loading...</div>;
  }

  if (error) {
    return <div className='error'>{error?.message}</div>;
  }

  if (myCourses.length === 0) {
    return <p>"You don't have any courses yet."</p>;
  }

  return (
    <>
      <h1 className={styles.h1}>My Courses</h1>
      <div className={styles.courseList}>
        <div className={styles.cardsWrapper}>
          {myCourses.map((course) => (
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
                  <h3 className={styles.overflow}>{course.course_title}</h3>

                  <div className={styles.info}>
                    <div
                      className={`${events.tag} ${
                        course.course_category === 'Professional'
                          ? events.professional
                          : course.course_category === 'Personal'
                          ? events.personal
                          : course.course_category === 'Finance' && events.finance
                      }`}
                    >
                      {course.course_category}
                    </div>

                    {userType === 'Mentor' && course.students && course.students.length === 1 && (
                      <p>{course.students?.length} Student </p>
                    )}

                    {userType === 'Mentor' && course.students && course.students.length > 1 && (
                      <p>{course.students?.length} Students </p>
                    )}

                    {userType === 'Mentor' && (
                      <div>
                        {Math.floor(course.course_price)} <span>$</span>
                      </div>
                    )}

                    {userType === 'Student' && <div>{course.lesson_count} Lessons</div>}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default MyCourses;
