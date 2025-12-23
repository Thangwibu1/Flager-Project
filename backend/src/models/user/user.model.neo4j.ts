import type { Node } from "neo4j-driver";

export class UserGraph {
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
  static fromNeo4j(node: Node): UserGraph {
    const p = node.properties;
    return new UserGraph({
      id: p.id,
      username: p.username,
      // createdAt: new Date(p.createdAt),
    });
  }
}
