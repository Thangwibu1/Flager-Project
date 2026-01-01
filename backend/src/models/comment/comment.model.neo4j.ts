import { Node } from "neo4j-driver";

export class CommentNode {
  public id: string;
  constructor(comment: {id: string}){
    this.id = comment.id;
  }
  static formatRaw(node: Node): CommentNode {
    const p = node.properties;
    return new CommentNode({
      id: p.id
    });
  }
}