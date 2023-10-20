import { useNavigate, useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useCourseStore } from '../../store/courses.store';
import CourseHeader from '../../components/courseDetails/CourseHeader';
import ResourcesSection from '../../components/courseDetails/resourcesSection/ResourcesSection';
import ContentOutline from '../../components/courseDetails/ContentOutline';
import BackArrow from '../../assets/icons/arrow_back.svg';
import styles from './Lessons.module.css';
import useAxiosFetch from '../../hooks/useAxiosFetch';
import AboutSection from '../../components/courseDetails/aboutSection/AboutSection';
import { useAuthContext } from '../../hooks/useAuthContext';
import LessonActions from '../../components/lessonDetails/LessonActions.component';

const Lessons: React.FC = () => {
  const [singleCourse, setSingleCourse] = useState<any>(null);
  const [selectedLesson, setSelectedLesson] = useState(0);
  const [lesson, setLesson] = useState<any>(null);
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const { data: currentUser } = useAxiosFetch<any>(`/api/user/uid/${user?.uid}`);

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

  useEffect(() => {
    if (singleCourse) {
      setLesson(singleCourse.lessons[selectedLesson]);
    }
  }, [selectedLesson, singleCourse]);

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
        <h3>Go back</h3>
      </div>

      <div className={styles.courseDetails}>
        <div className={styles.gridLeft}>
          <div></div>

          <CourseHeader
            courseName={`${singleCourse.course_title} lessons`}
            tag={singleCourse.course_category}
            link={singleCourse.course_image}
            lessonTitle={lesson && lesson.lesson_title}
            lessonSource={lesson && lesson.lesson_resources[0].lesson_resources}
            lessonImage={lesson && lesson.lesson_image}
          />

          <LessonActions toggleAbout={toggleAbout} toggleResources={toggleFAQs} />

          {showAbout && <AboutSection description={lesson && lesson.lesson_description} />}

          {showFaqs && <ResourcesSection lessons={singleCourse.lessons} />}
        </div>
        <div className={styles.gridRight}>
          <div className={styles.gridWrapper}>
            <ContentOutline
              isLesson={true}
              selectedLesson={selectedLesson}
              setSelectedLesson={setSelectedLesson}
              lessons={singleCourse.lessons}
            />
          </div>

          {singleCourse.lessons.length > 0 && <div className={styles.gridRight}></div>}
        </div>
      </div>
    </>
  );
};

export default Lessons;
