import { useNavigate, useParams } from "react-router-dom";
import { useCourseStore } from "../../store/courses.store";
import { courses, Course } from "../../data/data";
import CourseHeader from "../../components/courseDetails/CourseHeader";
import CourseActions from "../../components/courseDetails/CourseActions";
import AboutSection from "../../components/courseDetails/AboutSection";
import ResourcesSection from "../../components/courseDetails/ResourcesSection";
import ReviewsSection from "../../components/courseDetails/ReviewsSection";
import MentorSection from "../../components/courseDetails/MentorSection";
import ContentOutline from "../../components/courseDetails/ContentOutline";
import { useAuthContext } from "../../hooks/useAuthContext";
import { Link } from "react-router-dom";

const convertDurationToMinutes = (duration: string): number => {
  const match = duration.match(/(\d+) minutes/);
  if (match) {
    return parseInt(match[1], 10);
  }
  return 0;
}

const CourseDetails: React.FC = () => {
  const { user } = useAuthContext();
  const navigate = useNavigate();

  if (!user?.emailVerified) {
    navigate("/login", { replace: true });
  }

  const { id } = useParams<{ id: string }>();

  const {
    selectedCourse,
    showAbout,
    showReviews,
    showResources,
    toggleAbout,
    toggleReviews,
    toggleResources,
  } = useCourseStore();

  const courseId = id ? parseInt(id, 10) : null;

  let course: Course | undefined;

  if (selectedCourse && typeof selectedCourse === 'object') {
    course = selectedCourse as Course;
  } else if (courseId) {
    course = courses.find((c) => c.id === courseId);
  }

  if (!course) {
    return (
      <>
        <div>This course does not exists.</div>
        <Link to={"/courses"}>Back to courses</Link>
      </>
    );
  }

  const formatDuration = (totalDurationMinutes: number): string => {
    const hours = Math.floor(totalDurationMinutes / 60);
    const minutes = totalDurationMinutes % 60;
  
    return (hours > 0) ? `${hours}hr ${minutes}m` : `${minutes}m`;
  }
  
  const totalDurationMinutes = course.contentOutline.lessons.reduce(
    (total, lesson) => total + convertDurationToMinutes(lesson.duration), 0
  );
  
  const formattedDuration = formatDuration(totalDurationMinutes);

  return (
    <div>
      <CourseHeader
        courseName={course.course_name}
        tag={course.tag}
        formattedDuration={formattedDuration}
        videoSource={course.contentOutline.lessons[0].video}
      />
      <CourseActions
        toggleAbout={toggleAbout}
        toggleReviews={toggleReviews}
        toggleResources={toggleResources}
      />
      {showAbout && <AboutSection description={course.description} />}
      {showReviews && <ReviewsSection reviews={course.comments} />}
      {showResources && <ResourcesSection lessons={course.contentOutline.lessons} />}
      <MentorSection mentor={course.mentor} />
      <ContentOutline lessons={course.contentOutline.lessons} />
      <button className="start-button">Start</button>
    </div>
  );
}

export default CourseDetails;