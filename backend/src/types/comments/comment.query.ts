import z from "zod";
import { ReactName } from "../../config/enum/post.enum";

export const getCommentListSchema = z.object({
  lastItem: z.coerce.number().optional().catch(undefined)
});
export const getReplyCommentListSchema = getCommentListSchema;
export const countTotalCommentReactQuery = z.object({
  reactName: z.enum(ReactName).optional().catch(undefined)
});
export type GetCommentListQuery = z.infer<typeof getCommentListSchema>;
export type GetReplyCommentListQuery = z.infer<typeof getReplyCommentListSchema>;
export type CountTotalReactNameQuery = z.infer<typeof countTotalCommentReactQuery>;