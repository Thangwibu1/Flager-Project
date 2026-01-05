import { Router } from 'express';
import authController from '../controllers/auth.controller';
import { validateBody } from '../middlewares/validate.middleware';
import { loginUser, registerUser } from '../types/user/user.request';
import {
    authenticateUserMiddleware,
    verifyRefreshTokenMiddleware,
} from '../middlewares/auth.middleware';
const router = Router();
/**
 * @openapi
 * '/api/v1/login':
 *   post:
 *     tags:
 *       - Auth
 *     summary: Login User
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginRequestBody'
 *     responses:
 *       200:
 *         description: Login success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LoginResponse'
 */
router.post('/login', validateBody(loginUser), authController.login);
router.post(
    '/register',
    validateBody(registerUser),
    authController.registerUser
);
router.post(
    '/refresh-token',
    verifyRefreshTokenMiddleware,
    authController.refreshAccessToken
);
router.post('/logout', authenticateUserMiddleware, authController.logout);
export default router;
