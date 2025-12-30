import { Types } from "mongoose";
import z from "zod";
import { ReactName } from "../../config/enum/post.enum";

export const IComment = z.object({
  _id: z.instanceof(Types.ObjectId).or(z.string()),
  userId: z.instanceof(Types.ObjectId).or(z.string()),
  postId: z.instanceof(Types.ObjectId).or(z.string()),
  replyToId: z.instanceof(Types.ObjectId).nullable().optional(),
  parentId: z.instanceof(Types.ObjectId).or(z.string()).nullable().optional(),
  content: z.string(),
  media: z.array(z.string()),
  totalReply: z.number(),
  totalReact: z.array(z.object({
    name: ReactName,
    total: z.number()
  })),
  deletedAt: z.date().nullable().optional()
});

export type FullComment = z.infer<typeof IComment>;