import { NextFunction, Response, Request  } from "express";
import { UnauthorizedRequestError } from "../errors/api/ApiError";
import authService from "../services/auth.service";
const authenticateUserMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // split Bearer token
    const authorization = req.headers.authorization?.split(" ");
    if(!authorization || authorization.length != 2){
      throw new UnauthorizedRequestError("Please login to get resources");
    }
    const accessToken = authorization[1].trim();
    const {userId} = await authService.verifyAccessToken(accessToken);
    req.user = {
      id: userId
    }
    next();
  } catch (error) {
    next(error);
  }
}
const verifyRefreshTokenMiddleware = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        // check token and device id in headers
        const authorization = req.headers.authorization?.split(' ');
        if (!authorization || authorization.length != 2) {
            throw new UnauthorizedRequestError('Invalid refresh token');
        }
        const deviceId = req.headers['x-device-id'] as string;
        if(!deviceId || typeof deviceId != 'string'){
          throw new UnauthorizedRequestError("Invalid deviceId");
        }
        const refreshToken = authorization[1].trim();
        // get payload
        const {userId} = await authService.verifyRefreshToken(refreshToken, deviceId);
        req.user = {
          id: userId,
        }
        next();
    } catch (error) {
        next(error);
    }
};
export {authenticateUserMiddleware, verifyRefreshTokenMiddleware}