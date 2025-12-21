import { Request, Response, NextFunction } from "express";
import { verifyAccessToken } from "@utils/jwt.util";
import { AppError } from "./error.middleware";

export interface AuthRequest extends Request {
  userId?: string;
}

export const authenticate = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      throw new AppError(401, "No token provided");
    }

    const decoded = verifyAccessToken(token);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    next(new AppError(401, "Invalid token"));
  }
};
