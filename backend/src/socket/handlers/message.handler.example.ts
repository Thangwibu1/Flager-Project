import { Socket } from 'socket.io';
import { withValidation } from '../middlewares/validate.middleware';
import {
    CreateMessageSocketSchema,
    CreateMessageSocketData,
    AddReactionSocketSchema,
    AddReactionSocketData,
    MarkAsReadSocketSchema,
    MarkAsReadSocketData,
} from '../../types/message/message.socket';
import messageService from '../../services/message.service';
import { Types } from 'mongoose';

/**
 * EXAMPLE: Message Socket Handlers với validation
 * File này là ví dụ về cách sử dụng validation middleware
 */

// ===== CÁCH 1: Sử dụng withValidation wrapper =====

/**
 * Handler tạo message mới
 */
const handleCreateMessage = withValidation(
    CreateMessageSocketSchema,
    async (socket: Socket, data: CreateMessageSocketData, callback?: any) => {
        try {
            // Lấy userId từ socket data (đã được set bởi auth middleware)
            const userId = (socket as any).data.user.userId;

            // Tạo message
            const newMessage = await messageService.createMessage({
                groupChatId: new Types.ObjectId(data.groupChatId),
                senderId: new Types.ObjectId(userId),
                content: data.content,
                type: data.type,
                replyBy: data.replyBy
                    ? new Types.ObjectId(data.replyBy)
                    : undefined,
                metadata: data.metadata,
            });

            // Broadcast message mới đến tất cả users trong room (trừ người gửi)
            socket.to(data.groupChatId).emit('new_message', newMessage);

            // Trả về acknowledgment cho người gửi qua callback
            if (callback) {
                callback({
                    success: true,
                    message: newMessage,
                });
            }
        } catch (error: any) {
            // Trả error qua callback nếu có, nếu không thì emit error event
            if (callback) {
                callback({
                    success: false,
                    error: error.message || 'Failed to create message',
                });
            } else {
                socket.emit('error', {
                    message: error.message || 'Failed to create message',
                });
            }
        }
    }
);

/**
 * Handler thêm reaction
 */
const handleAddReaction = withValidation(
    AddReactionSocketSchema,
    async (socket: Socket, data: AddReactionSocketData) => {
        try {
            const userId = (socket as any).data.user.userId;

            const result = await messageService.addReactionToMessage(
                data.messageId,
                userId,
                data.type
            );

            // Broadcast reaction mới đến room
            const message = await messageService.getMessageById(data.messageId);
            const groupChatId = message.groupChatId.toString();

            socket.to(groupChatId).emit('reaction_added', {
                messageId: data.messageId,
                reaction: result.reaction,
            });

            socket.emit('reaction_added_success', {
                success: true,
                reaction: result.reaction,
            });
        } catch (error: any) {
            socket.emit('error', {
                message: error.message || 'Failed to add reaction',
            });
        }
    }
);

/**
 * Handler đánh dấu đã đọc
 */
const handleMarkAsRead = withValidation(
    MarkAsReadSocketSchema,
    async (socket: Socket, data: MarkAsReadSocketData) => {
        try {
            const userId = (socket as any).data.user.userId;

            await messageService.markMessageAsRead(data.messageId, userId);

            // Broadcast read status
            const message = await messageService.getMessageById(data.messageId);
            const groupChatId = message.groupChatId.toString();

            socket.to(groupChatId).emit('message_read', {
                messageId: data.messageId,
                userId,
                readAt: new Date(),
            });
        } catch (error: any) {
            socket.emit('error', {
                message: error.message || 'Failed to mark as read',
            });
        }
    }
);

// ===== CÁCH 2: Manual validation trong handler =====

/**
 * Handler không dùng wrapper (validate thủ công)
 */
const handleCreateMessageManual = async (socket: Socket, data: any) => {
    try {
        // Validate manually
        const validatedData = CreateMessageSocketSchema.parse(data);

        const userId = (socket as any).data.user.userId;

        const newMessage = await messageService.createMessage({
            groupChatId: new Types.ObjectId(validatedData.groupChatId),
            senderId: new Types.ObjectId(userId),
            content: validatedData.content,
            type: validatedData.type,
        });

        socket.to(validatedData.groupChatId).emit('new_message', newMessage);
        socket.emit('message_created', { success: true, message: newMessage });
    } catch (error: any) {
        socket.emit('error', {
            message: error.message || 'Failed to create message',
        });
    }
};

// ===== Export handlers =====
export const messageHandlers = {
    // Recommended: Sử dụng withValidation
    create_message: handleCreateMessage,
    add_reaction: handleAddReaction,
    mark_as_read: handleMarkAsRead,

    // Alternative: Manual validation
    create_message_manual: handleCreateMessageManual,
};

/**
 * CÁCH SỬ DỤNG trong socket setup:
 *
 * import { messageHandlers } from './handlers/message.handler.example';
 *
 * io.on('connection', (socket) => {
 *     socket.on('create_message', messageHandlers.create_message);
 *     socket.on('add_reaction', messageHandlers.add_reaction);
 *     socket.on('mark_as_read', messageHandlers.mark_as_read);
 * });
 */
