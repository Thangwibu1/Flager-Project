import { NotFoundRequestError } from '../errors/api/ApiError';
import reactionRepository from '../repositories/reaction/reaction.repository';
import { Reaction } from '../types/reaction/Reaction';
import { Types } from 'mongoose';

class ReactionService {
    /**
     * Tạo reaction mới
     */
    createReaction = async (userId: string, reactionType: string) => {
        const newReaction = await reactionRepository.createOne({
            userId: new Types.ObjectId(userId),
            type: reactionType as any,
            time: new Date(),
        });
        return newReaction;
    };

    /**
     * Lấy reaction theo ID
     */
    getReactionById = async (reactionId: string) => {
        const reaction = await reactionRepository.findById(reactionId);
        if (!reaction) {
            throw new NotFoundRequestError('Reaction not found');
        }
        return reaction;
    };

    /**
     * Lấy tất cả reactions của một user
     */
    getUserReactions = async (userId: string) => {
        const reactions = await reactionRepository.findByUserId(userId);
        return reactions;
    };

    /**
     * Cập nhật emoji của reaction
     */
    updateReaction = async (reactionId: string, reactionType: string) => {
        // Kiểm tra reaction tồn tại
        await this.getReactionById(reactionId);

        const updatedReaction = await reactionRepository.updateById(
            reactionId,
            reactionType
        );
        return updatedReaction;
    };

    /**
     * Xóa reaction
     */
    deleteReaction = async (reactionId: string) => {
        // Kiểm tra reaction tồn tại
        await this.getReactionById(reactionId);

        const deletedReaction = await reactionRepository.deleteById(reactionId);
        return deletedReaction;
    };

    /**
     * Xóa tất cả reactions của một user
     */
    deleteUserReactions = async (userId: string) => {
        const result = await reactionRepository.deleteByUserId(userId);
        return result;
    };

    /**
     * Lấy thống kê reactions theo type
     */
    getReactionStats = async (reactionIds: string[]) => {
        const typeCount = await reactionRepository.countByType(reactionIds);
        return typeCount;
    };
}

export default new ReactionService();
