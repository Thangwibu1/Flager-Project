import { NextFunction, Request, Response } from "express";
import { ApiResponse } from "../utils/api-response.util";

class FriendController {
  sendFriendRequest = async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user!.id;
    res.json(ApiResponse.success("Create new post successfully", null));
  }
}
export default new FriendController();