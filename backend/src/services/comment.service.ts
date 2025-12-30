import { ConflictRequestError } from '../errors/api/ApiError';
import commentRepository from '../repositories/comment/comment.repository';
import { CreateCommentToPostBodyDTO } from '../types/comments/comment.request';
import postService from './post.service';
import commentNodeRepository from "../repositories/comment/comment.repository.graph";
class CommentService {
    createCommentToPost = async (
        curUserId: string,
        postId: string,
        body: CreateCommentToPostBodyDTO
    ) => {
        // check post exists
        if (!(await postService.getPostById(postId))) {
            throw new ConflictRequestError('postId is not found');
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
}

export default new CommentService();
