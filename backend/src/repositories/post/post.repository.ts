import { SortOrder } from 'mongoose';
import { ReactName, ViewType } from '../../config/enum/post.enum';
import { Post } from '../../models/post/Post.model.mongo';
import { FullPost } from '../../types/post/post.request';

class PostRepository {
    createOne = async (data: Partial<Omit<FullPost, '_id' | 'cratedAt' | 'updatedAt'>>) => {
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

    findById = async (id: string, select: (keyof FullPost)[] = []) => {
        return await Post.findOne({
            _id: id,
            deletedAt: null
        }).select(select).lean();
    }

    modifyReactByPostIdAndReactType = async (filter: {postId: string, reactName: ReactName}, amount: number): Promise<void> => {
        const {postId, reactName} = filter;
        await Post.findOneAndUpdate({
            _id: postId,
            "totalReact.name": reactName,
            deletedAt: null,
        }, {
            $inc: {
                "totalReact.$.total": amount,
            }
        });
    }
    /**
     * Hàm giúp lấy dữ liệu với filter dạng đối chiếu bằng, ví dụ: { authorId: data, createdAt: time,... }
     * @param filter 
     * @param select 
     * @returns 
     */
    findOneByNormalQuery = async (filter: Partial<FullPost>, select: (keyof FullPost)[] = ['_id']) => {
        return await Post.exists({
            ...filter,
            deletedAt: null
        }).select(select).lean();
    }

    updatePostById = async (postId: string, update: Partial<Omit<FullPost, '_id' | 'authorId'>> ) => {
        await Post.updateOne({_id: postId, deletedAt: null}, update);
    }
}
export default new PostRepository();
