import { Comment } from "../../models/comment/comment.model.mongo";

class CommentRepository {
  createOne = async (data: {
    userId: string,
    postId: string,
    content: string,
    media:  string[],
    parentId?: string,
    replyToId?: string,
  }) => {
    return await Comment.create(data);
  }
}


export default new CommentRepository();