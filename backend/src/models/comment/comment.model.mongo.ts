import mongoose, { Document, Schema, Types } from 'mongoose';
import { ReactName } from '../../config/enum/post.enum';
import { FullComment } from '../../types/comments/comment';

export type ICommentDocument = FullComment & Document;

const commentSchema = new Schema<ICommentDocument>(
    {
        postId: {
            type: Schema.Types.ObjectId,
            required: true,
        },
        content: {
            type: String,
            required: true,
        },
        media: {
          type: [String],
          default: [],
        },
        parentId: {
            type: Schema.Types.ObjectId,
            required: false,
            default: undefined,
        }, // rep comment chính
        userId: {
            type: Schema.Types.ObjectId,
            required: true,
        }, // chủ comment
        replyToId: {
            type: Schema.Types.ObjectId,
            required: false,
            default: undefined,
        }, // rep comment con bắt kì trong comment cha
        deletedAt: {
            type: Date,
            required: false,
            default: null,
        },
        totalReact: {
            type: [
                {
                    name: {
                        type: String,
                        enum: ReactName,
                    },
                    total: {
                        type: Number,
                        default: 0,
                    },
                },
            ],
            default: Object.values(ReactName).map(value => ({
                name: value,
                total: 0,
            })),
        },
        totalReply: {
          type: Number,
          default: 0,
        }
    }, //react giống react của post, sẽ có react mỗi loại là 0 trc
    {
        timestamps: true,
    }
);

const Comment = mongoose.model<ICommentDocument>('Comment', commentSchema);

export { Comment };
