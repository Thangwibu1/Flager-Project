import { Types } from "mongoose";
import z from "zod";

export const userIdParams = z.object({
    userId: z.string().refine(value => Types.ObjectId.isValid(value), {error: "userId is invalid"})
}).strict();

export type UserIdParams = z.infer<typeof userIdParams>;