import { IsFriendRelation } from "../models/user/is-friend-relation.model.neo4j"
import { UserNode } from "../models/user/user.model.neo4j"
import { StandardFriendResponse } from "../types/friend/friend.response"
import { formatDate } from "../utils/formatter.util"

export const toGetFriendList = (data: {
  node: UserNode,
  rel: IsFriendRelation,
}): StandardFriendResponse => {
  return {
    avatar: data.node.avatar,
    createdAt: formatDate(data.rel.createdAt),
    id: data.node.id,
    username: data.node.username,
  }
}