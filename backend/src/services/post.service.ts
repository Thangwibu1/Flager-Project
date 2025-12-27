import { NotFoundRequestError } from '../errors/api/ApiError';
import postRepository from '../repositories/post/post.repository';
import postNodeRepository from '../repositories/post/post.repository.graph';
import {
    FullPost,
    PostCreateDTO,
    SendReactToPostDTO,
} from '../types/post/post.request';
import {
    PostCreateResponse,
    StandardPostResponse,
} from '../types/post/post.response';
import userService from './user.service';
import * as postConverter from '../converters/post.converter';
import { LazyPagination } from '../types/pagination/pagination.response';
import { ViewType } from '../config/enum/post.enum';
import { QueryPostListOfUser } from '../types/post/post.query';
import userNodeRepository from '../repositories/user/user.repository.graph';
class PostService {
    getPostById = async (id: string, select: (keyof FullPost)[] = []) => {
        const foundPost = await postRepository.findById(id, select);
        return foundPost;
    };
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
    /**
     * Hàm xử lí logic nghiệp vụ lấy post theo chủ sở hữu
     * @param param0
     * @returns
     */
    getPostListOfAuthor = async ({
        currentUserId,
        authorId,
        query,
    }: {
        currentUserId: string;
        authorId: string;
        query: QueryPostListOfUser;
    }): Promise<{
        postList: StandardPostResponse[];
        pagination: LazyPagination;
    }> => {
        const limit = 10;
        // check authorId exist
        if (!(await userService.getUserById(authorId))) {
            throw new NotFoundRequestError('Not found author');
        }
        // handle query
        let filter: { [key: string]: any } = {};
        if (query.lastItem) {
            filter.lastItem = query.lastItem;
        }
        // end handle query

        // handle other fields
        filter.authorId = authorId;
        if (authorId != currentUserId) {
            // coi post người khác cần chặn post cá nhân của người đó
            filter.viewType = ViewType.public;
        }

        // end handle other fields

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
                hasNext: postListResponse.length == limit,
                lastItem:
                    postListResponse.length != 0
                        ? postListResponse[postListResponse.length - 1].id
                        : null,
            },
        };
    };
    /**
     * Hàm xử lí nghiệp vụ (thả tương react cho bài viết)
     * @param currentUserId
     * @param payload
     */
    sendReactToPost = async (
        currentUserId: string,
        payload: SendReactToPostDTO
    ) => {
        const { postId, reactName } = payload;
        // check post exist
        const existPost = await this.getPostById(postId, ['_id']);
        if (!existPost) {
            throw new NotFoundRequestError('Not found post');
        }
        // check react này có được thả react bởi user hiện tại trước đó chưa
        const foundPreviousReact =
            await userNodeRepository.getSendReactToPostRelation(
                currentUserId,
                postId
            );
        if (foundPreviousReact) {
            // nếu có trước đó thì trừ react trong mongo tương ứng
            const previousReactFilter = {
                postId: foundPreviousReact.toPost.id,
                reactName: foundPreviousReact.data.name,
            };
            await postRepository.modifyReactByPostIdAndReactType(
                previousReactFilter,
                -1
            );
            // cập nhật react mới
            await userNodeRepository.updateSendReactRelationByReactName(
                currentUserId,
                payload.postId,
                {
                    reactName: reactName,
                }
            );
        } else {
            // cập nhật react
            await userNodeRepository.createSendReactRelationToPost(
                currentUserId,
                payload.postId,
                {
                    name: reactName,
                }
            );
        }
        // update total của react mới trong mongo
        const reactFilter = {
            postId: postId,
            reactName: reactName,
        };
        await postRepository.modifyReactByPostIdAndReactType(reactFilter, 1);
    };
}
export default new PostService();
