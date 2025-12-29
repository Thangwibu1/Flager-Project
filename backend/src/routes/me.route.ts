import { Router } from 'express';
import { authenticateUserMiddleware } from '../middlewares/auth.middleware';
import meController from '../controllers/me.controller';
import { validateBody } from '../middlewares/validate.middleware';
import { updateUserProfile } from '../types/user/user.request';
const router = Router();

router.patch('/profile', validateBody(updateUserProfile), authenticateUserMiddleware, meController.updateMyProfile);
router.get('/profile', authenticateUserMiddleware,  meController.getMyProfile);
export default router;