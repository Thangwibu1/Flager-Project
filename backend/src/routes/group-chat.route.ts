import { Router } from 'express';
import { authenticateUserMiddleware } from '../middlewares/auth.middleware';
import { validateBody } from '../middlewares/validate.middleware';
import {
    addMemberRequest,
    createGroupChatRequest,
} from '../types/group/GroupChatRequest';
import groupChatController from '../controllers/group-chat.controller';

const router = Router();

// Create a group chat
router.post(
    '/',
    authenticateUserMiddleware,
    validateBody(createGroupChatRequest),
    groupChatController.create
);

// Add member to group chat
router.post(
    '/:groupId/members',
    authenticateUserMiddleware,
    validateBody(addMemberRequest),
    groupChatController.addMember
);

// Get all group chats for a user
router.get(
    '/user/:userId',
    authenticateUserMiddleware,
    groupChatController.getGroupChatsByUserId
);

// Get single group chat by ID
router.get(
    '/:groupChatId',
    authenticateUserMiddleware,
    groupChatController.getGroupChatById
);

export default router;
