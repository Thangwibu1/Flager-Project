import { Router } from 'express';
import { authenticateUserMiddleware } from '../middlewares/auth.middleware';
import userController from '../controllers/user.controller';
import { validateBody, validateParams, validateQuery } from '../middlewares/validate.middleware';
import { userIdParams } from '../types/user/user.param';
import { queryPostListOfUser } from '../types/post/post.query';
import { updateUserProfile } from '../types/user/user.request';
const router = Router();

router.patch('/', validateBody(updateUserProfile), authenticateUserMiddleware, userController.updateUserProfile);
router.get('/:userId', validateParams(userIdParams), authenticateUserMiddleware, userController.getUserProfile);
router.get('/:userId/posts', validateParams(userIdParams), validateQuery(queryPostListOfUser), authenticateUserMiddleware, userController.getUserPostList);
router.get('/:userId/friends/total', validateParams(userIdParams), authenticateUserMiddleware, userController.countFriendsOfUser);
// router.get('/:userId/friends/requesting/total');
// router.get('/:userId/friend/receiving/total');
export default router;