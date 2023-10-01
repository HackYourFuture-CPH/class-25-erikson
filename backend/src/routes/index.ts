import express, { Router } from 'express';
import registration from'./registration';
import course from './course';

const router: Router = express.Router();

router.use('/user', registration)
router.use('/courses', course);

export default router;
