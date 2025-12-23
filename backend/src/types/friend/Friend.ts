import { Types } from "mongoose";
import z from "zod";

export const friendRequest = z.object({
  receiverId: z.string().refine((value) => Types.ObjectId.isValid(value), {error: "receiverId is invalid"})
}).strict();

export type SendFriendRequestDTO = z.infer<typeof friendRequest>;
