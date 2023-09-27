import { Link } from "react-router-dom";
import { courses } from "../../data/data";
import useFilterStore from "../../store/filter.store";

const CourseList: React.FC = () => {
  const { selectedFilter } = useFilterStore();

  const filteredCourses = courses.filter(
    (course) => selectedFilter === 'All' || course.tag === selectedFilter
  );

  return (
    <div className="course-list">
      <h1>Course</h1>
      {filteredCourses.map((course) => (
        <div className="course-card" key={course.id}>
          <Link to={`/course/${course.id}`}>
            <img src={course.image} alt={course.course_name} />
            <div className="course-description">
                <h3>{course.course_name}</h3>
                <p>{course.description}</p>
                <p>Lessons: {course.contentOutline.lessons.length}</p>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default CourseList;