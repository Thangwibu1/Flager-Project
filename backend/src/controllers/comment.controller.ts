import { NextFunction, Request, Response } from "express";
import { CreateCommentToPostBodyDTO } from "../types/comments/comment.request";
import { PostIdParams } from "../types/post/post.param";
import { ApiResponse } from "../utils/api-response.util";
import commentService from "../services/comment.service";

class Comment {
  // [POST] /posts/:postId/comments
    createCommentToPost = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const curUserId = req.user!.id;
            const body = req.body as CreateCommentToPostBodyDTO;
            const params = req.params as PostIdParams;
            const newComment = await commentService.createCommentToPost(curUserId, params.postId, body);
            res.json(ApiResponse.success('Add comment to post successfully', {
              comment: newComment,
            }));
        } catch (error) {
            next(error);
        }
    };
}

export default new Comment();