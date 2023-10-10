import { Router } from 'express';
import { createUser, getUserById, getUserByUid } from '../../controllers/user';

const userRouter = Router();
userRouter.post('/create', createUser);
userRouter.get('/:id', getUserById);
userRouter.get('/uid/:uid', getUserByUid);

export default userRouter;
