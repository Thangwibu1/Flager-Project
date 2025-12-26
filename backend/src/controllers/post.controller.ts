import { NextFunction, Request, Response } from 'express';
import { ApiResponse } from '../utils/api-response.util';
import postService from '../services/post.service';
class PostController {
    createPost = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userId = req.user!.id;
            req.body.authorId = userId;
            const newPost = await postService.createPostByUser(req.body);
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
            req.query.viewerId = userId;
            const query: any = req.query;
            const payload = {
                ...query,
                ...req.params
            }
            const data = await postService.getPostListOfAuthor(payload);
            res.json(
                ApiResponse.success('Create new post successfully', data)
            );
        } catch (error) {
            next(error);
        }
    };
}
export default new PostController();
