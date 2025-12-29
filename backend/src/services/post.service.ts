import { ForbiddenRequestError, NotFoundRequestError } from '../errors/api/ApiError';
import postRepository from '../repositories/post/post.repository';
import postNodeRepository from '../repositories/post/post.repository.graph';
import {
    FullPost,
    PostCreateDTO,
    PostUpdateDTO,
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
import { QueryCountReactOfPost, QueryPostListOfUser } from '../types/post/post.query';
import userNodeRepository from '../repositories/user/user.repository.graph';
import { UserNotFoundError } from '../errors/user/UserError';
class PostService {

    isAuthorOfPost = async (authorId: string, postId: string) => {
        const foundPost = await postRepository.findOneByNormalQuery({_id: postId, authorId: authorId}, ['_id']);
        return foundPost != null;
    }
    getPostById = async (id: string, select: (keyof FullPost)[] = []) => {
        const foundPost = await postRepository.findById(id, select);
        return foundPost;
    };
    /**
     * Logic nghiệp vụ xử lí logic user tạo post
     * @param payload
     */
    createPostByUser = async (
        currentUserId: string,
        payload: PostCreateDTO
    ): Promise<PostCreateResponse> => {
        // create post
        const createPayload = {
            ...payload,
            authorId: currentUserId,
        }
        const newPost = await postRepository.createOne(createPayload);
        await postNodeRepository.create({
            authorId: currentUserId,
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
            throw new UserNotFoundError();
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
    /**
     * Hàm xử lí logic user cập nhật post
     * @param currentUserId 
     * @param postId 
     * @param payload 
     */
    updatePostByUser = async (currentUserId: string, postId: string, payload: PostUpdateDTO) => {
        // check post này có phải của author(người cập nhật) đăng lên không
        const isTrueAuthor = await this.isAuthorOfPost(currentUserId, postId);
        if(!isTrueAuthor){
            throw new ForbiddenRequestError("You have not permission to update this post");
        }
        // update post
        await postRepository.updatePostById(postId, payload);
    }
    /**
     * Hàm xử lí logic nghiệp vụ xóa user post
     * @param currentUserId 
     * @param postId 
     */
    deletePostByUser = async (currentUserId: string, postId: string) => {
        // check post này có phải của author(người cập nhật) đăng lên không
        const isTrueAuthor = await this.isAuthorOfPost(currentUserId, postId);
        if(!isTrueAuthor){
            throw new ForbiddenRequestError("You have not permission to update this post");
        }
        // update post
        await postRepository.updatePostById(postId, {
            deletedAt: new Date,
        });
    }
    
    countTotalReactOfPost = async (currentUserId: string, postId: string, query: QueryCountReactOfPost) => {

        // nếu có chặn user xem post này thì sau code thêm
        // if (currentUserId does not allow to view post) {}

        // check post exist
        const foundPost = await this.getPostById(postId, ['_id', 'totalReact']);
        if(!foundPost){
            throw new NotFoundRequestError("Not found post");
        }
        // handle query
        const total = query.reactName == undefined ? foundPost.totalReact.reduce((acc, item) => item.total + acc, 0) : foundPost.totalReact.find((item) => item.name == query.reactName)?.total;
        // end handle query
        return total;
    }
}
export default new PostService();
