import { Types } from 'mongoose';
import { z } from 'zod';

export const IUser = z.object({
    email: z.string().nonempty({ error: 'Email is not allowed to be empty' }),
    password: z.string().min(8, { error: 'Password is at least 8 character' }),
});

export const loginUser = IUser.extend({}).strict();

export const registerUser = IUser.extend({
    email: z
        .string()
        .nonempty({ error: 'Email is not allowed to be empty' })
        .email({ error: 'Email is in wrong format' }),
    phone: z
        .string()
        .nonempty({ error: 'Phone is not allowed to be empty' })
        .regex(/(0[3|5|7|8|9])+([0-9]{8})\b/g, { error: 'Phone is not valid' }),
    username: z
        .string()
        .nonempty({ error: 'Username is not allowed to be empty' }),
    password: z
        .string()
        .nonempty({ error: 'Password is not allowed to be empty' })
        .min(8, { error: 'Password is at least 8 character' })
        .regex(new RegExp('[a-z]', 'gi'), {
            error: 'Password need to contain at least a lower letter',
        })
        .regex(new RegExp('[A-Z]', 'gi'), {
            error: 'Password need to contain at least a upper letter',
        })
        .regex(new RegExp('[0-9]', 'gi'), {
            error: 'Password need to contain at least a digit',
        })
        .regex(new RegExp('[!@#$%^&*().?]', 'gi'), {
            error: "Password need to contain at least a special character like '!@#$%^&*().?' ",
        }),
}).strict();

export const userIdParams = z
    .object({
        userId: z.string().refine(value => Types.ObjectId.isValid(value), {
            error: 'userId is invalid',
        }),
    })
    .strict();

export const fullUser = registerUser.extend({
    _id: z.instanceof(Types.ObjectId),
    avatar: z.string(),
    createdAt: z.date(),
    updatedAt: z.date(),
    deletedAt: z.date().nullable(),
});
export const updateUserProfile = z.object({
    username: z
        .string()
        .nonempty({ error: 'Username is not allow to be empty!' }),
}).strict();
export type UpdateUserProfileDTO = z.infer<typeof updateUserProfile>;

export type User = z.infer<typeof IUser>;
export type RegisterUserDTO = z.infer<typeof registerUser>;
export type LoginUserDTO = z.infer<typeof loginUser>;
export type FullUser = z.infer<typeof fullUser>;
