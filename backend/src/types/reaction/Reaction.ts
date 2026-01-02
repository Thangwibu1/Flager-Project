import { z } from 'zod';
import { Types } from 'mongoose';

// Reaction types
const reactionTypes = ['LIKE', 'LOVE', 'HAHA', 'WOW', 'SAD', 'ANGRY'] as const;

export const IReaction = z.object({
    _id: z.instanceof(Types.ObjectId),
    userId: z.instanceof(Types.ObjectId),
    type: z.enum(reactionTypes),
    time: z.date(),
});

export type Reaction = z.infer<typeof IReaction>;
export type ReactionType = (typeof reactionTypes)[number];

// Export reaction types for reference
export const ReactionTypes = {
    LIKE: 'LIKE',
    LOVE: 'LOVE',
    HAHA: 'HAHA',
    WOW: 'WOW',
    SAD: 'SAD',
    ANGRY: 'ANGRY',
} as const;
