import { Types } from "mongoose";
import z from "zod";

export const queryPostListOfUser = z.object({
    lastItem: z.string().optional().refine((value) => value ? Types.ObjectId.isValid(value) : true ).catch(undefined),
});

export type QueryPostListOfUser = z.infer<typeof queryPostListOfUser>;