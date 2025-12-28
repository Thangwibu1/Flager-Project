import z from 'zod';
import { Types } from 'mongoose';
import { string } from 'joi';
import { create } from 'domain';

// Tạo ra bản mẫu của group chat, mọi gr chat đều có các thuộc tính sau
export const IGroupChat = z.object({
    _id: z.instanceof(Types.ObjectId),
    name: z.string(), // Cho phép chuỗi rỗng (validation logic ở request và MongoDB schema)
    avatar: z.string().optional(),
    lastMessageAt: z.date().optional(),
    createdAt: z.date(),
    updatedAt: z.date(),
    deletedAt: z.date().nullable().optional(),
});

// Tạo ra 2 loại group chat: public và private
export const PublicGroupChat = IGroupChat.extend({
    type: z.literal('groupChat'),
    admin: z.instanceof(Types.ObjectId),
});

//Nếu là private thì không có admin, chỉ có 2 người
export const PrivateGroupChat = IGroupChat.extend({
    type: z.literal('privateChat'),
});

export type GroupChat =
    | z.infer<typeof PublicGroupChat>
    | z.infer<typeof PrivateGroupChat>;
