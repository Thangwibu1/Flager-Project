import { ReactionModel } from '../../models/reaction/reaction.model.mongo';
import { Reaction } from '../../types/reaction/Reaction';

class ReactionRepository {
    /**
     * Tạo một reaction mới
     */
    createOne = async (data: Omit<Reaction, '_id'>) => {
        const newReaction = await ReactionModel.create(data);
        return newReaction;
    };

    /**
     * Tìm reaction theo ID
     */
    findById = async (id: string) => {
        return await ReactionModel.findOne({
            _id: id,
        }).lean();
    };

    /**
     * Tìm reaction của user trên một message cụ thể
     * (Dùng khi cần check user đã react message chưa)
     */
    findByUserIdAndMessageId = async (userId: string, messageId: string) => {
        // Note: Cần có messageId trong Reaction model nếu muốn query trực tiếp
        // Hoặc có thể query qua Message model
        return await ReactionModel.findOne({
            userId,
        }).lean();
    };

    /**
     * Tìm tất cả reactions của một user
     */
    findByUserId = async (userId: string) => {
        return await ReactionModel.find({
            userId,
        }).lean();
    };

    /**
     * Cập nhật reaction (thay đổi type)
     */
    updateById = async (reactionId: string, reactionType: string) => {
        return await ReactionModel.findOneAndUpdate(
            {
                _id: reactionId,
            },
            {
                type: reactionType,
                time: new Date(),
            },
            { new: true }
        ).lean();
    };

    /**
     * Xóa reaction
     */
    deleteById = async (reactionId: string) => {
        return await ReactionModel.findOneAndDelete({
            _id: reactionId,
        }).lean();
    };

    /**
     * Xóa tất cả reactions của một user
     */
    deleteByUserId = async (userId: string) => {
        return await ReactionModel.deleteMany({
            userId,
        });
    };

    /**
     * Đếm số lượng reactions theo type
     */
    countByType = async (reactionIds: string[]) => {
        const reactions = await ReactionModel.find({
            _id: { $in: reactionIds },
        }).lean();

        // Group by type
        const typeCount: { [key: string]: number } = {};
        reactions.forEach(reaction => {
            if (typeCount[reaction.type]) {
                typeCount[reaction.type]++;
            } else {
                typeCount[reaction.type] = 1;
            }
        });

        return typeCount;
    };
}

export default new ReactionRepository();
