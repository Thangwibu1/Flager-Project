import { Comment } from "../../models/comment/comment.model.mongo";
import { FullComment } from "../../types/comments/comment";

class CommentRepository {
  createOne = async (data: {
    userId: string,
    postId: string,
    content: string,
    media:  string[],
    parentId?: string,
    replyToId?: string,
  }): Promise<FullComment> => {
    return await Comment.create(data);
  }

  findOneById = async (id: string, select: (keyof FullComment)[] = []) => {
    return await Comment.findOne({
      _id: id,
      deletedAt: null,
    }).select(select).lean(); 
  }
}


export default new CommentRepository();