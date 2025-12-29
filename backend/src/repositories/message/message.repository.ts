import { SortOrder } from 'mongoose';
import { MessageModel } from '../../models/message/message.model.mongo';
import { Message, MessageCreate } from '../../types/message/Message';

class MessageRepository {
    /**
     * Tạo một message mới
     */
    createOne = async (data: MessageCreate) => {
        const newMessage = await MessageModel.create(data);
        return newMessage;
    };

    /**
     * Tìm message theo ID
     */
    findById = async (id: string) => {
        return await MessageModel.findOne({
            _id: id,
            deletedAt: null,
        }).lean();
    };

    /**
     * Lấy danh sách messages theo groupChatId với lazy loading
     */
    getMessagesByGroupChatId = async ({
        groupChatId,
        limit = 20,
        lastMessageId,
        sort = { createdAt: -1 },
    }: {
        groupChatId: string;
        limit?: number;
        lastMessageId?: string;
        sort?: { [key: string]: SortOrder };
    }) => {
        const dbFilter: { [key: string]: any } = {
            groupChatId,
            deletedAt: null,
        };

        // Nếu có lastMessageId, lấy messages cũ hơn message đó
        if (lastMessageId) {
            const lastMessage = await MessageModel.findOne({
                _id: lastMessageId,
                deletedAt: null,
            })
                .select('createdAt')
                .lean();

            if (lastMessage) {
                dbFilter.createdAt = {
                    $lt: lastMessage.createdAt,
                };
            }
        }

        const messages = await MessageModel.find(dbFilter)
            .sort(sort)
            .limit(limit)
            .populate('senderId', 'username avatar')
            .populate('reactions')
            .lean();

        return messages;
    };

    /**
     * Cập nhật message theo ID
     */
    updateById = async (messageId: string, data: Partial<Message>) => {
        return await MessageModel.findOneAndUpdate(
            {
                _id: messageId,
                deletedAt: null,
            },
            data,
            { new: true }
        ).lean();
    };

    /**
     * Soft delete message
     */
    deleteById = async (messageId: string) => {
        return await MessageModel.findOneAndUpdate(
            {
                _id: messageId,
                deletedAt: null,
            },
            {
                deletedAt: new Date(),
            },
            { new: true }
        ).lean();
    };

    /**
     * Thêm reaction vào message
     */
    addReaction = async (messageId: string, reactionId: string) => {
        return await MessageModel.findOneAndUpdate(
            {
                _id: messageId,
                deletedAt: null,
            },
            {
                $addToSet: { reactions: reactionId },
            },
            { new: true }
        ).lean();
    };

    /**
     * Xóa reaction khỏi message
     */
    removeReaction = async (messageId: string, reactionId: string) => {
        return await MessageModel.findOneAndUpdate(
            {
                _id: messageId,
                deletedAt: null,
            },
            {
                $pull: { reactions: reactionId },
            },
            { new: true }
        ).lean();
    };

    /**
     * Đánh dấu message đã được đọc bởi user
     */
    markAsRead = async (messageId: string, userId: string) => {
        return await MessageModel.findOneAndUpdate(
            {
                _id: messageId,
                deletedAt: null,
                'readBy.userId': { $ne: userId },
            },
            {
                $push: {
                    readBy: {
                        userId,
                        readAt: new Date(),
                    },
                },
            },
            { new: true }
        ).lean();
    };

    /**
     * Lấy số lượng messages chưa đọc trong group chat
     */
    getUnreadCount = async (groupChatId: string, userId: string) => {
        return await MessageModel.countDocuments({
            groupChatId,
            deletedAt: null,
            'readBy.userId': { $ne: userId },
        });
    };
}

export default new MessageRepository();
