import { Socket } from 'socket.io';
import { withValidation } from '../middlewares/validate.middleware';
import {
    CreateMessageSocketSchema,
    CreateMessageSocketData,
    UpdateMessageSocketSchema,
    UpdateMessageSocketData,
    DeleteMessageSocketSchema,
    DeleteMessageSocketData,
    AddReactionSocketSchema,
    AddReactionSocketData,
    RemoveReactionSocketSchema,
    RemoveReactionSocketData,
    MarkAsReadSocketSchema,
    MarkAsReadSocketData,
    JoinGroupChatSocketSchema,
    JoinGroupChatSocketData,
    TypingSocketSchema,
    TypingSocketData,
} from '../../types/message/message.socket';
import messageService from '../../services/message.service';
import { Types } from 'mongoose';
import { SOCKET_EVENTS } from '../../shared/constants/socket-events.constants';

/**
 * Handler: Tạo message mới
 */
export const handleCreateMessage = withValidation(
    CreateMessageSocketSchema,
    async (socket: Socket, data: CreateMessageSocketData, callback?: any) => {
        try {
            const userId = (socket as any).data.user.userId;

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
            socket
                .to(data.groupChatId)
                .emit(SOCKET_EVENTS.NEW_MESSAGE, newMessage);

            // Trả về acknowledgment cho người gửi
            if (callback) {
                callback({
                    success: true,
                    message: newMessage,
                });
            }
        } catch (error: any) {
            if (callback) {
                callback({
                    success: false,
                    error: error.message || 'Failed to create message',
                });
            } else {
                socket.emit(SOCKET_EVENTS.ERROR, {
                    message: error.message || 'Failed to create message',
                });
            }
        }
    }
);

/**
 * Handler: Cập nhật message
 */
export const handleUpdateMessage = withValidation(
    UpdateMessageSocketSchema,
    async (socket: Socket, data: UpdateMessageSocketData, callback?: any) => {
        try {
            const userId = (socket as any).data.user.userId;

            // Lấy message để check quyền và lấy groupChatId
            const message = await messageService.getMessageById(data.messageId);

            // Check quyền: chỉ người tạo mới được update
            if (message.senderId.toString() !== userId) {
                if (callback) {
                    return callback({
                        success: false,
                        error: 'You can only edit your own messages',
                    });
                }
                return;
            }

            // Update message
            const updatedMessage = await messageService.updateMessage(
                data.messageId,
                data.content
            );

            // Broadcast update đến tất cả users trong room
            const groupChatId = message.groupChatId.toString();
            socket
                .to(groupChatId)
                .emit(SOCKET_EVENTS.MESSAGE_UPDATED, updatedMessage);

            // Acknowledgment
            if (callback) {
                callback({
                    success: true,
                    message: updatedMessage,
                });
            }
        } catch (error: any) {
            if (callback) {
                callback({
                    success: false,
                    error: error.message || 'Failed to update message',
                });
            } else {
                socket.emit(SOCKET_EVENTS.ERROR, {
                    message: error.message || 'Failed to update message',
                });
            }
        }
    }
);

/**
 * Handler: Xóa message
 */
export const handleDeleteMessage = withValidation(
    DeleteMessageSocketSchema,
    async (socket: Socket, data: DeleteMessageSocketData, callback?: any) => {
        try {
            const userId = (socket as any).data.user.userId;

            // Lấy message để check quyền
            const message = await messageService.getMessageById(data.messageId);

            // Check quyền: chỉ người tạo mới được xóa
            if (message.senderId.toString() !== userId) {
                if (callback) {
                    return callback({
                        success: false,
                        error: 'You can only delete your own messages',
                    });
                }
                return;
            }

            // Soft delete message
            const deletedMessage = await messageService.deleteMessage(
                data.messageId
            );

            // Broadcast delete đến tất cả users trong room
            const groupChatId = message.groupChatId.toString();
            socket.to(groupChatId).emit(SOCKET_EVENTS.MESSAGE_DELETED, {
                messageId: data.messageId,
            });

            // Acknowledgment
            if (callback) {
                callback({
                    success: true,
                    messageId: data.messageId,
                });
            }
        } catch (error: any) {
            if (callback) {
                callback({
                    success: false,
                    error: error.message || 'Failed to delete message',
                });
            } else {
                socket.emit(SOCKET_EVENTS.ERROR, {
                    message: error.message || 'Failed to delete message',
                });
            }
        }
    }
);

/**
 * Handler: Thêm reaction vào message
 */
export const handleAddReaction = withValidation(
    AddReactionSocketSchema,
    async (socket: Socket, data: AddReactionSocketData, callback?: any) => {
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

            socket.to(groupChatId).emit(SOCKET_EVENTS.REACTION_ADDED, {
                messageId: data.messageId,
                reaction: result.reaction,
            });

            // Acknowledgment
            if (callback) {
                callback({
                    success: true,
                    reaction: result.reaction,
                });
            }
        } catch (error: any) {
            if (callback) {
                callback({
                    success: false,
                    error: error.message || 'Failed to add reaction',
                });
            } else {
                socket.emit(SOCKET_EVENTS.ERROR, {
                    message: error.message || 'Failed to add reaction',
                });
            }
        }
    }
);

