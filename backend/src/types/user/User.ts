import { z } from 'zod';

export const IUser = z.object({
    email: z.string().email(),
    password: z.string(),
});

export const loginUser = IUser.extend({});

export const registerUser = IUser.extend({
    phone: z.string(),
    username: z.string(),
});

export const fullUser = registerUser.extend({
    id: z.string(),
    createdAt: z.date(),
    updatedAt: z.date(),
    deletedAt: z.date().nullable(),
});

export type User =
    | z.infer<typeof IUser>
    | z.infer<typeof registerUser>
    | z.infer<typeof loginUser>;
export type FullUser = z.infer<typeof fullUser>;
