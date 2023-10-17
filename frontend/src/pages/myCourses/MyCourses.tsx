import React from 'react';
import { sampleCourses } from '../../data/data';
import { useNavigate } from 'react-router-dom';
import DashboardWrapper from '../../components/dashboardLayout/DashboardWrapper';
import styles from './MyCourses.module.css';
import events from '../../components/courses/CourseList.module.css';

const MyCourses: React.FC = () => {
  const navigate = useNavigate();

  return (
    <DashboardWrapper>
      <h1>My Courses</h1>
      <div className={styles.courseList}>
        <div className={styles.cardsWrapper}>
          {sampleCourses.map((course) => (
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
