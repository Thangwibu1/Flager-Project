import z from "zod";
import { postIdParamSchema } from "../post/post.param";
import { Types } from "mongoose";

export const commentDetailParams = postIdParamSchema.extend({
  commentId: z.string().refine(value => Types.ObjectId.isValid(value), {error: "commentId is invalid"}),
}).strict();
// export const commentReaction = commentReplyParams.extend()
export type CommentDetailParams = z.infer<typeof commentDetailParams>;