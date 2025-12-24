import mongoose, { Document } from 'mongoose';
import { GroupChat } from '../../types/group/GroupChat';
import { Schema } from 'mongoose';

export type GroupChatDocument = GroupChat & Document;

const GroupChatSchema = new Schema<GroupChatDocument>(
    {
        name: { type: String, required: true },
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
