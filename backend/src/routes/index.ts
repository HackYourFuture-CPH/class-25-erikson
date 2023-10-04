import express, { Router } from 'express';
import course from './course';
import { validateAuth } from '../helpers/validate-auth';
import userRouter from './user';

const router: Router = express.Router();

router.use('/user', validateAuth, userRouter);
router.use('/courses', validateAuth, course);

export default router;
