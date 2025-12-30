import mongoose, { Schema, Types } from 'mongoose';
import { ReactName } from '../../config/enum/post.enum';

const commentSchema = new Schema(
    {
        postId: {
            type: Types.ObjectId,
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
            type: Types.ObjectId,
            required: false,
            default: undefined,
        }, // rep comment chính
        userId: {
            type: Types.ObjectId,
            required: true,
        }, // chủ comment
        replyToId: {
            type: Types.ObjectId,
            required: false,
            default: undefined,
        }, // rep comment con bắt kì trong comment cha
        deletedAt: {
            type: Date,
            required: false,
            default: undefined,
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

const Comment = mongoose.model('Comment', commentSchema);

export { Comment };
