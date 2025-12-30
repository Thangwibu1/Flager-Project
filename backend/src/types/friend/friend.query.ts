import { Types } from "mongoose";
import z from "zod";

export const queryGetFriendOfUserSchema = z.object({
  lastItem: z.coerce.number().optional().catch(undefined),
  keyword: z.string().optional().catch(undefined),
})
export const queryGetFollowingUserListSchema = z.object({
  lastItem: z.coerce.number().optional().catch(undefined),
});
export const queryGetFollowerListSchema = queryGetFollowingUserListSchema;
export type QueryGetFriendOfUser = z.infer<typeof queryGetFriendOfUserSchema>;
export type QueryGetFollowingList = z.infer<typeof queryGetFollowingUserListSchema>;
export type QueryGetFollowerList = z.infer<typeof queryGetFollowerListSchema>;