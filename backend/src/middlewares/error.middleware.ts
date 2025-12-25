import { Request, Response, NextFunction } from "express";
import { JwtError } from "../errors/jwt/JwtError";
import { ApiError } from "../errors/api/ApiError";
import { ApiResponse } from "../utils/api-response.util";
export const errorHandler = (
  err: Error  | JwtError | ApiError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error("ERROR:", err);
  if(err instanceof ApiError){
    return res.status(err.statusCode).json(ApiResponse.error(err.message));
  }
  else if(err instanceof JwtError){
    return res.status(err.statusCode).json(ApiResponse.error(err.message, err.code))
  }
  res.status(500).json(ApiResponse.error("Internal server error"));
};
