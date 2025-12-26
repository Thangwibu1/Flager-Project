import { NotFoundRequestError } from '../errors/api/ApiError';
import postRepository from '../repositories/post/post.repository';
import postNodeRepository from '../repositories/post/post.repository.graph';
import { GetPostListOfUserDTO, PostCreateDTO } from '../types/post/post.request';
import {
    PostCreateResponse,
    StandardPostResponse,
} from '../types/post/post.response';
import userService from './user.service';
import * as postConverter from '../converters/post.converter';
import { LazyPagination } from '../types/pagination/pagination.response';
import { ViewType } from '../config/enum/post.enum';
import { QueryPostListOfUser } from '../types/post/post.query';
class PostService {
    /**
     * Logic nghiệp vụ xử lí logic user tạo post
     * @param payload
     */
    createPostByUser = async (
        payload: PostCreateDTO
    ): Promise<PostCreateResponse> => {
        // check user exist
        const foundUser = await userService.getUserById(payload.authorId);
        if (!foundUser) {
            throw new NotFoundRequestError('User is not found');
        }
        // create post
        const newPost = await postRepository.createOne(payload);
        await postNodeRepository.create({
            authorId: payload.authorId,
            postId: newPost._id.toString(),
        });
        return postConverter.toPostCreate(newPost);
    };

    getPostListOfAuthor = async ({
        currentUserId,
        authorId,
        query,
        limit = 10
    }: {
        currentUserId: string;
        authorId: string;
        query: QueryPostListOfUser;
        limit?: number;
    }): Promise<{
        postList: StandardPostResponse[];
        pagination: LazyPagination;
    }> => {
        // check authorId exist
        if(!(await userService.getUserById(authorId))){
          throw new NotFoundRequestError("Not found author");
        }
        // handle query
        let filter: { [key: string]: any } = {};
        if (query.lastItem) {
            filter.lastItem = query.lastItem;
        }
        // end handle query

        filter.authorId = authorId;
        if (authorId != currentUserId) {
            // coi post người khác cần chặn post cá nhân của người đó
            filter.viewType = ViewType.public;
        }
        // query post list 
        const postList = await postRepository.getListLazyLoad({
            ...filter,
            limit,
        });
        // convert post response
        const postListResponse = postList.map((item: any) =>
            postConverter.toStandardPost(item)
        );
        return {
            postList: postListResponse,
            pagination: {
                hasNext: postListResponse.length == 10,
                lastItem:
                    postListResponse.length != 0
                        ? postListResponse[postListResponse.length - 1].id
                        : '',
            },
        };
    };
}
export default new PostService();
