import type { Node } from "neo4j-driver";

export class UserNode {
  readonly username: string;
  readonly id: string;
  readonly avatar: string;
  constructor(
    user: {id: string, username: string, avatar: string}
  ) {
    this.id = user.id;
    this.username = user.username;
    this.avatar = user.avatar;
  }
  static formatRaw(node: Node): UserNode {
    const p = node.properties;
    return new UserNode({
      id: p.id,
      username: p.username,
      avatar: p.avatar || '',
    });
  }
}
