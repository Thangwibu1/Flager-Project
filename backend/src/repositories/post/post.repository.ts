import { Post } from '../../models/post/post.model.mongo';
import { FullPost } from '../../types/post/Post';

class PostRepository {
    createOne = async (data: any) => {
        const newPost = await Post.create(data);
        return newPost;
    };
    getListLazyLoad = async ({
        filter,
        select = [],
        limit = 10,
        lastItem,
    }: {
        filter: Record<string, any>;
        select?: (keyof FullPost)[];
        limit?: number;
        lastItem: string | null;
    }) => {
        if (lastItem) {
            const item = await Post.findOne({
                _id: lastItem,
            })
                .select('createdAt')
                .lean();
            if (lastItem) {
                filter.createdAt = {
                    $lt: item?.createdAt,
                };
            }
        }
        const postList = await Post.find({
            ...filter,
            deletedAt: null
        })
            .sort({ createdAt: 'desc' })
            .limit(limit)
            .select(select)
            .lean();
        return postList;
    };
}
export default new PostRepository();
