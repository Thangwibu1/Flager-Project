import { Types } from 'mongoose';
import { z } from 'zod';

export const IPost = z.object({
    content: z.string().nullable(),
    media: z.array(z.string().nonempty()).min(0),
});

export const postCreate = IPost.extend({
    userId: z.string().nonempty()
        .refine(value => Types.ObjectId.isValid(value), {
            error: 'UserId is not valid',
        }),
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

export const fullPost = postCreate.extend({
    _id: z.instanceof(Types.ObjectId),
    totalReact: z.number(),
    totalComment: z.number(),
    totalShare: z.number(),
    createdAt: z.date(),
    updatedAt: z.date(),
    deletedAt: z.date().nullable().optional(),
});

export type Post = z.infer<typeof IPost>;
export type PostCreateDTO = z.infer<typeof postCreate>;
export type FullPost = z.infer<typeof fullPost>;
