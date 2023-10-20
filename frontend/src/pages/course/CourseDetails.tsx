import { useNavigate, useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useCourseStore } from '../../store/courses.store';
import CourseHeader from '../../components/courseDetails/CourseHeader';
import CourseActions from '../../components/courseDetails/CourseActions';
import FaqsSection from '../../components/courseDetails/faqsSection/FaqsSection';
import ContentOutline from '../../components/courseDetails/ContentOutline';
import BackArrow from '../../assets/icons/arrow_back.svg';
import styles from './CourseDetails.module.css';
import useAxiosFetch from '../../hooks/useAxiosFetch';
import AboutSection from '../../components/courseDetails/aboutSection/AboutSection';
import Button from '../../components/button/Button.component';
import { useAuthContext } from '../../hooks/useAuthContext';
import axios from 'axios';

const CourseDetails: React.FC = () => {
  const [singleCourse, setSingleCourse] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const { data: currentUser } = useAxiosFetch<any>(`/api/user/uid/${user?.uid}`, 'GET');

  const { id } = useParams<{ id: string }>();

  const { showAbout, showFaqs, toggleAbout, toggleFAQs } = useCourseStore();
  const courseId = id ? parseInt(id, 10) : null;

  const { data: fetchedCourses, error } = useAxiosFetch<any>(`/api/courses/course/${courseId}`);
  const { data: fetchedStatus } = useAxiosFetch<any[]>(
    `/api/courses/student/${currentUser?.id}/course/${courseId}`,
  );

  const enrollInCourse = async () => {
    if (fetchedStatus) {
      navigate(`/course/${courseId}/lessons`);
    } else {
      try {
        const idToken = await user?.getIdToken();
        await axios.post(
          `/api/courses/student/${currentUser?.id}/course/${courseId}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${idToken}`,
            },
          },
        );

        setIsLoading(false);
        navigate(`/course/${courseId}/lessons`);
      } catch (error) {
        setIsLoading(false);
      }
    }
  };

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
      <div className={styles.breadCrump} onClick={() => navigate('/courses')}>
        <p>
          <img src={BackArrow} alt='back-arrow' />
        </p>
        <h3>Course Details</h3>
      </div>
      <div className={styles.courseDetails}>
        <div className={styles.gridLeft}>
          <CourseHeader
            courseName={singleCourse.course_title}
            tag={singleCourse.course_category}
            link={singleCourse.course_image}
          />
          <CourseActions toggleAbout={toggleAbout} toggleFAQs={toggleFAQs} />
          {showAbout && <AboutSection description={singleCourse.course_description} />}
          {showFaqs && <FaqsSection faqs={singleCourse.faqs} />}
          <div className={styles.button}>
            {currentUser?.user_type === 'Student' && (
              <Button
                label={!fetchedStatus ? 'Enroll' : 'Go to course'}
                isLoading={isLoading}
                onClick={enrollInCourse}
              />
            )}
          </div>
        </div>

        <div className={styles.gridWrapper}>
          <div className={styles.gridRight}>
            <ContentOutline lessons={singleCourse.lessons} />
          </div>
        </div>
      </div>
    </>
  );
};

export default CourseDetails;
