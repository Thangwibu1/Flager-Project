import { Types } from "mongoose";
import z from "zod";

export const friendRequest = z.object({
  receiverId: z.string().nonempty({error: "receiverId is not allowed to be empty"}).refine((value) => Types.ObjectId.isValid(value), {error: "receiverId is invalid"})
}).strict();
export const friendAccept = friendRequest;
export const friendUnfriend = friendRequest;
export const friendCount = z.object({
  userId: z.string().nonempty({error: "userId is not allowed to be empty"}).refine((value) => Types.ObjectId.isValid(value), {error: "userId is invalid"})
}).strict();
export type FriendRequestDTO = z.infer<typeof friendRequest> & {senderId: string};
export type FriendAcceptDTO = z.infer<typeof friendRequest> & {senderId: string};
export type FriendUnfriendDTO = z.infer<typeof friendUnfriend> & {senderId: string};
export type FriendCountDTO = z.infer<typeof friendCount>;