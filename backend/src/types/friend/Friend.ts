import { Types } from "mongoose";
import z from "zod";

export const friendRequest = z.object({
  receiverId: z.string().refine((value) => Types.ObjectId.isValid(value), {error: "receiverId is invalid"})
}).strict();
export const friendAccept = friendRequest;
export type SendFriendRequestDTO = z.infer<typeof friendRequest> & {senderId: string};
export type FriendAcceptDTO = z.infer<typeof friendRequest> & {senderId: string};
