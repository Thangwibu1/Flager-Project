import { SortOrder, Types } from 'mongoose';
import { Comment } from '../../models/comment/comment.model.mongo';
import { FullComment } from '../../types/comments/comment';
import { parseKeyStringValueToObject } from '../../utils/parser.util';
import { ReactName } from '../../config/enum/post.enum';

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

    modifyReact = async (commentId: string, reactName: ReactName, amount: number) => {
        await Comment.updateOne({
            _id: commentId,
            "totalReact.name": reactName,
            deletedAt: null
        }, {
            $inc: {
                "totalReact.$.total": amount,
            }
        });
    }

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

    getListForLazyLoad = async ({
        sortKey = 'createdAt',
        sortValue = 'desc',
        lastItem,
        limit = 20,
        parentId,
        postId,
        select = [],
    }: {
        sortValue?: SortOrder,
        sortKey?: keyof FullComment,
        limit?: number,
        lastItem?: number | undefined,
        parentId?: string | Types.ObjectId,
        postId?: string | Types.ObjectId ,
        select?: (keyof FullComment)[]
    }) => {
        const filterDb : any = {};
        if(postId){
            filterDb.postId = postId;
        }
        if(lastItem){
            filterDb.createdAt = {
                $lt: lastItem
            }
        }
        filterDb.parentId = parentId ?? undefined;
        const sort = parseKeyStringValueToObject<SortOrder>(sortKey, sortValue);
        const commentList = await Comment.find({
            ...filterDb,
            deletedAt: null,
        }).lean<FullComment[]>().select(select).sort(sort).limit(limit);

        return commentList;
    }
}

export default new CommentRepository();
