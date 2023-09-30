import express, { Router } from 'express';
import registration from'./registration';
import course from './course';
import lesson from './lesson';
import faq from './faq';
import benefits from './benefits';

const router: Router = express.Router();

router.use('/user', registration)
router.use('/courses', course);
router.use('/course', lesson);
router.use('/course', faq);
router.use('/course', benefits);

export default router;
