import {Router} from 'express';
import { getAll, getCourseById } from '../../controllers/course';

const course = Router();

course.get('/all', getAll);
course.get('/:id', getCourseById);

export default course;