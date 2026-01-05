import {
    ConflictRequestError,
    NotFoundRequestError,
} from '../errors/api/ApiError';
import commentRepository from '../repositories/comment/comment.repository';
import {
    CreateCommentToPostBodyDTO,
    ReplyCommentBodyDTO,
    SendReactToCommentRequestDTO,
} from '../types/comments/comment.request';
import postService from './post.service';
import commentNodeRepository from '../repositories/comment/comment.repository.graph';
import { FullComment } from '../types/comments/comment';
import userService from './user.service';
import postRepository from '../repositories/post/post.repository';
import {
    CountTotalReactNameQuery,
    GetCommentListQuery,
    GetReplyCommentListQuery,
} from '../types/comments/comment.query';
import * as commentConverter from '../converters/comment.converter';
import { LazyPagination } from '../types/pagination/pagination.response';
import {
    StandardComment,
    ReplyCommandResponse,
} from '../types/comments/comment.response';

class CommentService {
    /**
     * Hàm giúp kiểm tra trong post có chứa cmt cần kiểm tra không
     * @param postId
     * @param commentId
     * @returns
     */
    isCommentOfPostExist = async (postId: string, commentId: string) => {
        const isTrue = await commentRepository.findOneByNormalFilter(
            {
                _id: commentId,
                postId,
                deletedAt: null,
            },
            ['_id']
        );
        return isTrue;
    };
    /**
     * Hàm giúp tìm cmt theo id
     * @param id
     * @param select
     * @returns
     */
    getCommentById = async (id: string, select: (keyof FullComment)[] = []) => {
        return await commentRepository.findOneById(id, select);
    };
    /**
     * Hàm xử lí feature cho user cmt vào 1 post(reply sẽ ở 1 hàm khác)
     * @param curUserId
     * @param postId
     * @param body
     * @returns
     */
    createCommentToPost = async (
        curUserId: string,
        postId: string,
        body: CreateCommentToPostBodyDTO
    ) => {
        // check post exists
        if (!(await postService.getPostById(postId))) {
            throw new NotFoundRequestError('postId is not found');
        }
        // create comment in mongo
        const comment = await commentRepository.createOne({
            ...body,
            userId: curUserId,
            postId: postId,
        });
        // create node in neo4j
        await Promise.all([
            commentNodeRepository.createNode(comment._id.toString()),
            postRepository.modifyTotalCommentById(postId, 1),
        ]);
        // converter
        return comment;
    };
    /**
     * Hàm xử lí logic feature user phản hồi 1 comment
     * @param param0
     * @returns
     */
    replyToComment = async ({
        userId,
        postId,
        parentId,
        body,
    }: {
        userId: string;
        postId: string;
        parentId: string;
        body: ReplyCommentBodyDTO;
    }) => {
        const [foundPost, foundParent, foundUserReply] = await Promise.all([
            postService.getPostById(postId),
            this.isCommentOfPostExist(postId, parentId),
            body.replyToId
                ? userService.getUserById(body.replyToId, ['_id'])
                : Promise.resolve(null),
        ]);
        // check post exists
        if (!foundPost) {
            throw new NotFoundRequestError('post is not found');
        }
        // check parent comment exist
        if (!foundParent) {
            throw new NotFoundRequestError('Not found comment');
        }
        // check replyTo exist
        if (body.replyToId && !foundUserReply) {
            throw new NotFoundRequestError('Not found user to reply');
        }
        const newReply = await commentRepository.createOne({
            ...body,
            postId: postId,
            userId: userId,
            parentId: parentId,
            replyToId: body.replyToId ?? undefined,
        });
        await Promise.all([
            // create node in neo
            commentNodeRepository.createNode(newReply._id.toString()),
            // update parent total reply
            commentRepository.modifyReplyTotal(parentId, 1),
            // update total comment in post mongo
            postRepository.modifyTotalCommentById(postId, 1),
        ]);

        // converter
        return newReply;
    };
    /**
     * Hàm xử lí nghiệp vụ user xóa comment
     * @param userId
     * @param postId
     * @param commentId
     */
    deleteComment = async (
        userId: string,
        postId: string,
        commentId: string
    ) => {
        // check comment do user gửi tồn tại của post này tồn tại
        const foundComment = await commentRepository.findOneByNormalFilter(
            {
                userId,
                postId,
                _id: commentId,
            },
            ['_id', 'parentId', 'totalReply']
        );
        if (!foundComment) {
            throw new NotFoundRequestError('Not found comment');
        }
        await Promise.all([
            // soft delete in mongo
            commentRepository.deleteOneById(commentId),
            // delete node in neo
            commentNodeRepository.deleteCommentById(commentId),
            // update totalReply in comment
            foundComment.parentId
                ? commentRepository.modifyReplyTotal(foundComment.parentId, -1)
                : Promise.resolve(null),
            // update totalComment in post
            foundComment.parentId
                ? postRepository.modifyTotalCommentById(postId, -1)
                : postRepository.modifyTotalCommentById(
                      postId,
                      -(foundComment.totalReply + 1)
                  ),
        ]);
    };
    /**
     * Hàm xử lí logic feature lấy danh sách comment của post
     * @param curUserId
     * @param postId
     * @param query
     * @returns
     */
    getCommentListOfPost = async (
        curUserId: string,
        postId: string,
        query: GetCommentListQuery
    ): Promise<{
        commentList: StandardComment[];
        pagination: LazyPagination;
    }> => {
        const limit = 20;
        // check post exist
        if (!(await postService.getPostById(postId, ['_id']))) {
            throw new NotFoundRequestError('Not found post');
        }
        // if() {// curUserId not have permission to view post}
        // handle query
        const filter: any = {
            postId: postId,
        };
        if (query.lastItem) {
            filter.lastItem = query.lastItem;
        }

        // end handle query

        const rawList = await commentRepository.getListForLazyLoad({
            ...filter,
            limit,
        });
        const responseList = rawList.map(item =>
            commentConverter.toStandardComment(item)
        );
        return {
            commentList: responseList,
            pagination: {
                hasNext: rawList.length == limit,
                lastItem:
                    rawList.length != 0
                        ? rawList[rawList.length - 1].createdAt.getTime()
                        : null,
            },
        };
    };
    /**
     * Hàm xử lí feature lấy phản hồi của comment
     * @param param0
     * @returns
     */
    getReplyListOfComment = async ({
        curUserId,
        postId,
        parentId,
        query,
    }: {
        curUserId: string;
        postId: string;
        query: GetReplyCommentListQuery;
        parentId: string;
    }): Promise<{
        commentList: ReplyCommandResponse[];
        pagination: LazyPagination;
    }> => {
        const limit = 20;
        // check comment exist
        if (
            !(await commentRepository.findOneByNormalFilter(
                {
                    _id: parentId,
                    postId: postId,
                },
                ['_id']
            ))
        ) {
            throw new NotFoundRequestError('Not found comment');
        }
        // if() {// curUserId not have permission to view post}
        // handle query

        const filter: any = {
            postId: postId,
            parentId: parentId,
        };
        if (query.lastItem) {
            filter.lastItem = query.lastItem;
        }

        // end handle query
        const rawList = await commentRepository.getListForLazyLoad({
            ...filter,
            limit,
        });
        const responseList = rawList.map(item =>
            commentConverter.toReplyCommandResponse(item)
        );
        return {
            commentList: responseList,
            pagination: {
                hasNext: rawList.length == limit,
                lastItem:
                    rawList.length != 0
                        ? rawList[rawList.length - 1].createdAt.getTime()
                        : null,
            },
        };
    };
    /**
     * Hàm xử lí feature cho user gửi tương tác đến cmt
     * @param data
     */
    sendReactToComment = async (data: {
        curUserId: string;
        postId: string;
        commentId: string;
        body: SendReactToCommentRequestDTO;
    }) => {
        const { curUserId, postId, commentId, body } = data;
        const [foundComment, reactRelation] = await Promise.all([
            // check post exist
            this.isCommentOfPostExist(postId, commentId),
            // check người này có tương tác với post trước đó chưa
            commentNodeRepository.findSendReactRelation(curUserId, commentId),
        ]);
        if (!foundComment) {
            throw new NotFoundRequestError('Not found comment');
        }
        if (reactRelation) {
            await Promise.all([
                // decrease in pre react in mongo
                commentRepository.modifyReact(
                    commentId,
                    reactRelation.name,
                    -1
                ),
                // increase new react in mongo
                commentRepository.modifyReact(commentId, body.reactName, 1),
                // update relation in neo4j
                commentNodeRepository.updateSendReactToComment(
                    curUserId,
                    commentId,
                    { reactName: body.reactName }
                ),
            ]);
        } else {
            await Promise.all([
                // increase new react in mongo
                commentRepository.modifyReact(commentId, body.reactName, 1),
                // create relation in neo4j
                commentNodeRepository.createSendReactToComment(
                    curUserId,
                    commentId,
                    { reactName: body.reactName }
                ),
            ]);
        }
    };
    /**
     * Hàm xử lí logic feature user xóa tương tác tới comment
     * @param data
     */
    unReactToComment = async (data: {
        curUserId: string;
        postId: string;
        commentId: string;
    }) => {
        const { curUserId, postId, commentId } = data;
        const [foundComment, reactRelation] = await Promise.all([
            // check post exist
            this.isCommentOfPostExist(postId, commentId),
            // check người này có tương tác với post trước đó chưa
            commentNodeRepository.findSendReactRelation(curUserId, commentId),
        ]);
        if (!foundComment) {
            throw new NotFoundRequestError('Not found comment');
        }
        if (!reactRelation) {
            throw new ConflictRequestError(
                'You have not sent a react to this comment before'
            );
        }
        await Promise.all([
            // decrease in react in mongo
            commentRepository.modifyReact(commentId, reactRelation.name, -1),
            // delete relation in neo4j
            commentNodeRepository.deleteSendReact(curUserId, commentId),
        ]);
    };
    /**
     * Hàm xử lí logic feature đếm tổng lượng tương tác của bài viết
     * @param data 
     * @returns 
     */
    countTotalReactOfComment = async (data: {
        curUserId: string;
        postId: string;
        commentId: string;
        query: CountTotalReactNameQuery;
    }) => {
        const { curUserId, postId, commentId, query } = data;
        // check comment exist
        const foundComment = await commentRepository.findOneByNormalFilter(
            {
                _id: commentId,
                postId,
                deletedAt: null,
            },
            ['_id', 'totalReact']
        );
        if (!foundComment) {
            throw new NotFoundRequestError('Not found comment');
        }

        const total = !query.reactName
            ? foundComment.totalReact.reduce((acc, item) => acc + item.total, 0)
            : foundComment.totalReact.find(
                  item => item.name == query.reactName
              )!.total;
        return total;
    };
}

export default new CommentService();
