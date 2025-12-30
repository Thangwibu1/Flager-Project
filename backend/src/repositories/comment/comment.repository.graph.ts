import { neo4jInfo } from "../../config/constant.config";
import { BaseGraphRepo } from "../base.repository.graph";

class CommentNodeRepository extends BaseGraphRepo{
  // ====================== CRUD WITH NODE COMMENT ===============================================
  createNode = async (commentId: string) => {
    const params = {
      id: commentId,
    }
    const cypher = `
      CREATE (c: ${neo4jInfo.node.comment} { id: $id })
      RETURN c 
    `;
    return this.write(async (tx) => {
      await tx.run(cypher, params);
    });
  }
  // ====================== CRUD WITH NODE COMMENT ===============================================
}

export default new CommentNodeRepository();