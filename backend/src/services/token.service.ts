import { redisPrefix } from '../config/constant.config';
import { config } from '../config/env.config';
import { UnauthorizedRequestError } from '../errors/api/ApiError';
import * as jwtUtil from '../utils/jwt.util';
import redisService from './redis.service';
class TokenService {
    getNewAccessToken = (payload: {
        userId: string;
        email?: string;
        username?: string;
    }) => {
        // generate accessToken from jwtUtil
        const accessToken = jwtUtil.generateAccessToken(
            payload.userId,
            payload.email,
            payload.username
        );
        return accessToken;
    };
    getNewRefreshToken = async (
        payload: { userId: string; email?: string },
        deviceId: string
    ) => {
        // generate refreshToken from jwtUtil
        const refreshToken = jwtUtil.generateRefreshToken(
            payload.userId,
            payload.email
        );
        // store refreshToken in redis
        await redisService.setDataWithExpiredTime(
            `${redisPrefix.refreshToken}:${payload.userId}:${refreshToken}`,
            deviceId,
            config.jwt.refreshExpiresInSecond
        );
        return refreshToken;
    };
    isInBlackList = async (token: string) => {
        const data = await redisService.getDataByKey<number>(
            `${redisPrefix.blacklist}:${token}`
        );
        return !(data == null);
    };
    addAccessTokenToBlackList = async (token: string) => {
        const payload = jwtUtil.verifyAccessToken(token);
        const ttlSeconds = payload.exp
            ? (payload.exp as number) - Math.floor(Date.now() / 1000)
            : 0;
        await redisService.setDataWithExpiredTime(
            `${redisPrefix.blacklist}:${token}`,
            1,
            ttlSeconds
        );
    };
    getDeviceIdByRefreshTokenAndUserId = async (
        userId: string,
        token: string
    ): Promise<string | null> => {
        const deviceId = await redisService.getDataByKey<string>(
            `${redisPrefix.refreshToken}:${userId}:${token}`
        );
        return deviceId;
    };
    deleteRefreshToken = async (userId: string, token: string) => {
        await redisService.deleteDataByKey(
            `${redisPrefix.refreshToken}:${userId}:${token}`
        );
    };
}
export default new TokenService();
