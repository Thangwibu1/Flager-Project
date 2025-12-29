import z from 'zod';

/**
 * Schema validation cho Socket.IO message events
 */

// Helper: Validate MongoDB ObjectId format
const objectIdRegex = /^[0-9a-fA-F]{24}$/;
const objectIdSchema = z
    .string()
    .regex(objectIdRegex, 'Invalid ObjectId format')
    .length(24, 'ObjectId must be 24 characters');

// Schema cho event tạo message mới
export const CreateMessageSocketSchema = z.object({
    groupChatId: objectIdSchema,
    content: z
        .string()
        .min(1, 'Message content is required')
        .max(5000, 'Message too long')
        .trim(),
    type: z.enum(['text', 'image', 'video', 'file']).default('text'),
    replyBy: objectIdSchema.optional(),
    metadata: z.instanceof(Object).optional(),
});

// Schema cho event update message
export const UpdateMessageSocketSchema = z.object({
    messageId: objectIdSchema,
    content: z
        .string()
        .min(1, 'Message content is required')
        .max(5000, 'Message too long')
        .trim(),
});

// Schema cho event delete message
export const DeleteMessageSocketSchema = z.object({
    messageId: objectIdSchema,
});

// Schema cho event add reaction
export const AddReactionSocketSchema = z.object({
    messageId: objectIdSchema,
    type: z.enum(['LIKE', 'LOVE', 'HAHA', 'WOW', 'SAD', 'ANGRY']),
});

// Schema cho event remove reaction
export const RemoveReactionSocketSchema = z.object({
    messageId: objectIdSchema,
    reactionId: objectIdSchema,
});

// Schema cho event mark as read
export const MarkAsReadSocketSchema = z.object({
    messageId: objectIdSchema,
});

// Schema cho event join group chat
export const JoinGroupChatSocketSchema = z.object({
    groupChatId: objectIdSchema,
});

// Schema cho event typing indicator
export const TypingSocketSchema = z.object({
    groupChatId: objectIdSchema,
    isTyping: z.boolean(),
});

// Export types
export type CreateMessageSocketData = z.infer<typeof CreateMessageSocketSchema>;
export type UpdateMessageSocketData = z.infer<typeof UpdateMessageSocketSchema>;
export type DeleteMessageSocketData = z.infer<typeof DeleteMessageSocketSchema>;
export type AddReactionSocketData = z.infer<typeof AddReactionSocketSchema>;
export type RemoveReactionSocketData = z.infer<
    typeof RemoveReactionSocketSchema
>;
export type MarkAsReadSocketData = z.infer<typeof MarkAsReadSocketSchema>;
export type JoinGroupChatSocketData = z.infer<typeof JoinGroupChatSocketSchema>;
export type TypingSocketData = z.infer<typeof TypingSocketSchema>;
