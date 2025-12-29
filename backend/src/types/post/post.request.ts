import { Types } from 'mongoose';
import { z } from 'zod';
import { ReactName, ViewType } from '../../config/enum/post.enum';

export const IPost = z.object({
    content: z.string().nonempty({error: "Content is not allowed to be empty"}),
    media: z.array(z.string().nonempty()).nullable(),
});

export const postCreate = IPost.extend({
    viewType: z
        .enum(ViewType, {error: "View type is invalid"})
}).strict();
export const postUpdateSchema = postCreate;
export const sendReactToPost = z.object({
    reactName: z.enum(ReactName, {error: "React name is invalid"}),
    postId: z.string().nonempty().refine(value => Types.ObjectId.isValid(value), {error: "postId is invalid"})
}).strict();

export const fullPost = IPost.extend({
    _id: z.string().or(z.instanceof(Types.ObjectId)),
    authorId: z.string().or(z.instanceof(Types.ObjectId)),
    totalReact: z.array(z.object({name: z.enum(ReactName), count: z.number()})),
    totalComment: z.number(),
    totalShare: z.number(),
    createdAt: z.date(),
    updatedAt: z.date(),
    deletedAt: z.date().nullable().optional(),
    viewType: z.enum(ViewType),
});

export type Post = z.infer<typeof IPost>;
export type PostCreateDTO = z.infer<typeof postCreate>;
export type PostUpdateDTO = z.infer<typeof postUpdateSchema>;
export type FullPost = z.infer<typeof fullPost>;
export type SendReactToPostDTO = z.infer<typeof sendReactToPost>;