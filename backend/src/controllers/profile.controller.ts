import { NextFunction, Request, Response } from "express";
import userService from "../services/user.service";
import { ApiResponse } from "../utils/api-response.util";

class ProfileController {
  getUserInfo = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user!.id;
      const userInfo = await userService.getOwnerInfo(userId);
      const data = {
        userInfo
      }
      res.json(ApiResponse.success('Get success', data));
    } catch (error) {
      next(error);
    }
  }
  getPostList = async (req: Request, res: Response, next: NextFunction) => {
    
  }

}
export default new ProfileController();