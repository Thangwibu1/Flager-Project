import e, { NextFunction, Request, Response } from 'express';
import { ApiResponse } from '../utils/api-response.util';
import friendService from '../services/friend.service';

class FriendController {
    sendFriendRequest = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const userId = req.user!.id;
            req.body.senderId = userId;
            const friendRequestData = await friendService.sendAddFriendRequest(
                req.body
            );
            const dataFinal = {
                friendRequestData,
            };
            res.json(
                ApiResponse.success('Create new post successfully', dataFinal)
            );
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
            res.json(ApiResponse.success("Accept friend successfully", null));
        } catch (error) {
            next();
        }
    };
}
export default new FriendController();
