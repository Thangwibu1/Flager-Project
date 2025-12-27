import { Router } from 'express';
import { authenticateUserMiddleware } from '../middlewares/auth.middleware';
import userController from '../controllers/user.controller';
import { validateParams } from '../middlewares/validate.middleware';
import { userIdParams } from '../types/user/User';
const router = Router();

router.get('/:userId', validateParams(userIdParams), authenticateUserMiddleware, userController.getUserProfile);
// router.put('/', profileController.getUserInfo);
router.get('/:userId/posts', validateParams(userIdParams), authenticateUserMiddleware, userController.getUserPostList);
export default router;