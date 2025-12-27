import { Types } from "mongoose";
import z from "zod";

export const friendRequest = z.object({
  receiverId: z.string().nonempty({error: "receiverId is not allowed to be empty"}).refine((value) => Types.ObjectId.isValid(value), {error: "receiverId is invalid"})
}).strict();
export const friendAccept = friendRequest;
export const friendUnfriend = friendRequest;
export const friendReject = friendRequest;

export type FriendRequestRejectDTO = z.infer<typeof friendReject>;
export type FriendRequestDTO = z.infer<typeof friendRequest>;
export type FriendAcceptDTO = z.infer<typeof friendRequest>;
export type FriendUnfriendDTO = z.infer<typeof friendUnfriend>;