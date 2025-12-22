import { Router } from 'express';
import authController from '../controllers/auth.controller';
import {validateBody} from '../middlewares/validate.middleware';
import { loginUser } from '../types/user/User';
const router = Router();
router.post('/login', validateBody(loginUser), authController.login);

export default router;