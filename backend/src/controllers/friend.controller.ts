import e, { NextFunction, Request, Response } from 'express';
import { ApiResponse } from '../utils/api-response.util';
import friendService from '../services/friend.service';
import { FriendCountDTO } from '../types/friend/Friend';

class FriendController {
    sendFriendRequest = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const userId = req.user!.id;
            req.body.senderId = userId;
            await friendService.sendAddFriendRequest(req.body);
            res.json(ApiResponse.success('Create new post successfully', null));
        } catch (error) {
            next(error);
        }
    };
    acceptFriendRequest = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const userId = req.user!.id;
            req.body.senderId = userId;
            await friendService.acceptFriendRequest(req.body);
            return res.json(
                ApiResponse.success('Accept friend successfully', null)
            );
        } catch (error) {
            next(error);
        }
    };
    unfriendUser = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userId = req.user!.id;
            req.body.senderId = userId;
            await friendService.unfriendUser(req.body);
            return res.json(
                ApiResponse.success('Unfriend successfully', null)
            );
        } catch (error) {
            next(error);
        }
    };
    countFriends = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const totalFriends = await friendService.countFriendsOfUser(req.query as FriendCountDTO);
            const dataFinal = {
                totalFriends: totalFriends
            }
            return res.json(
                ApiResponse.success('Get total friend successfully', dataFinal)
            );
        } catch (error) {
            next(error);
        }
    };
}
export default new FriendController();
