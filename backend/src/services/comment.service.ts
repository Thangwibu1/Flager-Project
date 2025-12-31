import {
    NotFoundRequestError,
} from '../errors/api/ApiError';
import commentRepository from '../repositories/comment/comment.repository';
import {
    CreateCommentToPostBodyDTO,
    ReplyCommentBodyDTO,
} from '../types/comments/comment.request';
import postService from './post.service';
import commentNodeRepository from '../repositories/comment/comment.repository.graph';
import { FullComment } from '../types/comments/comment';
import userService from './user.service';
import postRepository from '../repositories/post/post.repository';
import { GetCommentListQuery } from '../types/comments/comment.query';
import * as commentConverter from '../converters/comment.converter';
import { LazyPagination } from '../types/pagination/pagination.response';
import { StandardComment } from '../types/comments/comment.response';

class CommentService {
    getCommentById = async (id: string, select: (keyof FullComment)[] = []) => {
        return await commentRepository.findOneById(id, select);
    };

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
            postRepository.modifyTotalCommentById(postId, 1)
        ]);
        // converter
        return comment;
    };

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
            this.getCommentById(parentId, ['_id']),
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
            postRepository.modifyTotalCommentById(postId, 1)
        ]);

        // converter
        return newReply;
    };

    deleteComment = async (userId: string, postId: string, commentId: string) => {
        // check comment tồn tại của post này tồn tại
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
            foundComment.parentId ? commentRepository.modifyReplyTotal(foundComment.parentId, -1) : Promise.resolve(null),
            // update totalComment in post
            foundComment.parentId ? postRepository.modifyTotalCommentById(postId, -1) : postRepository.modifyTotalCommentById(postId, -(foundComment.totalReply + 1))
        ]);
    };

    getCommentListOfPost = async (curUserId: string, postId: string, query: GetCommentListQuery): Promise<{
        commentList: StandardComment[],
        pagination: LazyPagination,
    }> => {
        const limit = 5;
        // check post exist
        if(!(await postService.getPostById(postId, ['_id']))){
            throw new NotFoundRequestError("Not found post");
        }
        // if() {// curUserId not have permission to view post}
        // handle query
        const filter : any = {
            postId: postId,
        };
        if(query.lastItem){
            filter.lastItem = query.lastItem;
        }

        // end handle query

        const rawList = await commentRepository.getListForLazyLoad({
            ...filter,
            limit,
        });
        const responseList = rawList.map(item => commentConverter.toStandardComment(item));
        return {
            commentList: responseList,
            pagination: {
                hasNext: rawList.length == limit,
                lastItem: rawList.length != 0 ? rawList[rawList.length - 1].createdAt.getTime() : null
            },
        }
    }
}

export default new CommentService();
