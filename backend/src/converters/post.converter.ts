import { IPostDocument } from "../models/post/Post.model.mongo";
import { PostCreateResponse, StandardPostResponse } from "../types/post/post.response";
import * as formatterUtil from '../utils/formatter.util';

export const toPostCreate = (post: IPostDocument): PostCreateResponse => {
  return {
    content: post.content,
    media: post.media || [],
    createdAt: formatterUtil.formatDate(post.createdAt),
    id: post._id.toString(),
    viewType: post.viewType
  }
}

export const toStandardPost = (post: IPostDocument): StandardPostResponse => {
  post.totalReact.map((item) => {
    return {name: item.count, count: item.count}
  }).sort((a, b) => (a.count > b.count) ? -1 : 1);
  return {
    content: post.content,
    media: post.media || [],
    viewType: post.viewType,
    totalComment: post.totalComment,
    totalShare: post.totalShare,
    authorId: post.authorId.toString(),
    totalReact: post.totalReact,
    createdAt: formatterUtil.formatDate(post.createdAt),
    id: post._id.toString(),
  }
}