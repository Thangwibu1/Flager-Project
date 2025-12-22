import { Router } from 'express';
import authRouter from './auth.route';
import postRouter from './post.route';
const router = Router();
router.use('/auth', authRouter);
router.use('/posts', postRouter);
export default router;