import { Router } from 'express';
import authRouter from './auth.route';
import postRouter from './post.route';
import friendRouter from './friend.route';
const router = Router();
router.use('/auth', authRouter);
router.use('/posts', postRouter);
router.use('/friends', friendRouter);
export default router;