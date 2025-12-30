import {
    ConflictRequestError,
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
        await commentNodeRepository.createNode(comment._id.toString());
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
        // check post exists
        if (!(await postService.getPostById(postId))) {
            throw new NotFoundRequestError('postId is not found');
        }

        // check parent comment exist
        const foundParent = await this.getCommentById(parentId, ['_id']);
        if (!foundParent) {
            throw new NotFoundRequestError('Not found parentId');
        }
        if (body.replyTo) {
            // check replyTo exist
            if (!(await userService.getUserById(body.replyTo))) {
                throw new NotFoundRequestError('Not found replyTo user');
            }
        }
        const newComment = await commentRepository.createOne({
          ...body,
          postId: postId,
          userId: userId,
          parentId: parentId,
          replyToId: body.replyTo ?? undefined
        });
        // create node in neo4j
        await commentNodeRepository.createNode(newComment._id.toString());
        // converter
        return newComment;
    };
}

export default new CommentService();
