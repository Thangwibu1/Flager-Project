import mongoose, { Document, Schema } from 'mongoose';
import { Message } from '../../types/message/Message';

export type MessageDocument = Message & Document;

const MessageSchema = new Schema<MessageDocument>(
    {
        groupChatId: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'GroupChat',
        },
        senderId: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        content: {
            type: String,
            required: true,
        },
        type: {
            type: String,
            enum: ['text', 'image', 'video', 'file'],
            required: true,
            default: 'text',
        },
        readBy: {
            type: [
                {
                    userId: {
                        type: Schema.Types.ObjectId,
                        required: true,
                        ref: 'User',
                    },
                    readAt: {
                        type: Date,
                        required: true,
                        default: Date.now,
                    },
                },
            ],
            default: [],
        },
        reactions: {
            type: [Schema.Types.ObjectId],
            ref: 'Reaction',
            default: [],
        },
        replyBy: {
            type: Schema.Types.ObjectId,
            ref: 'Message',
            required: false,
        },
        metadata: {
            type: Schema.Types.Mixed,
            required: false,
        },
        deletedAt: {
            type: Date,
            default: null,
        },
    },
    {
        timestamps: true,
    }
);

// Indexes để tối ưu query
MessageSchema.index({ groupChatId: 1, createdAt: -1 });
MessageSchema.index({ senderId: 1 });

export const MessageModel = mongoose.model<MessageDocument>(
    'Message',
    MessageSchema
);
