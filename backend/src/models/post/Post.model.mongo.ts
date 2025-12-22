import mongoose from 'mongoose';
import { FullPost } from '../../types/post/Post';

export type IBlogDocument = FullPost & mongoose.Document;

// Tạo Mongoose Schema
const PostSchema = new mongoose.Schema(
    {
        userId: { type: mongoose.Types.ObjectId, required: true, ref: 'User' },
        content: { type: String },
        media: { type: [String], default: [] },
        totalReact: { type: Number, default: 0 },
        totalComment: { type: Number, default: 0 },
        totalShare: { type: Number, default: 0 },
        deletedAt: { type: Date, default: null },
    },
    {
        timestamps: true,
    }
);
export const Post = mongoose.model('Post', PostSchema);
