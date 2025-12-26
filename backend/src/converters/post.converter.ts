import { IPostDocument } from "../models/post/post.model.mongo";
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
  const totalReact = [];
  for (const key in post.totalReact) {
    if(key == '_id') continue;
    if (Object.prototype.hasOwnProperty.call(post.totalReact, key)) {
      const typedKey = key as keyof typeof post.totalReact;
      totalReact.push({
        name: key,
        count: post.totalReact[typedKey],
      });
    }
  }
  totalReact.sort((a, b) => (a.count > b.count) ? -1 : 1);
  return {
    content: post.content,
    media: post.media || [],
    viewType: post.viewType,
    totalComment: post.totalComment,
    totalShare: post.totalShare,
    authorId: post.authorId.toString(),
    totalReact,
    createdAt: formatterUtil.formatDate(post.createdAt),
    id: post._id.toString(),
  }
}