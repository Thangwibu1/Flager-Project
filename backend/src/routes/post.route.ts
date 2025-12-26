import { Router } from 'express';
import { validateBody, validateData, validateParams, validateQuery } from '../middlewares/validate.middleware';
import { postCreate, postListOfUser } from '../types/post/post.request';
import { authenticateUserMiddleware } from '../middlewares/auth.middleware';
import postController from '../controllers/post.controller';
const router = Router();
router.get('/list/:authorId', validateParams(postListOfUser), authenticateUserMiddleware, postController.getPostOfAuthor);
router.post('/create', validateBody(postCreate), authenticateUserMiddleware, postController.createPost);
export default router;