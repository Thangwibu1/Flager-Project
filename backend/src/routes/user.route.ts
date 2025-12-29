import { Router } from 'express';
import { authenticateUserMiddleware } from '../middlewares/auth.middleware';
import userController from '../controllers/user.controller';
import { validateParams, validateQuery } from '../middlewares/validate.middleware';
import { userIdParams } from '../types/user/user.param';
import { queryPostListOfUser } from '../types/post/post.query';
import { queryGetFriendOfUserSchema } from '../types/friend/friend.query';
const router = Router();

router.get('/:userId', validateParams(userIdParams), authenticateUserMiddleware, userController.getUserProfile);
router.get('/:userId/posts', validateParams(userIdParams), validateQuery(queryPostListOfUser), authenticateUserMiddleware, userController.getUserPostList);
router.get('/:userId/friends/total', validateParams(userIdParams), authenticateUserMiddleware, userController.countFriendsOfUser);
router.get('/:userId/friends', validateParams(userIdParams), validateQuery(queryGetFriendOfUserSchema), authenticateUserMiddleware, userController.getFriendListOfUser);
router.get('/:userId/friends/followings/total', validateParams(userIdParams), authenticateUserMiddleware, userController.countTotalFollowingOfUser);
// router.get('/:userId/friends/followings', validateParams(userIdParams), );
router.get('/:userId/friends/followers/total',  validateParams(userIdParams), authenticateUserMiddleware, userController.countTotalFollowerOfUser);
// router.get('/:userId/friend/followers' );
export default router;