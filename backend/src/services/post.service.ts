import {
    ConflictRequestError,
    ForbiddenRequestError,
    NotFoundRequestError,
} from '../errors/api/ApiError';
import postRepository from '../repositories/post/post.repository';
import postNodeRepository from '../repositories/post/post.repository.graph';
import {
    FullPost,
    PostCreateDTO,
    PostUpdateDTO,
    SendReactToPostDTO,
} from '../types/post/post.request';
import { StandardPostResponse } from '../types/post/post.response';
import userService from './user.service';
import * as postConverter from '../converters/post.converter';
import { LazyPagination } from '../types/pagination/pagination.response';
import { ReactName, ViewType } from '../config/enum/post.enum';
import {
    QueryCountReactOfPost,
    QueryPostListOfUser,
} from '../types/post/post.query';
import userNodeRepository from '../repositories/user/user.repository.graph';
import { UserNotFoundError } from '../errors/user/UserError';
class PostService {
    isAuthorOfPost = async (authorId: string, postId: string) => {
        const foundPost = await postRepository.findOneByNormalQuery(
            { _id: postId, authorId: authorId },
            ['_id']
        );
        return foundPost != null;
    };
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
    ): Promise<StandardPostResponse> => {
        // create post
        const createPayload = {
            ...payload,
            authorId: currentUserId,
        };
        const newPost = await postRepository.createOne(createPayload);
        await postNodeRepository.create({
            authorId: currentUserId,
            postId: newPost._id.toString(),
        });
        return postConverter.toStandardPost(newPost);
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
        const postListResponse = postList.map(item =>
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
        postId: string,
        body: SendReactToPostDTO
    ) => {
        const { reactName } = body;
        const [existPost, foundPreviousReact] = await Promise.all([
            // check post exist
            this.getPostById(postId, ['_id']),
            // check react này có được thả react bởi user hiện tại trước đó chưa
            userNodeRepository.getSendReactToPostRelation(
                currentUserId,
                postId
            ),
        ]);
        if (!existPost) {
            throw new NotFoundRequestError('Not found post');
        }
        if (foundPreviousReact) {
            const previousReactFilter = {
                postId: foundPreviousReact.toPost.id,
                reactName: foundPreviousReact.data.name,
            };
            const reactFilter = {
                postId: postId,
                reactName: reactName,
            };
            await Promise.all([
                // nếu có trước đó thì trừ react trong mongo tương ứng
                postRepository.modifyReactByPostIdAndReactType(
                    previousReactFilter,
                    -1
                ),
                // cập nhật react mới
                userNodeRepository.updateSendReactRelationByReactName(
                    currentUserId,
                    postId,
                    {
                        reactName: reactName,
                    }
                ),
                // update total của react mới trong mongo
                postRepository.modifyReactByPostIdAndReactType(reactFilter, 1),
            ]);
        } else {
            const reactFilter = {
                postId: postId,
                reactName: reactName,
            };
            await Promise.all([
                // cập nhật react
                userNodeRepository.createSendReactRelationToPost(
                    currentUserId,
                    postId,
                    {
                        name: reactName,
                    }
                ),
                // update total của react mới trong mongo
                postRepository.modifyReactByPostIdAndReactType(reactFilter, 1),
            ]);
        }
    };
    /**
     * Hàm xử lí logic user cập nhật post
     * @param currentUserId
     * @param postId
     * @param payload
     */
    updatePostByUser = async (
        currentUserId: string,
        postId: string,
        payload: PostUpdateDTO
    ) => {
        // check post này có phải của author(người cập nhật) đăng lên không
        const isTrueAuthor = await this.isAuthorOfPost(currentUserId, postId);
        if (!isTrueAuthor) {
            throw new ForbiddenRequestError(
                'You have not permission to update this post'
            );
        }
        // update post
        await postRepository.updatePostById(postId, payload);
    };
    /**
     * Hàm xử lí logic nghiệp vụ xóa user post
     * @param currentUserId
     * @param postId
     */
    deletePostByUser = async (currentUserId: string, postId: string) => {
        // check post này có phải của author(người cập nhật) đăng lên không
        const isTrueAuthor = await this.isAuthorOfPost(currentUserId, postId);
        if (!isTrueAuthor) {
            throw new ForbiddenRequestError(
                'You have not permission to update this post'
            );
        }
        await Promise.all([
            // delete post
            postRepository.updatePostById(postId, {
                deletedAt: new Date(),
            }),
            // delete post node
            postNodeRepository.deleteNodeById(postId),
        ]);
    };
    /**
     * Hàm xử lí logic nghiệp vụ (đếm tổng tương tác của 1 bài viết)
     * @param currentUserId
     * @param postId
     * @param query
     * @returns
     */
    countTotalReactOfPost = async (
        currentUserId: string,
        postId: string,
        query: QueryCountReactOfPost
    ) => {
        // nếu có chặn user xem post này thì sau code thêm
        // if (currentUserId does not allow to view post) {}

        // check post exist
        const foundPost = await this.getPostById(postId, ['_id', 'totalReact']);
        if (!foundPost) {
            throw new NotFoundRequestError('Not found post');
        }
        // handle query
        const total = !query.reactName
            ? foundPost.totalReact.reduce((acc, item) => item.total + acc, 0)
            : foundPost.totalReact.find(item => item.name == query.reactName)
                  ?.total;
        // end handle query
        return total;
    };
    /**
     *
     * @param currentUserId
     * @param postId
     * @param reactName
     */
    deleteReactOfPost = async (
        currentUserId: string,
        postId: string,
        reactName: ReactName
    ) => {
        const [foundPost, foundReact] = await Promise.all([
            // check post exist
            this.getPostById(postId, ['_id']),
            userNodeRepository.getSendReactToPostRelation(
                currentUserId,
                postId
            ),
        ]);
        if (!foundPost) {
            throw new NotFoundRequestError('Not found post');
        }
        // check user từng thả tương tác tương ứng cho bài post này mới cho xóa
        if (!foundReact || !(foundReact.data.name == reactName)) {
            throw new ConflictRequestError(
                `You has not sent ${reactName} react to this post`
            );
        }
        // xóa tương tác ở mongo và neo4j
        await Promise.all([
            userNodeRepository.deleteSendReact(currentUserId, postId),
            postRepository.modifyReactByPostIdAndReactType(
                {
                    postId: postId,
                    reactName,
                },
                -1
            ),
        ]);
    };
}
export default new PostService();
