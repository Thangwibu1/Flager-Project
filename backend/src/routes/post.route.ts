import { Router } from 'express';
import { validateBody, validateParams, validateQuery } from '../middlewares/validate.middleware';
import { postCreate, postUpdateSchema, sendReactToPost } from '../types/post/post.request';
import { authenticateUserMiddleware } from '../middlewares/auth.middleware';
import postController from '../controllers/post.controller';
import { paramPostIdAndReactSchema, postIdParamSchema } from '../types/post/post.param';
import { queryCountReactOfPostSchema } from '../types/post/post.query';
const router = Router();
router.post('/', validateBody(postCreate), authenticateUserMiddleware, postController.createPost);
router.patch('/:postId', validateParams(postIdParamSchema), validateBody(postUpdateSchema), authenticateUserMiddleware, postController.updatePost);
router.delete('/:postId', validateParams(postIdParamSchema), authenticateUserMiddleware, postController.deletePost);
router.post('/:postId/reacts', validateParams(postIdParamSchema), validateBody(sendReactToPost), authenticateUserMiddleware, postController.sendReactToPost);
router.get('/:postId/reacts/total', validateParams(postIdParamSchema), validateQuery(queryCountReactOfPostSchema), authenticateUserMiddleware, postController.countReactOfPost);
router.delete('/:postId/reacts/:reactName', validateParams(paramPostIdAndReactSchema), authenticateUserMiddleware, postController.deleteReactOfPost);

export default router;