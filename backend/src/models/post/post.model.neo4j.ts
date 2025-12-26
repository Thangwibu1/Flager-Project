import { Node } from "neo4j-driver";

export class PostNode {
  public id: string;
  public authorId: string;
  constructor(post: {id: string, authorId: string}){
    this.id = post.id;
    this.authorId = post.authorId;
  }
  static formatRaw(node: Node): PostNode {
    const p = node.properties;
    return new PostNode({
      id: p.id,
      authorId: p.authorId
    });
  }
}