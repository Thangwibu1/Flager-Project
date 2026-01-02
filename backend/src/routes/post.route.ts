import { Router } from 'express';
import { validateBody, validateParams, validateQuery } from '../middlewares/validate.middleware';
import { postCreate, postUpdateSchema, sendReactToPost } from '../types/post/post.request';
import { authenticateUserMiddleware } from '../middlewares/auth.middleware';
import postController from '../controllers/post.controller';
import { paramPostIdAndReactSchema, postIdParamSchema } from '../types/post/post.param';
import { queryCountReactOfPostSchema } from '../types/post/post.query';
import { createCommentToPostBodySchema, replyCommentBodySchema, sendReactToCommentBodySchema } from '../types/comments/comment.request';
import commentController from '../controllers/comment.controller';
import { commentDetailParams } from '../types/comments/comment.params';
import { getCommentListSchema, getReplyCommentListSchema } from '../types/comments/comment.query';
const router = Router();
// post section
router.post('/', validateBody(postCreate), authenticateUserMiddleware, postController.createPost);
router.patch('/:postId', validateParams(postIdParamSchema), validateBody(postUpdateSchema), authenticateUserMiddleware, postController.updatePost);
router.delete('/:postId', validateParams(postIdParamSchema), authenticateUserMiddleware, postController.deletePost);
// post' react section
router.post('/:postId/reacts', validateParams(postIdParamSchema), validateBody(sendReactToPost), authenticateUserMiddleware, postController.sendReactToPost);
router.get('/:postId/reacts/total', validateParams(postIdParamSchema), validateQuery(queryCountReactOfPostSchema), authenticateUserMiddleware, postController.countReactOfPost);
router.delete('/:postId/reacts/:reactName', validateParams(paramPostIdAndReactSchema), authenticateUserMiddleware, postController.deleteReactOfPost);
// comment section
router.get('/:postId/comments', validateParams(postIdParamSchema), validateQuery(getCommentListSchema), authenticateUserMiddleware, commentController.getCommentListOfPost);
router.post('/:postId/comments', validateParams(postIdParamSchema), validateBody(createCommentToPostBodySchema), authenticateUserMiddleware, commentController.createCommentToPost);
router.delete('/:postId/comments/:commentId', validateParams(commentDetailParams), authenticateUserMiddleware, commentController.deleteComment);
// reply section
router.get('/:postId/comments/:commentId/replies', validateParams(commentDetailParams), validateQuery(getReplyCommentListSchema), authenticateUserMiddleware, commentController.getReplyListOfComment);
router.post('/:postId/comments/:commentId/replies', validateParams(commentDetailParams), validateBody(replyCommentBodySchema), authenticateUserMiddleware, commentController.replyToComment);
// comment's react section
router.post('/:postId/comments/:commentId/reacts/', validateParams(commentDetailParams), validateBody(sendReactToCommentBodySchema), authenticateUserMiddleware, commentController.sendReactToComment);
export default router;