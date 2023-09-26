import express, { Router } from 'express';
import auth from './auth';
import registration from'./registration';
const router: Router = express.Router();

router.use('/auth', auth);
router.use('/user', registration)
export default router;
