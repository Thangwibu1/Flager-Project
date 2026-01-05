import { ReactName } from "../../config/enum/post.enum";

export interface StandardComment {
  id: string,
  createdAt: string,
  content: string,
  media: string[],
  totalReply: number,
  totalReact: {name: ReactName, total: number}[]
}

export interface ReplyCommandResponse {
  id: string,
  parentId: string,
  replyToId: string | null,
  createdAt: string,
  content: string,
  media: string[],
  totalReact: {name: ReactName, total: number}[]
}