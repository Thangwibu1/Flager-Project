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
    const {userId} = await authService.verifyUser(accessToken);
    req.user = {
      id: userId
    }
  } catch (error) {
    next(error);
  }
}
export {authenticateUserMiddleware}