import mongoose, { Document, Schema } from 'mongoose';
import { Reaction } from '../../types/reaction/Reaction';

export type ReactionDocument = Reaction & Document;

const ReactionSchema = new Schema<ReactionDocument>(
    {
        userId: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        type: {
            type: String,
            enum: ['LIKE', 'LOVE', 'HAHA', 'WOW', 'SAD', 'ANGRY'],
            required: true,
        },
        time: {
            type: Date,
            required: true,
            default: Date.now,
        },
    },
    {
        timestamps: true,
    }
);

// Index để tối ưu query
ReactionSchema.index({ userId: 1 });

export const ReactionModel = mongoose.model<ReactionDocument>(
    'Reaction',
    ReactionSchema
);
