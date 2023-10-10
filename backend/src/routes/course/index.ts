import {Router} from 'express';
import { getAll, getCourseById, addNewCourse } from '../../controllers/course';

const course = Router();

course.get('/all', getAll);
course.get('/course/:id', getCourseById); // id - course id
course.post('/:id/add_course', addNewCourse); //id - mentor id

export default course;