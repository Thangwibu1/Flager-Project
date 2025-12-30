import z from "zod";
import { postIdParamSchema } from "../post/post.param";
import { Types } from "mongoose";

export const commentReplyParams = postIdParamSchema.extend({
  commentId: z.string().refine(value => Types.ObjectId.isValid(value), {error: "commentId is invalid"}),
}).strict();

export type CommentReplyParams = z.infer<typeof commentReplyParams>;