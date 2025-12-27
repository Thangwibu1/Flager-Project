import { NextFunction, Request, Response } from 'express';
import authService from '../services/auth.service';
import { ApiResponse } from '../utils/api-response.util';
import { UnauthorizedRequestError } from '../errors/api/ApiError';
import { config } from '../config/env.config';

class AuthController {
    login = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> => {
        try {
            const deviceId = req.headers['x-device-id'];
            const data = await authService.login(req.body, deviceId);
            // tự lưu refreshToken trong cookie
            res.cookie('refreshToken', data.refreshToken, {
                httpOnly: true,
                secure: config.env == 'deployment' ? true : false,
                maxAge: config.jwt.refreshExpiresInSecond * 1000,
                sameSite: 'none',
            });
            res.json(
                ApiResponse.success('Login successfully', {
                    accessToken: data.accessToken,
                })
            );
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
            // lấy deviceId (đã kiểm tra ở middleware)
            const deviceId = req.headers['x-device-id'] as string;
            // lấy refreshToken (đã kiểm tra ở middleware)
            const refreshToken = req.cookies.refreshToken as string;
            const userId = req.user!.id;
            const token = await authService.refreshAccessToken(
                userId,
                deviceId,
                refreshToken
            );
            const dataFinal = {
                accessToken: token,
            };
            res.json(
                ApiResponse.success(
                    'Get new refresh token successfully',
                    dataFinal
                )
            );
        } catch (error) {
            next(error);
        }
    };
    logout = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> => {
        try {
            // lấy accessToken (đã kiểm tra ở middleware)
            const accessToken = req.headers.authorization!.split(' ')[1];
            // lấy refreshToken (đã kiểm tra ở middleware)
            const refreshToken = req.cookies.refreshToken as string;
            const userId = req.user!.id;
            await authService.logout(userId, accessToken, refreshToken);
            // xóa refreshToken lưu trong cookie
            res.clearCookie('refreshToken');
            res.json(ApiResponse.success('Logout successfully', null));
        } catch (error) {
            next(error);
        }
    };
}
export default new AuthController();
