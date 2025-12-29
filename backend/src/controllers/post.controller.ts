import { NextFunction, Request, Response } from 'express';
import { ApiResponse } from '../utils/api-response.util';
import postService from '../services/post.service';
import { queryPostListOfUser } from '../types/post/post.query';
import { PostCreateDTO, PostUpdateDTO } from '../types/post/post.request';
import { PostIdParams } from '../types/post/post.param';
class PostController {
    createPost = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userId = req.user!.id;
            const body = req.body as PostCreateDTO;
            const newPost = await postService.createPostByUser(userId, body);
            const dataFinal = {
                post: newPost,
            };
            res.json(
                ApiResponse.success('Create new post successfully', dataFinal)
            );
        } catch (error) {
            next(error);
        }
    };

    getPostOfAuthor = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const userId = req.user!.id;
            const authorId = req.params.authorId;
            const query = queryPostListOfUser.parse(req.query);
            const data = await postService.getPostListOfAuthor({
                currentUserId: userId,
                authorId: authorId,
                query
            });
            res.json(
                ApiResponse.success('Create new post successfully', data)
            );
        } catch (error) {
            next(error);
        }
    };
    sendReactToPost =  async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            await postService.sendReactToPost(req.user!.id, req.body);
            res.json(ApiResponse.success("Send react to post successfully", null));
        } catch (error) {
            next(error);
        }
    }
    updatePost = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const currentUserId = req.user!.id;
            const params = req.params as PostIdParams;
            const body = req.body as PostUpdateDTO;
            await postService.updatePost(currentUserId, params.postId, body);
            res.json(ApiResponse.success("Update post successfully", null));
        } catch (error) {
            next(error);
        }
    }
}
export default new PostController();
