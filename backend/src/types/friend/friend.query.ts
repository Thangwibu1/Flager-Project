import { Types } from "mongoose";
import z from "zod";

export const queryGetFriendOfUserSchema = z.object({
  lastItem: z.coerce.number().optional().catch(undefined),
  keyword: z.string().optional().catch(undefined),
})

export type QueryGetFriendOfUser = z.infer<typeof queryGetFriendOfUserSchema>;