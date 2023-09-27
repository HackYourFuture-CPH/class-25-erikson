import {Router} from 'express';
import { addCourse, getAll, getCourseById } from '../../controllers/course';

const course = Router();

course.post('/:id/add_course', addCourse); // id - mentor id
course.get('/all', getAll);
course.get('/:id', getCourseById);

export default course;