import { z } from 'zod';
import { Types } from 'mongoose';

// Facebook-style reaction emojis
const emojis = ['👍', '❤️', '😆', '😮', '😢', '😡'] as const;

export const IReaction = z.object({
    _id: z.instanceof(Types.ObjectId),
    userId: z.instanceof(Types.ObjectId),
    emoji: z.enum(emojis),
    time: z.date(),
});

export type Reaction = z.infer<typeof IReaction>;

// Export emoji constants for reference
export const ReactionEmoji = {
    LIKE: '👍',
    LOVE: '❤️',
    HAHA: '😆',
    WOW: '😮',
    SAD: '😢',
    ANGRY: '😡',
} as const;
