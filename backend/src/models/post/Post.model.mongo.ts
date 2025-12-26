import mongoose from 'mongoose';
import { FullPost } from '../../types/post/post.request';
import { ReactName, ViewType } from '../../config/enum/post.enum';

export type IPostDocument = FullPost & mongoose.Document;

// Tạo Mongoose Schema
const PostSchema = new mongoose.Schema(
    {
        authorId: {
            type: mongoose.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        viewType: { type: String, enum: ViewType, required: true },
        content: { type: String },
        media: { type: [String], default: [] },
        totalReact: {
            type: [{ name: {
                type: String,
                enum: ReactName,
            }, total: {
                type: Number,
                default: 0
            } }],
            default: Object.values(ReactName).map(value => ({
                name: value,
                total: 0,
            })),
        },
        totalComment: { type: Number, default: 0 },
        totalShare: { type: Number, default: 0 },
        deletedAt: { type: Date, default: null },
    },
    {
        timestamps: true,
    }
);
export const Post = mongoose.model<IPostDocument>('Post', PostSchema);
