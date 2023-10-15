import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { AllCourseFields, User } from '../../types/component';
import useUserStore from '../../store/user.store';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import useFilterStore from '../../store/filter.store';
import useAllCoursesStore from '../../store/allcourses.store';
import useAxiosFetch from '../../hooks/useAxiosFetch';
import styles from './CourseList.module.css';

const CourseList: React.FC = () => {
  const { selectedFilter } = useFilterStore();
  const currentUser: User | null = useUserStore((state) => state.currentUser);
  const { allCourses, setAllCourses, setFilteredCourses } = useAllCoursesStore();

  const {
    data: fetchedCourses,
    isLoading,
    error,
  } = useAxiosFetch<AllCourseFields[]>('/api/courses/all');

  useEffect(() => {
    if (fetchedCourses) {
      setAllCourses(fetchedCourses);
      if (currentUser?.user_type === 'student') {
        const studentCourses: AllCourseFields[] = allCourses.filter((course) => {
          return course.students.includes(currentUser.id);
        });
        setFilteredCourses(studentCourses);
      } else {
        const mentorCourses: AllCourseFields[] = allCourses.filter((course) => {
          return course.mentor === currentUser?.id;
        });
        setFilteredCourses(mentorCourses);
      }
    }
  }, [fetchedCourses, setAllCourses, setFilteredCourses]);

  const filterCourses = allCourses.filter(
    (course) => selectedFilter === 'All' || course.course_category === selectedFilter,
  );

  if (isLoading) {
    return <div className='loading'>Loading...</div>;
  }

  if (error) {
    return <div className='error'>{error?.message}</div>;
  }

  return (
    <div className={styles.courseList}>
      <div className={styles.cardsWrapper}>
        {filterCourses.map(
          ({ id, course_title, course_category, course_image, lesson_count }: any) => (
            <Card className={styles.singleCard} key={id}>
              <Link to={`/course/${id}`} className={styles.singleCourse}>
                <CardMedia component='img' alt={course_title} image={course_image} height='300' />
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
