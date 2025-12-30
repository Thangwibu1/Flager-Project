import { Router } from 'express';
import { authenticateUserMiddleware } from '../middlewares/auth.middleware';
import meController from '../controllers/me.controller';
import { validateBody } from '../middlewares/validate.middleware';
import { updateUserProfile } from '../types/user/user.request';
const router = Router();

router.patch('/profile', validateBody(updateUserProfile), authenticateUserMiddleware, meController.updateMyProfile);
router.get('/profile', authenticateUserMiddleware,  meController.getMyProfile);
// router.patch('/profile/avatar');
// router.patch('/profile/background-avatar');
export default router;