import { redisPrefix } from '../config/constant.config';
import { config } from '../config/env.config';
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
}
export default new TokenService();