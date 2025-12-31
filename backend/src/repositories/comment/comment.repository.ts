import { Types } from 'mongoose';
import { Comment, ICommentDocument } from '../../models/comment/comment.model.mongo';
import { FullComment } from '../../types/comments/comment';

class CommentRepository {
    createOne = async (data: {
        userId: string;
        postId: string;
        content: string;
        media: string[];
        parentId?: string;
        replyToId?: string;
    }): Promise<FullComment> => {
        return await Comment.create(data);
    };

    findOneById = async (id: string, select: (keyof FullComment)[] = []): Promise<FullComment | null> => {
        return await Comment.findOne({
            _id: id,
            deletedAt: null,
        })
            .select(select)
            .lean<FullComment>();
    };

    findOneByNormalFilter = async (
        filter: Partial<FullComment>,
        select: (keyof FullComment)[] = []
    ): Promise<FullComment | null> => {
        return await Comment.findOne({
            ...filter,
            deletedAt: null,
        })
            .select(select)
            .lean();
    };

    modifyReplyTotal = async (id: string | Types.ObjectId, amount: number) => {
        await Comment.findOneAndUpdate(
            {
                _id: id,
                deletedAt: null,
            },
            {
                $inc: {
                    totalReply: amount,
                },
            }
        );
    };

    deleteOneById = async (id: string) => {
        await Comment.updateOne(
            {
                _id: id,
                deletedAt: null,
            },
            {
                deletedAt: new Date(),
            }
        );
    };
}

export default new CommentRepository();
