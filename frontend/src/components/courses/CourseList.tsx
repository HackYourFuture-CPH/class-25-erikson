import { Link } from 'react-router-dom';
import { courses } from '../../data/data';
import useFilterStore from '../../store/filter.store';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import './CourseList.css';
// import useAllCoursesStore from '../../store/allcourses.store';
// import { useAuthContext } from '../../hooks/useAuthContext';
// import axios from 'axios';
// import { useEffect } from 'react';

const CourseList: React.FC = () => {
  const { selectedFilter } = useFilterStore();
  // const { user } = useAuthContext();

  // const { courses, setCourses } = useAllCoursesStore();

  // useEffect(() => {
  //   const fetchCourses = async () => {
  //     try {
  //       const idToken = await user?.getIdToken();
  //       const response = await axios.get('http://localhost:3000/courses', {
  //         headers: {
  //           Authorization: `Bearer ${idToken}`,
  //         },
  //       });
  //       setCourses(response.data);
  //     }
  //     catch (error) {
  //       console.error('Error fetching courses:', error);
  //     }
  //   };

  //   fetchCourses();
  // }, [currentUser, setCourses]);

  const filteredCourses = courses.filter(
    (course) => selectedFilter === 'All' || course.tag === selectedFilter,
  );

  return (
    <div className='course-list'>
      <div className='cards-wrapper'>
        {filteredCourses.map((course) => (
          <Card sx={{ maxWidth: 360 }} key={course.id}>
            <Link to={`/course/${course.id}`} style={{ textDecoration: 'none', color: 'black' }}>
              <CardMedia
                component='img'
                alt={course.course_name}
                height='130'
                image={course.image}
              />
              <CardContent>
                <Typography pb={2} variant='h6' component='div'>
                  {course.course_name}
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <div
                      className={`tag ${
                        course.tag === 'Professional'
                          ? 'professional'
                          : course.tag === 'Personal'
                          ? 'personal'
                          : course.tag === 'Finance'
                          ? 'finance'
                          : course.tag === 'Life Event' && 'event'
                      }`}
                    >
                      {course.tag}
                    </div>
                  </Grid>
                  <Grid item xs={6}>
                    <span className='gray'>{course.contentOutline.lessons.length} Lessons</span>
                  </Grid>
                </Grid>
              </CardContent>
            </Link>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CourseList;
