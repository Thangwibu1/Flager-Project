import { Router } from 'express';
import { validateBody } from '../middlewares/validate.middleware';
import { postCreate } from '../types/post/Post';
import { authenticateUserMiddleware } from '../middlewares/auth.middleware';
import postController from '../controllers/post.controller';
const router = Router();
router.post('/create', validateBody(postCreate), authenticateUserMiddleware, postController.createPost);
export default router;