import z from 'zod';
import { Types } from 'mongoose';
// import react from '@vitejs/plugin-react';
export const IMessage = z.object({
    _id: z.instanceof(Types.ObjectId),
    groupChatId: z.instanceof(Types.ObjectId),
    senderId: z.instanceof(Types.ObjectId),
    content: z.string(),
    type: z.enum(['text', 'image', 'video', 'file']),
    readBy: z.array(
        z.object({
            userId: z.instanceof(Types.ObjectId),
            readAt: z.date(),
        })
    ),
    reactions: z.array(z.instanceof(Types.ObjectId)),
    replyBy: z.instanceof(Types.ObjectId).optional(),
    metadata: z.instanceof(Object).optional(),
    createdAt: z.date(),
    updatedAt: z.date(),
    deletedAt: z.date().nullable().optional(),
});

export const IMessageCreate = z.object({
    groupChatId: z.instanceof(Types.ObjectId),
    senderId: z.instanceof(Types.ObjectId),
    content: z.string(),
    type: z.enum(['text', 'image', 'video', 'file']),
    metadata: z.instanceof(Object).optional(),
    replyBy: z.instanceof(Types.ObjectId).optional(),
});

export type MessageCreate = z.infer<typeof IMessageCreate>;
export type Message = z.infer<typeof IMessage>;
