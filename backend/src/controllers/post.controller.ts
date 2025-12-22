import { NextFunction, Request, Response } from "express";
import { ApiResponse } from "../utils/api-response.util";
import postService from "../services/post.service";

class PostController {
  createPost = async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user!.id;
    req.body.userId = userId;
    await postService.createPostByUser(req.body);
    res.json(ApiResponse.success("Create new post successfully", null));
  }
}
export default new PostController();