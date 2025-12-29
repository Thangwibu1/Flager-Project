import { Router } from 'express';
import { authenticateUserMiddleware } from '../middlewares/auth.middleware';
import userController from '../controllers/user.controller';
import { validateParams, validateQuery } from '../middlewares/validate.middleware';
import { userIdParams } from '../types/user/user.param';
import { queryPostListOfUser } from '../types/post/post.query';
const router = Router();

router.get('/:userId', validateParams(userIdParams), authenticateUserMiddleware, userController.getUserProfile);
router.get('/:userId/posts', validateParams(userIdParams), validateQuery(queryPostListOfUser), authenticateUserMiddleware, userController.getUserPostList);
router.get('/:userId/friends/total', validateParams(userIdParams), authenticateUserMiddleware, userController.countFriendsOfUser);
// router.get('/:userId/friends/requesting/total', validateParams(userIdParams), );
// router.get('/:userId/friend/receiving/total' );
export default router;