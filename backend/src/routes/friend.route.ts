import { Router } from 'express';
import { authenticateUserMiddleware } from '../middlewares/auth.middleware';
import { validateBody } from '../middlewares/validate.middleware';
import { friendRequest } from '../types/friend/Friend';
import friendController from '../controllers/friend.controller';
const router = Router();
router.post('/request', authenticateUserMiddleware, validateBody(friendRequest), friendController.sendFriendRequest);
export default router;