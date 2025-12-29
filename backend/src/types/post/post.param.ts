import { Types } from "mongoose";
import z from "zod";

export const postIdParamSchema = z.object({
  postId: z.string().nonempty({error: "postId is required"}).refine((value) => Types.ObjectId.isValid(value))
}).strict();

export type PostIdParams = z.infer<typeof postIdParamSchema>;