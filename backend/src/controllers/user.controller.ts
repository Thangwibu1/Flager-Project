import { NextFunction, Request, Response } from 'express';
import userService from '../services/user.service';
import { ApiResponse } from '../utils/api-response.util';
import { QueryPostListOfUser, queryPostListOfUser } from '../types/post/post.query';
import postService from '../services/post.service';
import { UserIdParams } from '../types/user/user.param';
import friendService from '../services/friend.service';
import { QueryGetFollowerList, QueryGetFollowingList, QueryGetFriendOfUser } from '../types/friend/friend.query';

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
            const userInfo = await userService.getUserProfile(
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
    // [GET] /users/:userId/posts
    getUserPostList = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {

            const currentUserId = req.user!.id;
            const params  = req.params as UserIdParams;
            const query = req.query as QueryPostListOfUser;

            const data = await postService.getPostListOfAuthor({
                currentUserId: currentUserId,
                authorId: params.userId,
                query,
            });

            res.json(ApiResponse.success('Get user post success', data));
        } catch (error) {
            next(error);
        }
    };
    countFriendsOfUser = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            
            const currentUserId = req.user!.id;
            const params = req.params as UserIdParams;
            const total = friendService.countFriendsOfUser(currentUserId, params.userId);
            const dataFinal = {
                total: total
            }
            return res.json(
                ApiResponse.success('Get total friends successfully', dataFinal)
            );
        } catch (error) {
            next(error);
        }
    }
    getFriendListOfUser = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const query = req.query as QueryGetFriendOfUser;
            const params = req.params as UserIdParams;
            const dataFinal = await friendService.getListFriendsOfUser( req.user!.id, params.userId, query);
            return res.json(
                ApiResponse.success('Get friends successfully', dataFinal)
            );
        }  catch (error) {
            next(error);
        }
    }
    countTotalFollowingOfUser = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const curUserId: string = req.user!.id;
            const params = req.params as UserIdParams;
            const total = await friendService.countTotalFollowing(curUserId, params.userId);
            return res.json(
                ApiResponse.success('Get friends successfully', {
                    total: total,
                })
            );
        } catch (error) {
            next(error);
        }
    }
    countTotalFollowerOfUser = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const curUserId: string = req.user!.id;
            const params = req.params as UserIdParams;
            const total = await friendService.countTotalFollower(curUserId, params.userId);
            return res.json(
                ApiResponse.success('Get friends successfully', {
                    total: total,
                })
            );
        } catch (error) {
            next(error);
        }
    }
    getFollowingUserList = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const curUserId = req.user!.id;
            const params = req.params as UserIdParams;
            const query = req.query as QueryGetFollowingList;
            const {userList, pagination} = await friendService.getFollowingUserList(curUserId, params.userId, query);
            const dataFinal = {
                followingList: userList,
                pagination,
            }
            return res.json(
                ApiResponse.success('Get following users successfully', dataFinal)
            );
        } catch (error) {
            next(error);
        }
    }
    getFollowerList = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const curUserId = req.user!.id;
            const params = req.params as UserIdParams;
            const query = req.query as QueryGetFollowerList;
            const {userList, pagination} = await friendService.getFollowerList(curUserId, params.userId, query);
            const dataFinal = {
                userList: userList,
                pagination,
            }
            return res.json(
                ApiResponse.success('Get following users successfully', dataFinal)
            );
        } catch (error) {
            next(error);
        }
    }
    
}
export default new UserController();