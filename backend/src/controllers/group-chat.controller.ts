import { NextFunction, Request, Response } from 'express';
import groupChatService from '../services/group-chat.service';
import { ApiResponse } from '../utils/api-response.util';

class GroupChatController {
    create = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> => {
        try {
            // Lấy creatorId từ user đã đăng nhập (được set bởi authenticateUserMiddleware)
            const creatorId = req.user!.id;

            // Lấy data từ request body
            const data = req.body;

            const friendId = req.body.friendId ? req.body.friendId : undefined;

            // Gọi service với creatorId và data
            const groupChat = await groupChatService.create(
                creatorId,
                data,
                friendId
            );

            res.json(
                ApiResponse.success(
                    'Group chat created successfully',
                    groupChat
                )
            );
        } catch (error) {
            next(error);
        }
    };

    addMember = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> => {
        try {
            const userId = req.body.userId;
            const groupChatId = req.body.groupChatId;
            const adderId = req.user!.id;

            const result = await groupChatService.addMember(
                userId,
                groupChatId,
                adderId
            );

            res.json(ApiResponse.success('Member added successfully', result));
        } catch (error) {
            next(error);
        }
    };
}

export default new GroupChatController();
