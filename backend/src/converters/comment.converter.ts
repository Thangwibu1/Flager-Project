import { FullComment } from "../types/comments/comment"
import { StandardComment, StandardReplyCommand } from "../types/comments/comment.response"
import { formatDate } from "../utils/formatter.util"

export const toStandardComment = (comment: FullComment): StandardComment => {
  return {
    content: comment.content,
    media: comment.media,
    createdAt: formatDate(comment.createdAt),
    id: comment._id.toString(),
    totalReact: [],
    totalReply: comment.totalReply,
  }
}


export const toStandardReply = (comment: FullComment): StandardReplyCommand => {
  return {
    content: comment.content,
    media: comment.media,
    createdAt: formatDate(comment.createdAt),
    id: comment._id.toString(),
    parentId: comment.parentId!.toString(),
    totalReact: [],
  }
}