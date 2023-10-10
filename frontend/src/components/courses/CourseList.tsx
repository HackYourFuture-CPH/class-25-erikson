import { Link } from 'react-router-dom';
import { courses } from '../../data/data';
import useFilterStore from '../../store/filter.store';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import styles from './CourseList.module.css';
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
    <div className={styles.courseList}>
      <div className={styles.cardsWrapper}>
        {filteredCourses.map((course) => (
          <Card className={styles.singleCard} key={course.id}>
            <Link to={`/course/${course.id}`} className={styles.singleCourse}>
              <CardMedia component='img' alt={course.course_name} image={course.image} />
              <CardContent className={styles.cardContent}>
                <Typography pb={2} variant='h6' component='div' textAlign='start'>
                  {course.course_name}
                </Typography>
                <Grid container justifyContent='space-between' alignItems='center'>
                  <Grid item xs={6}>
                    <div
                      className={`${styles.tag} ${
                        course.tag === 'Professional'
                          ? styles.professional
                          : course.tag === 'Personal'
                          ? styles.personal
                          : course.tag === 'Finance'
                          ? styles.finance
                          : course.tag === 'Live Event' && styles.event
                      }`}
                    >
                      {course.tag}
                    </div>
                  </Grid>
                  <Grid item xs={6}>
                    <span>{course.contentOutline.lessons.length} Lessons</span>
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