/**
 * Handler: Xóa reaction khỏi message
 */
export const handleRemoveReaction = withValidation(
    RemoveReactionSocketSchema,
    async (socket: Socket, data: RemoveReactionSocketData, callback?: any) => {
        try {
            const updatedMessage =
                await messageService.removeReactionFromMessage(
                    data.messageId,
                    data.reactionId
                );

            // Broadcast reaction removed đến room
            const groupChatId = updatedMessage?.groupChatId.toString();
            if (groupChatId) {
                socket.to(groupChatId).emit(SOCKET_EVENTS.REACTION_REMOVED, {
                    messageId: data.messageId,
                    reactionId: data.reactionId,
                });
            }

            // Acknowledgment
            if (callback) {
                callback({
                    success: true,
                    messageId: data.messageId,
                    reactionId: data.reactionId,
                });
            }
        } catch (error: any) {
            if (callback) {
                callback({
                    success: false,
                    error: error.message || 'Failed to remove reaction',
                });
            } else {
                socket.emit(SOCKET_EVENTS.ERROR, {
                    message: error.message || 'Failed to remove reaction',
                });
            }
        }
    }
);

/**
 * Handler: Đánh dấu message đã đọc
 */
export const handleMarkAsRead = withValidation(
    MarkAsReadSocketSchema,
    async (socket: Socket, data: MarkAsReadSocketData, callback?: any) => {
        try {
            const userId = (socket as any).data.user.userId;

            await messageService.markMessageAsRead(data.messageId, userId);

            // Broadcast read status đến room
            const message = await messageService.getMessageById(data.messageId);
            const groupChatId = message.groupChatId.toString();

            socket.to(groupChatId).emit(SOCKET_EVENTS.MESSAGE_READ, {
                messageId: data.messageId,
                userId,
                readAt: new Date(),
            });

            // Acknowledgment
            if (callback) {
                callback({
                    success: true,
                    messageId: data.messageId,
                });
            }
        } catch (error: any) {
            if (callback) {
                callback({
                    success: false,
                    error: error.message || 'Failed to mark as read',
                });
            } else {
                socket.emit(SOCKET_EVENTS.ERROR, {
                    message: error.message || 'Failed to mark as read',
                });
            }
        }
    }
);

/**
 * Handler: Join group chat room
 */
export const handleJoinGroupChat = withValidation(
    JoinGroupChatSocketSchema,
    async (socket: Socket, data: JoinGroupChatSocketData, callback?: any) => {
        try {
            // Join Socket.IO room
            await socket.join(data.groupChatId);

            console.log(
                `User ${(socket as any).data.user.username} joined group ${
                    data.groupChatId
                }`
            );

            // Acknowledgment
            if (callback) {
                callback({
                    success: true,
                    groupChatId: data.groupChatId,
                });
            }
        } catch (error: any) {
            if (callback) {
                callback({
                    success: false,
                    error: error.message || 'Failed to join group chat',
                });
            }
        }
    }
);

/**
 * Handler: Leave group chat room
 */
export const handleLeaveGroupChat = withValidation(
    JoinGroupChatSocketSchema, // Dùng chung schema với join
    async (socket: Socket, data: JoinGroupChatSocketData, callback?: any) => {
        try {
            // Leave Socket.IO room
            await socket.leave(data.groupChatId);

            console.log(
                `User ${(socket as any).data.user.username} left group ${
                    data.groupChatId
                }`
            );

            // Acknowledgment
            if (callback) {
                callback({
                    success: true,
                    groupChatId: data.groupChatId,
                });
            }
        } catch (error: any) {
            if (callback) {
                callback({
                    success: false,
                    error: error.message || 'Failed to leave group chat',
                });
            }
        }
    }
);

/**
 * Handler: Typing indicator
 */
export const handleTyping = withValidation(
    TypingSocketSchema,
    async (socket: Socket, data: TypingSocketData) => {
        // Broadcast typing status đến room (không cần acknowledgment)
        const userId = (socket as any).data.user.userId;
        const username = (socket as any).data.user.username;

        socket.to(data.groupChatId).emit(SOCKET_EVENTS.USER_TYPING, {
            userId,
            username,
            groupChatId: data.groupChatId,
            isTyping: data.isTyping,
        });
    }
);

/**
 * Export tất cả handlers với SOCKET_EVENTS constants
 */
export const messageHandlers = {
    [SOCKET_EVENTS.CREATE_MESSAGE]: handleCreateMessage,
    [SOCKET_EVENTS.UPDATE_MESSAGE]: handleUpdateMessage,
    [SOCKET_EVENTS.DELETE_MESSAGE]: handleDeleteMessage,
    [SOCKET_EVENTS.ADD_REACTION]: handleAddReaction,
    [SOCKET_EVENTS.REMOVE_REACTION]: handleRemoveReaction,
    [SOCKET_EVENTS.MARK_AS_READ]: handleMarkAsRead,
    [SOCKET_EVENTS.JOIN_GROUP_CHAT]: handleJoinGroupChat,
    [SOCKET_EVENTS.LEAVE_GROUP_CHAT]: handleLeaveGroupChat,
    [SOCKET_EVENTS.TYPING]: handleTyping,
};
