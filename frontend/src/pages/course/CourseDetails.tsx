import { useNavigate, useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useCourseStore } from '../../store/courses.store';
import CourseHeader from '../../components/courseDetails/CourseHeader';
import CourseActions from '../../components/courseDetails/CourseActions';
import AboutSection from '../../components/courseDetails/aboutSection/AboutSection';
import ResourcesSection from '../../components/courseDetails/resourcesSection/ResourcesSection';
import FaqsSection from '../../components/courseDetails/faqsSection/FaqsSection';
import ContentOutline from '../../components/courseDetails/ContentOutline';
import DashboardWrapper from '../../components/dashboardLayout/DashboardWrapper';
import BackArrow from '../../assets/icons/arrow_back.svg';
import styles from './CourseDetails.module.css';
import useAxiosFetch from '../../hooks/useAxiosFetch';

const CourseDetails: React.FC = () => {
  const [singleCourse, setSingleCourse] = useState<any>(null);
  const navigate = useNavigate();

  const { id } = useParams<{ id: string }>();

  const { showAbout, showFaqs, toggleAbout, toggleFAQs } = useCourseStore();
  const courseId = id ? parseInt(id, 10) : null;

  const {
    data: fetchedCourses,
    isLoading,
    error,
  } = useAxiosFetch<any>(`/api/courses/course/${courseId}`);

  useEffect(() => {
    if (fetchedCourses) {
      setSingleCourse(fetchedCourses);
    }
  }, [fetchedCourses, setSingleCourse]);

  if (isLoading) {
    return <div className='loading'>Loading...</div>;
  }

  if (error) {
    return <div className='error'>{error?.message}</div>;
  }

  if (!singleCourse) {
    return (
      <>
        <div>This course does not exists.</div>
        <Link to={'/courses'}>Back to courses</Link>
      </>
    );
  }

  return (
    <>
      <DashboardWrapper>
        <div className={styles.breadCrump} onClick={() => navigate('/courses')}>
          <p>
            <img src={BackArrow} alt='back-arrow' />
          </p>
          <h1>Course Details</h1>
        </div>
        <div className={styles.courseDetails}>
          <div className={styles.gridLeft}>
            <CourseHeader
              courseName={singleCourse.course_title}
              tag={singleCourse.course_category}
              link={singleCourse.course_image}
              formattedDuration='8 min'
            />
            <CourseActions toggleAbout={toggleAbout} toggleFAQs={toggleFAQs} />
            {showAbout && <AboutSection description={singleCourse.course_description} />}
            {showFaqs && <FaqsSection faqs={singleCourse.faqs} />}
            <button className={styles.startButton}>Start</button>
          </div>

          <div className={styles.gridWrapper}>
            <div className={styles.gridRight}>
              <ContentOutline lessons={singleCourse.lessons} />
            </div>

            {singleCourse.lessons.length > 0 && (
              <div className={styles.gridRight}>
                <ResourcesSection lessons={singleCourse.lessons} />
              </div>
            )}
          </div>
        </div>
      </DashboardWrapper>
    </>
  );
};

export default CourseDetails;
