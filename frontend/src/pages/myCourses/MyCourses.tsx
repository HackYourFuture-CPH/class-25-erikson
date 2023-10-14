import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AllCourseFields, User } from '../../types/component';
import useAllCoursesStore from '../../store/allcourses.store';
import useUserStore from '../../store/user.store';
import DashboardWrapper from '../../components/dashboardLayout/DashboardWrapper';
import styles from './MyCourses.module.css';
import events from '../../components/courses/CourseList.module.css';

const MyCourses: React.FC = () => {
  const navigate = useNavigate();
  const currentUser: User | null = useUserStore((state) => state.currentUser);
  const userCourses: AllCourseFields[] = useAllCoursesStore((state) => state.filteredCourses);

  return (
    <DashboardWrapper>
      <h1>My Courses</h1>
      <div className={styles.courseList}>
        {userCourses.length === 0 ? (
          <div className='gray'>Please enroll in some courses.</div>
        ) : (
          <div className={styles.cardsWrapper}>
            {userCourses.map((course) => (
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

                    {currentUser?.user_type === 'students' ? (
                      <div>{course.lesson_count} Lessons</div>
                    ) : (
                      <div>Enrolled: {course.students.length}</div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardWrapper>
  );
};

export default MyCourses;
