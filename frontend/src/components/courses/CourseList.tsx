import { Link } from 'react-router-dom';
import { users, courses } from '../../data/data';
import useFilterStore from '../../store/filter.store';

const CourseList: React.FC = () => {
  const { selectedFilter } = useFilterStore();
  const userType = users[1].type;

  const filteredCourses = courses.filter(
    (course) => selectedFilter === 'All' || course.tag === selectedFilter,
  );

  return (
    <div className='course-list'>
      <h1>Course</h1>

      {userType === 'Mentor' && <Link to='/add-course'>Add Course</Link>}

      {filteredCourses.map((course) => (
        <div className='course-card' key={course.id}>
          <Link to={`/course/${course.id}`}>
            <img src={course.image} alt={course.course_name} />
            <div className='course-description'>
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
