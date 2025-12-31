import z from "zod";

export const getCommentListSchema = z.object({
  lastItem: z.coerce.number().optional().catch(undefined)
});

export type GetCommentListQuery = z.infer<typeof getCommentListSchema>;