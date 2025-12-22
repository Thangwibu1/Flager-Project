import { Router } from 'express';
import authController from '../controllers/auth.controller';
import {validateBody} from '../middlewares/validate.middleware';
import { loginUser, registerUser } from '../types/user/User';
const router = Router();
router.post('/login', validateBody(loginUser), authController.login);
router.post('/register', validateBody(registerUser), authController.registerUser);
export default router;