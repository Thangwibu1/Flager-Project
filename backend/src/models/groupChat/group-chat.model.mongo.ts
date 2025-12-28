import mongoose, { Document } from 'mongoose';
import { GroupChat } from '../../types/group/GroupChat';
import { Schema } from 'mongoose';

export type GroupChatDocument = GroupChat & Document;

const GroupChatSchema = new Schema<GroupChatDocument>(
    {
        name: {
            type: String,
            required: false, // Cho phép undefined
            default: '', // Mặc định là chuỗi rỗng
            validate: {
                validator: function (value: string): boolean {
                    // Nếu là groupChat thì name không được rỗng
                    if (this.type === 'groupChat') {
                        return !!(value && value.trim().length > 0);
                    }
                    // Nếu là privateChat thì cho phép rỗng
                    return true;
                },
                message: 'Group chat name cannot be empty',
            },
        },
        avatar: { type: String, required: false },
        type: {
            type: String,
            enum: ['groupChat', 'privateChat'],
            required: true,
        },

        //Nếu như là group chat thì mới có admin
        admin: {
            type: Schema.Types.ObjectId,
            required: function () {
                return this.type === 'groupChat';
            },
        },
        lastMessageAt: { type: Date, required: false },
        deletedAt: { type: Date, required: false, default: null },
    },
    {
        timestamps: true,
    }
);

// GroupChatSchema.index({ _id: 1 });

export const GroupChatModel = mongoose.model<GroupChatDocument>(
    'GroupChat',
    GroupChatSchema
);
