import { NextFunction, Request, Response } from "express";
import { CreateCommentToPostBodyDTO, ReplyCommentBodyDTO } from "../types/comments/comment.request";
import { PostIdParams } from "../types/post/post.param";
import { ApiResponse } from "../utils/api-response.util";
import commentService from "../services/comment.service";
import { CommentReplyParams } from "../types/comments/comment.params";

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
    // [POST] /:postId/comments/:commentId/replies
    replyToComment = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const curUserId = req.user!.id;
            const body = req.body as ReplyCommentBodyDTO;
            const params = req.params as CommentReplyParams;
            const newComment = await commentService.replyToComment({
              userId: curUserId,
              body: body,
              parentId: params.commentId,
              postId: params.postId
            });
            res.json(ApiResponse.success('Add comment to post successfully', {
              comment: newComment,
            }));
        } catch (error) {
            next(error);
        }
    };
}

export default new Comment();