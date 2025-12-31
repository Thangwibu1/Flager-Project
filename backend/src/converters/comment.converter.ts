import { FullComment } from "../types/comments/comment"
import { StandardComment, ReplyCommandResponse } from "../types/comments/comment.response"
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


export const toReplyCommandResponse = (comment: FullComment): ReplyCommandResponse => {
  return {
    content: comment.content,
    media: comment.media,
    createdAt: formatDate(comment.createdAt),
    id: comment._id.toString(),
    parentId: comment.parentId!.toString(),
    totalReact: [],
    replyToId:  comment.replyToId ? comment.replyToId.toString() : null,
  }
}