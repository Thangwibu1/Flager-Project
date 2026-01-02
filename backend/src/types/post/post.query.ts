import { Types } from "mongoose";
import z from "zod";
import { ReactName } from "../../config/enum/post.enum";

export const queryPostListOfUser = z.object({
    lastItem: z.string().optional().refine((value) => value ? Types.ObjectId.isValid(value) : true ).catch(undefined),
});
export const queryCountReactOfPostSchema = z.object({
    reactName: z.enum(ReactName).optional().catch(undefined),
})
export type QueryPostListOfUser = z.infer<typeof queryPostListOfUser>;
export type QueryCountReactOfPost = z.infer<typeof queryCountReactOfPostSchema>;