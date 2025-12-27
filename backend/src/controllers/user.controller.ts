import { NextFunction, Request, Response } from 'express';
import userService from '../services/user.service';
import { ApiResponse } from '../utils/api-response.util';
import { queryPostListOfUser } from '../types/post/post.query';
import postService from '../services/post.service';

class UserController {
    // [GET] /users/:userId
    getUserProfile = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const currentUserId = req.user!.id;
            const userId = req.params.userId;
            const userInfo = await userService.getUserDetail(
                currentUserId,
                userId
            );
            const dataFinal = {
                user: userInfo,
            };
            res.json(
                ApiResponse.success('Get user profile success', dataFinal)
            );
        } catch (error) {
            next(error);
        }
    };
    getUserPostList = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const currentUserId = req.user!.id;
            const authorId = req.params.userId;
            const query = queryPostListOfUser.parse(req.query);
            const data = await postService.getPostListOfAuthor({
                currentUserId: currentUserId,
                authorId: authorId,
                query,
            });
            res.json(ApiResponse.success('Get user post success', data));
        } catch (error) {
            next(error);
        }
    };
}
export default new UserController();
