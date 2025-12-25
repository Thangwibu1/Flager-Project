import { NextFunction, Request, Response } from 'express';
import authService from '../services/auth.service';
import { ApiResponse } from '../utils/api-response.util';

class AuthController {
    login = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> => {
        try {
            const deviceId = req.headers['x-device-id'];
            const data = await authService.login(req.body, deviceId);
            res.json(ApiResponse.success('Login successfully', data));
        } catch (error) {
            next(error);
        }
    };
    registerUser = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> => {
        try {
            await authService.register(req.body);
            res.json(ApiResponse.success('Register successfully', null));
        } catch (error) {
            next(error);
        }
    };
    refreshAccessToken = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> => {
        try {
            const userId = req.user!.id;
            const token = await authService.refreshAccessToken(userId);
            const dataFinal = {
                accessToken: token,
            };
            res.json(
                ApiResponse.success('Get new refresh token successfully', dataFinal)
            );
        } catch (error) {
            next(error);
        }
    };
}
export default new AuthController();
