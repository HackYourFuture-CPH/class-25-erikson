import { Link } from 'react-router-dom';
import useFilterStore from '../../store/filter.store';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import './CourseList.css';
import useAllCoursesStore from '../../store/allcourses.store';
import { useAuthContext } from '../../hooks/useAuthContext';
import axios from 'axios';
import { useEffect } from 'react';

const CourseList: React.FC = () => {
  const { selectedFilter } = useFilterStore();
  const { user } = useAuthContext();

  const { courses, setCourses } = useAllCoursesStore();

  const fetchCourses = async () => {
    try {
      const idToken = await user?.getIdToken();
      const response = await axios.get('/api/courses/all', {
        headers: {
          Authorization: `Bearer ${idToken}`
        },
      });
      console.log('ID Token:', idToken);
      setCourses(response.data);
    }
    catch (error) {
      console.error('Error fetching courses:', error);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, [user, setCourses]);

  const filteredCourses = courses.filter(
    (course) => selectedFilter === 'All' || course.tag === selectedFilter,
  );

  return (
    <div className='course-list'>
      <div className='cards-wrapper'>
        {filteredCourses.map(({ id, course_name, course_title, course_category, course_image, lesson_count }) => (
          <Card sx={{ maxWidth: 360 }} key={id}>
            <Link to={`/course/${id}`} style={{ textDecoration: 'none', color: 'black' }}>
              <CardMedia
                component='img'
                alt={course_name}
                height='180'
                image={course_image}
              />
              <CardContent>
                <Typography pb={2} variant='h6' component='div'>
                  {course_title}
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <div
                      className={`tag ${
                        course_category === 'Professional'
                          ? 'professional'
                          : course_category === 'Personal'
                          ? 'personal'
                          : course_category === 'Finance' && 'finance'
                      }`}
                    >
                      {course_category}
                    </div>
                  </Grid>
                  <Grid item xs={6}>
                    <span className='gray'>{lesson_count} Lessons</span>
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
