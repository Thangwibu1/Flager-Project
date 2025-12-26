import { BaseGraphRepo } from "../base.repository.graph"; 
import { UserNode } from "../../models/user/user.model.neo4j"; 
import { ISendReactRelation, SendReactRelation } from "../../models/user/send-react-relation.model.neo4j";
import { neo4jInfo } from "../../config/constant.config";
import { toNeo4jDate } from "../../utils/converters/neo4j.converter.util";
import { PostNode } from "../../models/post/post.model.neo4j";

class UserNodeRepository extends BaseGraphRepo {
  /**
   * Hàm giúp tạo 1 node User vào db
   * @param user 
   * @returns
   */
  async createNode(user: { id: string; username: string }) {
    const cypher = `
      CREATE (u:User {
        id: $id,
        username: $username
      })
      RETURN u
    `;
    return this.write(async (tx) => {
      const result = await tx.run(cypher, user);
      const records = result.records;
      if(records.length == 0) return false;
      return true;
    });
  }
  /**
   * Hàm giúp tìm user theo id và tự động map về đúng type định nghĩ trong User model
   * @param id 
   * @returns 
   */
  async findById(id: string) {
    const cypher = `
      MATCH (u:User {id: $id})
      RETURN u
    `;
    return this.read(async (tx) => {
      const result = await tx.run(cypher, {id});
      const records = result.records;
      return records.length > 0 ? UserNode.formatRaw(records[0].get('u')) : null;
    })
  }
  createSendReactRelationToPost = async (userId: string, postId: string, data: ISendReactRelation) => {
    const cypher = `
      MATCH ( u: ${neo4jInfo.node.user} { id: $userId })
      MATCH ( p: ${neo4jInfo.node.post} { id: $postId } )
      MERGE (u)-[r: ${neo4jInfo.rel.post.react}]->(p)
      ON CREATE SET r.name = $name
      RETURN r;
    `;
    return this.write(async (tx) => {
      const result = await tx.run(cypher, {userId, postId, name: data.name});
      const record = result.records[0];
      if(!record) return null;
      return SendReactRelation.formatRaw(record.get('r'));
    });
  }
  getSendReactToPostRelation = async (userId: string, postId: string) => {
    const cypher = `
      MATCH ( u: ${neo4jInfo.node.user} { id: $userId }) -[r: ${neo4jInfo.rel.post.react}]-> ( p: ${neo4jInfo.node.post} { id: $postId } )
      RETURN p, r;
    `;
    return this.read(async (tx) => {
      const result = await tx.run(cypher, {userId, postId } );
      const record = result.records[0];
      return record ? {
        data: SendReactRelation.formatRaw(record.get('r')),
        toPost: PostNode.formatRaw(record.get('p')),
      } : null;
    });
  }
  updateSendReactRelationByReactName = async (userId: string, postId: string, data: {reactName: string}) => {
    const cypher = `
      MATCH ( u: ${neo4jInfo.node.user} { id: $userId }) -[r: ${neo4jInfo.rel.post.react}]-> ( p: ${neo4jInfo.node.post} { id: $postId } )
      SET r.name = $name
      RETURN r;
    `;
    return this.write(async (tx) => {
      const result = await tx.run(cypher, {userId, postId, name: data.reactName});
      const record = result.records[0];
      if(!record) return null;
      return SendReactRelation.formatRaw(record.get('r'));
    });
  }
}
export default new UserNodeRepository();