import { Types } from "mongoose";
import z from "zod";
import { ReactName } from "../../config/enum/post.enum";

export const postIdParamSchema = z.object({
  postId: z.string().nonempty({error: "postId is required"}).refine((value) => Types.ObjectId.isValid(value))
}).strict();
export const paramPostIdAndReactSchema = z.object({
  postId: z.string().nonempty({error: "postId is required"}).refine((value) => Types.ObjectId.isValid(value)),
  reactName: z.enum(ReactName)
}).strict();
export type PostIdParams = z.infer<typeof postIdParamSchema>;
export type paramPostIdAndReactSchema  = z.infer<typeof paramPostIdAndReactSchema>;