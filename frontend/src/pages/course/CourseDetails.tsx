import { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { useCourseStore } from '../../store/courses.store';
import { useAuthContext } from '../../hooks/useAuthContext';
import { AllCourseFields, GetCourseFields, User } from '../../types/component';
import useAxiosFetch from '../../hooks/useAxiosFetch';
import useUserStore from '../../store/user.store';
import useAllCoursesStore from '../../store/allcourses.store';
import CourseHeader from '../../components/courseDetails/CourseHeader';
import CourseActions from '../../components/courseDetails/CourseActions';
import AboutSection from '../../components/courseDetails/aboutSection/AboutSection';
import ResourcesSection from '../../components/courseDetails/resourcesSection/ResourcesSection';
import FaqsSection from '../../components/courseDetails/faqsSection/FaqsSection';
import ContentOutline from '../../components/courseDetails/ContentOutline';
import DashboardWrapper from '../../components/dashboardLayout/DashboardWrapper';
import BackArrow from '../../assets/icons/arrow_back.svg';
import styles from './CourseDetails.module.css';

const CourseDetails: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const { setFilteredCourses } = useAllCoursesStore();

  const [singleCourse, setSingleCourse] = useState<any>(null);
  const [isLessonIdExists, setIsLessonIdExists] = useState<boolean>(false);

  const currentUser: User | null = useUserStore((state) => state.currentUser);
  const userCourses: AllCourseFields[] = useAllCoursesStore((state) => state.filteredCourses);

  const { id } = useParams<{ id: string }>();

  const { showAbout, showFaqs, toggleAbout, toggleFAQs } = useCourseStore();
  const courseId = id ? parseInt(id, 10) : null;

  const {
    data: fetchedCourse,
    isLoading,
    error,
  } = useAxiosFetch<GetCourseFields>(`/api/courses/course/${courseId}`);

  const isStudent = currentUser?.user_type === 'student';

  useEffect(() => {
    if (fetchedCourse) {
      setSingleCourse(fetchedCourse);
    }
  }, [fetchedCourse]);

  useEffect(() => {
    const checkId: boolean = userCourses.some(
      (course) => course.students?.includes(singleCourse.id),
    );
    setIsLessonIdExists(checkId);
  }, [userCourses, singleCourse.id]);

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

  if (!user?.emailVerified) {
    navigate('/login', { replace: true });
  }

  const handleEnrollClick = () => {
    if (isStudent && !isLessonIdExists) {
      const updatedCourses = userCourses.map((course) => {
        if (course.id === singleCourse.id) {
          const newStudents = course.students
            ? [...course.students, currentUser?.id]
            : [currentUser?.id];
          return {
            ...course,
            students: newStudents,
          };
        }
        return course;
      });

      setFilteredCourses(updatedCourses);

      setIsLessonIdExists(true);
    }
  };

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
            {isStudent && (
              <button
                className={styles.startButton}
                disabled={isLessonIdExists}
                onClick={handleEnrollClick}
              >
                {isLessonIdExists ? 'Start' : 'Enroll'}
              </button>
            )}
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
