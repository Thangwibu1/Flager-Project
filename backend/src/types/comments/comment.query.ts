import z from "zod";

export const getCommentListSchema = z.object({
  lastItem: z.coerce.number().optional().catch(undefined)
});
export const getReplyCommentListSchema = getCommentListSchema;
export type GetCommentListQuery = z.infer<typeof getCommentListSchema>;
export type GetReplyCommentListQuery = z.infer<typeof getReplyCommentListSchema>;