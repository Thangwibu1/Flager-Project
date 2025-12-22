import { Request, Response, NextFunction } from "express";
import { JwtError } from "../errors/jwt/JwtError";
import { ApiError } from "../errors/api/ApiError";
export const errorHandler = (
  err: Error  | JwtError | ApiError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if(err instanceof ApiError){
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
    });
  }
  else if(err instanceof JwtError){
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
      code: err.code
    })
  }
  console.error("ERROR:", err);
  res.status(500).json({
    success: false,
    message: "Internal server error",
  });
};
