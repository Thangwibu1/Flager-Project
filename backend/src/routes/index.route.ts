import { Router } from 'express';
import authRouter from './auth.route';
import postRouter from './post.route';
import friendRouter from './friend.route';
import userRouter from './user.route';
import groupChatRouter from './group-chat.route';
import messageRouter from './message.route';

const router = Router();
router.use('/auth', authRouter);
router.use('/posts', postRouter);
router.use('/users', userRouter);
router.use('/friends', friendRouter);
router.use('/me', meRouter);
router.use('/group-chats', groupChatRouter);
router.use('/group-chats', groupChatRouter);
router.use('/messages', messageRouter);
export default router;
