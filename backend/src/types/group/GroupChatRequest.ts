import { Types } from 'mongoose';
import z from 'zod';

export const createGroupChatRequest = z
    .object({
        name: z.string(), // ← Cho phép chuỗi rỗng
        avatar: z
            .string()
            .url({ message: 'Avatar must be a valid URL' })
            .optional(),
        type: z.enum(['groupChat', 'privateChat'], {
            message: "Type must be either 'groupChat' or 'privateChat'",
        }),
        friendId: z
            .string()
            .refine(value => Types.ObjectId.isValid(value), {
                message: 'friendId is invalid',
            })
            .optional(),
    })
    .strict()
    .refine(
        data => {
            // Nếu là privateChat thì PHẢI có friendId
            if (data.type === 'privateChat' && !data.friendId) {
                return false;
            }
            return true;
        },
        {
            message: 'friendId is required when creating a private chat',
            path: ['friendId'],
        }
    )
    .refine(
        data => {
            // Nếu là groupChat thì name KHÔNG ĐƯỢC rỗng
            if (data.type === 'groupChat' && data.name.trim().length === 0) {
                return false;
            }
            return true;
        },
        {
            message: 'Group chat name cannot be empty',
            path: ['name'],
        }
    );

export type CreateGroupChatDTO = z.infer<typeof createGroupChatRequest> & {
    creatorId: string;
};

export const addMemberRequest = z
    .object({
        userId: z.string().min(1, { message: 'userId is required' }),
        groupChatId: z.string().min(1, { message: 'groupChatId is required' }),
        // adderId: z.string().min(1, { message: 'adderId is required' }),
    })
    .strict();

export type AddMemberDTO = z.infer<typeof addMemberRequest>;
