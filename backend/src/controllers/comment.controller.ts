import { NextFunction, Request, Response } from "express";
import { CreateCommentToPostBodyDTO, ReplyCommentBodyDTO } from "../types/comments/comment.request";
import { PostIdParams } from "../types/post/post.param";
import { ApiResponse } from "../utils/api-response.util";
import commentService from "../services/comment.service";
import { CommentReplyParams } from "../types/comments/comment.params";
import { GetCommentListQuery, GetReplyCommentListQuery } from "../types/comments/comment.query";

class CommentController {
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
    // [DELETE] /:postId/comments/:commentId
    deleteComment = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const curUserId = req.user!.id;
            const params = req.params as CommentReplyParams;
            await commentService.deleteComment(curUserId, params.postId, params.commentId);
            res.json(ApiResponse.success('Add comment to post successfully', null));
        } catch (error) {
            next(error);
        }

    }

    getCommentListOfPost = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => { 
        try {
            const curUserId = req.user!.id;
            const params = req.params as PostIdParams;
            const query = req.query as GetCommentListQuery;
            const data = await commentService.getCommentListOfPost(curUserId, params.postId, query);
            res.json(ApiResponse.success('Get comment of post successfully', data));
        } catch (error) {
            next(error);
        }

    }

    getReplyListOfComment = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => { 
        try {
            const curUserId = req.user!.id;
            const params = req.params as CommentReplyParams;
            const query = req.query as GetReplyCommentListQuery;
            const data = await commentService.getReplyListOfComment({ 
                curUserId: curUserId,
                parentId: params.commentId,
                postId: params.postId,
                query: query,
            });
            res.json(ApiResponse.success('Add comment to post successfully', data));
        } catch (error) {
            next(error);
        }

    }
}

export default new CommentController();