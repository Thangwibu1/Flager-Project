import { Types } from "mongoose";
import z from "zod";

export const createCommentToPostBodySchema = z.object({
  content: z.string().nonempty({error: "Comment is not allowed to be empty"}),
  media: z.array(z.string().nonempty({error: "Url is not allowed to be empty"})).min(0)
}).strict();

export const replyCommentBodySchema = createCommentToPostBodySchema.extend({
  replyToId: z.string().optional().refine(value => value ? Types.ObjectId.isValid(value): true, {error: "parentId is invalid"}),
}).strict();

export type CreateCommentToPostBodyDTO = z.infer<typeof createCommentToPostBodySchema>;
export type ReplyCommentBodyDTO = z.infer<typeof replyCommentBodySchema>;