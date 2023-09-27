import express, { Router } from 'express';
import auth from './auth';
import registration from'./registration';
import course from './course';
import lesson from './lesson';

const router: Router = express.Router();

router.use('/auth', auth);
router.use('/user', registration)
router.use('/courses', course);
router.use('/course', lesson);


export default router;
