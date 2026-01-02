import { neo4jInfo } from "../../config/constant.config";
import { PostNode } from "../../models/post/post.model.neo4j";
import { BaseGraphRepo } from "../base.repository.graph";

class PostNodeRepository extends BaseGraphRepo{
  // ========================== CURD NODE =================================
  create = async (data: {postId: string, authorId: string}) => {
    const {postId, authorId} = data;
    const cypher = `
      CREATE (p: ${neo4jInfo.node.post} {id: $postId, authorId: $authorId })
      RETURN p;
    `;
    return this.write(async (tx) => {
      const result = await tx.run(cypher, {postId, authorId});
      const record = result.records[0];
      return record ? PostNode.formatRaw(record.get('p')) : null;
    });
  }
  deleteNodeById = async (postId: string) => {
    const cypher = `
      MATCH (p: ${neo4jInfo.node.post} {id: $postId })
      DETACH DELETE p;
    `;
    return this.write(async (tx) => {
      await tx.run(cypher, {postId});
    });
  }
  // ========================== END CURD NODE =================================
}

export default new PostNodeRepository();