import { Router } from 'express';
import { authenticateUserMiddleware } from '../middlewares/auth.middleware';
import { validateBody } from '../middlewares/validate.middleware';
import { friendAccept, friendRequest } from '../types/friend/Friend';
import friendController from '../controllers/friend.controller';
const router = Router();
router.post(
    '/request',
    authenticateUserMiddleware,
    validateBody(friendRequest),
    friendController.sendFriendRequest
);
router.post(
    '/accept',
    authenticateUserMiddleware,
    validateBody(friendAccept),
    friendController.acceptFriendRequest
);
export default router;
