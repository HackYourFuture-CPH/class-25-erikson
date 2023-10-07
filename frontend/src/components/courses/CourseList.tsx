import { Link } from 'react-router-dom';
import useFilterStore from '../../store/filter.store';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import styles from './CourseList.module.css';
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
          Authorization: `Bearer ${idToken}`,
        },
      });
      setCourses(response.data);
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, [user, setCourses]);

  const filteredCourses = courses.filter(
    (course) => selectedFilter === 'All' || course.course_category === selectedFilter,
  );

  return (
    <div className={styles.courseList}>
      <div className={styles.cardsWrapper}>
        {filteredCourses.map(
          ({ id, course_title, course_category, course_image, lesson_count }) => (
            <Card className={styles.singleCard} key={id}>
              <Link to={`/course/${id}`} className={styles.singleCourse}>
                <CardMedia component='img' alt={course_title} image={course_image} />
                <CardContent className={styles.cardContent}>
                  <Typography
                    pb={2}
                    variant='h6'
                    component='div'
                    textAlign='start'
                    className={styles.heading}
                  >
                    {course_title}
                  </Typography>
                  <Grid container justifyContent='space-between' alignItems='center'>
                    <Grid item xs={6}>
                      <div
                        className={`${styles.tag} ${
                          course_category === 'Professional'
                            ? styles.professional
                            : course_category === 'Personal'
                            ? styles.personal
                            : course_category === 'Finance' && styles.finance
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
          ),
        )}
      </div>
    </div>
  );
};

export default CourseList;
