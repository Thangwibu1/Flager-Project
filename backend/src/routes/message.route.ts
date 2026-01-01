import { Router } from 'express';
import messageController from '../controllers/message.controller';
import { authenticateUserMiddleware } from '../middlewares/auth.middleware';

const router = Router();

// Get messages by group chat ID with pagination
router.get(
    '/group-chat/:groupChatId',
    authenticateUserMiddleware,
    messageController.getMessagesByGroupChatId
);

export default router;
