import { Router } from 'express';
import { authenticateUserMiddleware } from '../middlewares/auth.middleware';
import { validateBody } from '../middlewares/validate.middleware';
import { createGroupChatRequest } from '../types/group/GroupChatRequest';
import groupChatController from '../controllers/group-chat.controller';

const router = Router();
router.post(
    '/create',
    authenticateUserMiddleware,
    validateBody(createGroupChatRequest),
    groupChatController.create
);
export default router;
