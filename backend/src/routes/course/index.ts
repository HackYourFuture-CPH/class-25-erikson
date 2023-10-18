import {Router} from 'express';
import { getAll, getCourseById, addNewCourse, startNewCourse, checkEnrollment } from '../../controllers/course';

const course = Router();

course.get('/all', getAll);
course.get('/course/:id', getCourseById); // id - course id
course.post('/:id/add_course', addNewCourse); //id - mentor id
course.post('/student/:studentId/course/:courseId', startNewCourse);
course.get('/student/:studentId/course/:courseId', checkEnrollment);

export default course;