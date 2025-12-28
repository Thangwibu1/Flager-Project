import mongoose, { Schema, Document } from 'mongoose';
import { FullUser } from '../../types/user/User';

export type IUserDocument = FullUser & Document;

// Tạo Mongoose Schema
const UserSchema = new Schema<IUserDocument>(
    {
        email: { type: String, required: true, unique: true },
        username: { type: String },
        password: { type: String, required: true },
        avatar: { type: String, required: true, default: '' },
        phone: { type: String, required: true },
        deletedAt: { type: Date, default: null },
    },
    {
        timestamps: true,
    }
);
export const User = mongoose.model<IUserDocument>('User', UserSchema);
