import { IPostDocument } from "../models/post/Post.model.mongo";
import { FullPost } from "../types/post/post.request";
import { PostCreateResponse, StandardPostResponse } from "../types/post/post.response";
import * as formatterUtil from '../utils/formatter.util';

export const toPostCreate = (post: FullPost): PostCreateResponse => {
  return {
    content: post.content,
    media: post.media || [],
    createdAt: formatterUtil.formatDate(post.createdAt),
    id: post._id.toString(),
    viewType: post.viewType
  }
}

export const toStandardPost = (post: FullPost): StandardPostResponse => {
  const totalReact = post.totalReact.map((item) => {
    return {name: item.name, total: item.total}
  }).sort((a, b) => (a.total > b.total) ? -1 : 1);
  return {
    content: post.content,
    media: post.media || [],
    viewType: post.viewType,
    totalComment: post.totalComment,
    totalShare: post.totalShare,
    authorId: post.authorId.toString(),
    totalReact: totalReact,
    createdAt: formatterUtil.formatDate(post.createdAt),
    id: post._id.toString(),
  }
}