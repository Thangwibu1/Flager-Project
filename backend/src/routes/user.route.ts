import { Router } from 'express';
import { authenticateUserMiddleware } from '../middlewares/auth.middleware';
import profileController from '../controllers/profile.controller';
const router = Router();

router.use(authenticateUserMiddleware);
router.get('/info', profileController.getUserInfo);
router.patch('/edit', profileController.getUserInfo);
export default router;