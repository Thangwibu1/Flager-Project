import { redisPrefix } from '../config/constant.config';
import { config } from '../config/env.config';
import { UnauthorizedRequestError } from '../errors/api/ApiError';
import * as jwtUtil from '../utils/jwt.util';
import redisService from './redis.service';
class TokenService {
  getNewAccessToken = (payload: {userId: string, email?: string}) => {
    // generate accessToken from jwtUtil
    const accessToken = jwtUtil.generateAccessToken(payload.userId, payload.email);
    return accessToken;
  }
  getNewRefreshToken = async (payload: {userId: string, email?: string}) => {
    // generate refreshToken from jwtUtil
    const refreshToken = jwtUtil.generateRefreshToken(payload.userId, payload.email);
    // store refreshToken in redis
    await redisService.setDataWithExpiredTime(`${redisPrefix.refreshToken}:${payload.userId}:${refreshToken}`, 1, config.jwt.refreshExpiresInSecond);
    return refreshToken;
  }
  isInBlackList = async (token: string) => {
    const data = await redisService.getDataByKey<number>(`${redisPrefix.blacklist}:${token}`);
    return !(data == null);
  }
  isExistRefreshToken = async (token: string) => {
    const data = await redisService.getDataByKey<number>(`${redisPrefix.refreshToken}:${token}`);
    return !(data == null);
  }
  getRefreshTokenByDeviceIdAndUserId = async (userId: string, deviceId: string) => {
    return await redisService.getDataByKey<string>(`${redisPrefix.device_user}:${deviceId}:${userId}`);
  }
}
export default new TokenService();