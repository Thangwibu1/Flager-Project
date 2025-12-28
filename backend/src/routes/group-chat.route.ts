import { Router } from 'express';
import { authenticateUserMiddleware } from '../middlewares/auth.middleware';
import { validateBody } from '../middlewares/validate.middleware';
import {
    addMemberRequest,
    createGroupChatRequest,
} from '../types/group/GroupChatRequest';
import groupChatController from '../controllers/group-chat.controller';

const router = Router();
router.post(
    '/create',
    authenticateUserMiddleware,
    validateBody(createGroupChatRequest),
    groupChatController.create
);
router.post(
    '/add-member',
    authenticateUserMiddleware,
    validateBody(addMemberRequest),
    groupChatController.addMember
);
export default router;
