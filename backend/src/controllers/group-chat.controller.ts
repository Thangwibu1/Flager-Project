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

            // Gọi service với creatorId và data
            const groupChat = await groupChatService.create(creatorId, data);

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
}
