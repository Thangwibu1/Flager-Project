import { Request, Response, NextFunction } from 'express';
import messageService from '../services/message.service';
import { ApiResponse } from '../utils/api-response.util';

class MessageController {
    /**
     * Get messages by group chat ID with pagination support
     * Query params:
     * - limit: number of messages to fetch (default: 50)
     * - before: messageId to fetch messages before (for lazy loading)
     */
    getMessagesByGroupChatId = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> => {
        try {
            const { groupChatId } = req.params;
            const { limit = '50', before } = req.query;

            // Parse limit to number
            const limitNum = parseInt(limit as string);

            // Build query options
            const options = {
                limit: limitNum,
                before: before as string | undefined,
            };

            // Call service
            const messages = await messageService.getMessagesByGroupChatId(
                groupChatId,
                options
            );

            res.json(
                ApiResponse.success('Messages retrieved successfully', {
                    messages,
                    hasMore: messages.length === limitNum,
                })
            );
        } catch (error) {
            next(error);
        }
    };
}

export default new MessageController();
