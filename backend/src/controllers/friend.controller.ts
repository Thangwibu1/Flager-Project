import { NextFunction, Request, Response } from 'express';
import { ApiResponse } from '../utils/api-response.util';
import friendService from '../services/friend.service';
import { FriendAcceptDTO, FriendRequestDTO, FriendRequestRejectDTO } from '../types/friend/Friend';

class FriendController {
    // [POST] /friends/friend-requests
    sendFriendRequest = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const userId = req.user!.id;
            const body: FriendRequestDTO = req.body;
            await friendService.sendAddFriendRequest(userId, body.receiverId);
            res.json(ApiResponse.success('Create new post successfully', null));
        } catch (error) {
            next(error);
        }
    };
    // [POST] /friends
    acceptFriendRequest = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const userId = req.user!.id;
            const body: FriendAcceptDTO = req.body;
            await friendService.acceptFriendRequest(userId, body.receiverId);
            return res.json(
                ApiResponse.success('Accept friend successfully', null)
            );
        } catch (error) {
            next(error);
        }
    };
    // [DELETE] /friends/
    unfriendUser = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userId = req.user!.id;
            const body: FriendAcceptDTO = req.body;
            await friendService.unfriendUser(userId, body.receiverId);
            return res.json(
                ApiResponse.success('Unfriend successfully', null)
            );
        } catch (error) {
            next(error);
        }
    };
    // [DELETE] /friends/friend-requests
    rejectFriendRequest = async (req: Request, res: Response, next: NextFunction) => {
        try {

            const currentUserId = req.user!.id;
            const body: FriendRequestRejectDTO = req.body;
            
            await friendService.rejectFriendRequest(currentUserId, body.receiverId);
        } catch (error) {
            next(error);
        }
    }
}
export default new FriendController();
