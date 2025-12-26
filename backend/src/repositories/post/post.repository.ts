import { SortOrder } from 'mongoose';
import { ViewType } from '../../config/enum/post.enum';
import { Post } from '../../models/post/post.model.mongo';
import { FullPost } from '../../types/post/post.request';

class PostRepository {
    createOne = async (data: any) => {
        const newPost = await Post.create(data);
        return newPost;
    };
    getListLazyLoad = async ({
        authorId,
        viewType,
        select = [],
        limit = 10,
        lastItem,
        sort = {
            createdAt: 'desc'
        }
    }: {
        authorId?: string;
        viewType?: ViewType;
        select?: (keyof FullPost)[];
        limit?: number;
        lastItem?: string;
        sort?: { [key: string]: SortOrder }
    }) => {
        const dbFilter: { [key: string]: any } = {};
        // where 
        if(authorId){
            dbFilter.authorId = authorId;
        }
        if(viewType){
            dbFilter.viewType = viewType;
        }
        if (lastItem) {
            const foundItem = await Post.findOne({
                _id: lastItem,
                deletedAt: null,
            })
                .select('createdAt')
                .lean();
            if (foundItem) {
                dbFilter.createdAt = {
                    $lt: foundItem.createdAt,
                };
            }
        }
        // end where
        const postList = await Post.find({
            ...dbFilter,
            deletedAt: null
        })
            .sort(sort)
            .limit(limit)
            .select(select)
            .lean();
        return postList;
    };
}
export default new PostRepository();
