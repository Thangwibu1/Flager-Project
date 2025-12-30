import { NotFoundRequestError } from '../errors/api/ApiError';
import messageRepository from '../repositories/message/message.repository';
import reactionRepository from '../repositories/reaction/reaction.repository';
import { MessageCreate } from '../types/message/Message';
import { Types } from 'mongoose';
import groupChatRepository from '../repositories/groupChat/group-chat.repository';

class MessageService {
    /**
     * Tạo message mới
     */
    createMessage = async (messageData: MessageCreate) => {
        const groupChatExist = await groupChatRepository.findById(
            messageData.groupChatId.toString()
        );
        if (!groupChatExist) {
            throw new NotFoundRequestError('Group chat not found');
        }
        const newMessage = await messageRepository.createOne(messageData);
        return newMessage;
    };

    /**
     * Lấy message theo ID
     */
    getMessageById = async (messageId: string) => {
        const message = await messageRepository.findById(messageId);
        if (!message) {
            throw new NotFoundRequestError('Message not found');
        }
        return message;
    };

    /**
     * Lấy danh sách messages trong group chat với lazy loading
     */
    getMessagesByGroupChatId = async (
        groupChatId: string,
        limit?: number,
        lastMessageId?: string
    ) => {
        const messages = await messageRepository.getMessagesByGroupChatId({
            groupChatId,
            limit,
            lastMessageId,
        });
        return messages;
    };

    /**
     * Cập nhật nội dung message
     */
    updateMessage = async (messageId: string, content: string) => {
        // Kiểm tra message tồn tại
        await this.getMessageById(messageId);

        const updatedMessage = await messageRepository.updateById(messageId, {
            content,
        });
        return updatedMessage;
    };

    /**
     * Xóa message (soft delete)
     */
    deleteMessage = async (messageId: string) => {
        // Kiểm tra message tồn tại
        await this.getMessageById(messageId);

        const deletedMessage = await messageRepository.deleteById(messageId);
        return deletedMessage;
    };

    /**
     * Thêm reaction vào message
     */
    addReactionToMessage = async (
        messageId: string,
        userId: string,
        reactionType: string
    ) => {
        // Kiểm tra message tồn tại
        await this.getMessageById(messageId);

        // Tạo reaction mới
        const newReaction = await reactionRepository.createOne({
            userId: new Types.ObjectId(userId),
            type: reactionType as any,
            time: new Date(),
        });

        // Thêm reaction vào message
        const updatedMessage = await messageRepository.addReaction(
            messageId,
            newReaction._id.toString()
        );

        return {
            message: updatedMessage,
            reaction: newReaction,
        };
    };

    /**
     * Xóa reaction khỏi message
     */
    removeReactionFromMessage = async (
        messageId: string,
        reactionId: string
    ) => {
        // Kiểm tra message tồn tại
        await this.getMessageById(messageId);

        // Xóa reaction
        await reactionRepository.deleteById(reactionId);

        // Xóa reaction khỏi message
        const updatedMessage = await messageRepository.removeReaction(
            messageId,
            reactionId
        );

        return updatedMessage;
    };

    /**
     * Đánh dấu message đã đọc
     */
    markMessageAsRead = async (messageId: string, userId: string) => {
        // Kiểm tra message tồn tại
        await this.getMessageById(messageId);

        const updatedMessage = await messageRepository.markAsRead(
            messageId,
            userId
        );
        return updatedMessage;
    };

    /**
     * Lấy số lượng messages chưa đọc
     */
    getUnreadMessageCount = async (groupChatId: string, userId: string) => {
        const count = await messageRepository.getUnreadCount(
            groupChatId,
            userId
        );
        return count;
    };

    /**
     * Lấy thống kê reactions của một message
     */
    getMessageReactionStats = async (messageId: string) => {
        const message = await this.getMessageById(messageId);

        if (!message.reactions || message.reactions.length === 0) {
            return {};
        }

        const reactionIds = message.reactions.map(id => id.toString());
        const typeCount = await reactionRepository.countByType(reactionIds);

        return typeCount;
    };
}

export default new MessageService();
