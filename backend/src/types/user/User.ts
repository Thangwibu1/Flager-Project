import { z } from 'zod';

export const IUser = z.object({
    email: z.string().nonempty({error: "Email is not allowed to be empty"}),
    password: z.string().min(8, {error: "Password is at least 8 character"})
});

export const loginUser = IUser.extend({});

export const registerUser = IUser.extend({
    email: z.string().nonempty({error: "Email is not allowed to be empty"}).email({error: "Email is in wrong format"}),
    phone: z.string(),
    username: z.string(),
    password: z.string().min(8, {error: "Password is at least 8 character"})
        .regex(new RegExp('[a-z]', 'gi'), {error: "Password need to contain at least a lower letter"})
        .regex(new RegExp('[A-Z]', 'gi'), {error: "Password need to contain at least a upper letter"})
        .regex(new RegExp('[0-9]', 'gi'), {error: "Password need to contain at least a digit"})
        .regex(new RegExp('[!@#$%^&*()\.?]', 'gi'), {error: "Password need to contain at least a special character like '!@#$%^&*().?' "})
});

export const fullUser = registerUser.extend({
    _id: z.string(),
    createdAt: z.date(),
    updatedAt: z.date(),
    deletedAt: z.date().nullable(),
});

export type User = z.infer<typeof IUser>;
export type RegisterUserDTO =  z.infer<typeof registerUser>;
export type LoginUserDTO = z.infer<typeof loginUser>;
export type FullUser = z.infer<typeof fullUser>;
