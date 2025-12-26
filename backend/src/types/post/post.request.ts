import { Types } from 'mongoose';
import { z } from 'zod';
import { ReactName, ViewType } from '../../config/enum/post.enum';

export const IPost = z.object({
    content: z.string().nonempty({error: "Content is not allowed to be empty"}),
    media: z.array(z.string().nonempty()).nullable(),
});
export const postListOfUser = z.object({
    authorId: z.string().nonempty().refine(value => Types.ObjectId.isValid(value), {error: "authorId is invalid"})
}).strict();
export const postCreate = IPost.extend({
    viewType: z
        .enum(ViewType, {error: "View type is invalid"})
})
    .refine(
        value =>
            (value.content != null && value.content != '') ||
            (value.media != null && value.media.length > 0),
        {
            error: 'You need to send a none empty content or media in order to post',
        }
    )
    .strict();

export const sendReactToPost = z.object({
    reactName: z.enum(ReactName, {error: "React name is invalid"}),
    postId: z.string().nonempty().refine(value => Types.ObjectId.isValid(value), {error: "postId is invalid"})
}).strict();

export const fullPost = IPost.extend({
    _id: z.instanceof(Types.ObjectId),
    authorId: z.instanceof(Types.ObjectId),
    totalReact: z.array(z.object({name: z.enum(ReactName), count: z.number()})),
    totalComment: z.number(),
    totalShare: z.number(),
    createdAt: z.date(),
    updatedAt: z.date(),
    deletedAt: z.date().nullable().optional(),
    viewType: z.enum(ViewType),
});

export type Post = z.infer<typeof IPost>;
export type PostCreateDTO = z.infer<typeof postCreate> & {authorId: string};
export type FullPost = z.infer<typeof fullPost>;
export type SendReactToPostDTO = z.infer<typeof sendReactToPost>;