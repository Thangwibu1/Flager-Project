import type { Node } from "neo4j-driver";

export class UserNode {
  readonly username: string;
  readonly id: string;
  // readonly createdAt: Date;
  constructor(
    user: {id: string, username: string}
  ) {
    this.id = user.id;
    this.username = user.username;
    // this.createdAt = props.createdAt;
  }
  static formatRaw(node: Node): UserNode {
    const p = node.properties;
    return new UserNode({
      id: p.id,
      username: p.username,
      // createdAt: new Date(p.createdAt),
    });
  }
}
