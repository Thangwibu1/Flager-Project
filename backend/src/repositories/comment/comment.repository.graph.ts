import { neo4jInfo } from '../../config/constant.config';
import { ReactName } from '../../config/enum/post.enum';
import { SendReactRelation } from '../../models/comment/send-react-relation.neo4j';
import { BaseGraphRepo } from '../base.repository.graph';

class CommentNodeRepository extends BaseGraphRepo {
    // ====================== CRUD WITH NODE COMMENT ===============================================
    createNode = async (commentId: string) => {
        const params = {
            id: commentId,
        };
        const cypher = `
      CREATE (c: ${neo4jInfo.node.comment} { id: $id })
      RETURN c 
    `;
        return this.write(async tx => {
            await tx.run(cypher, params);
        });
    };

    deleteCommentById = async (commentId: string) => {
        const params = {
            id: commentId,
        };
        const cypher = `
      MATCH (c: ${neo4jInfo.node.comment} { id: $id })
      DETACH DELETE c
    `;
        return this.write(async tx => {
            await tx.run(cypher, params);
        });
    };
    // ====================== CRUD WITH NODE COMMENT ===============================================

    // =============================== USER SEND REACT TO COMMENT =============================================
    /**
     * Hàm giúp tạo quan hệ sendReact giữa user và comment
     * @param userId
     * @param commentId
     * @param data
     * @returns
     */
    createSendReactToComment = async (
        userId: string,
        commentId: string,
        data: { reactName: ReactName }
    ) => {
        const params = {
            userId,
            commentId,
            reactName: data.reactName,
        };
        const cypher = `
              MATCH (u: ${neo4jInfo.node.user} { id: $userId })
              MATCH (c: ${neo4jInfo.node.comment} { id: $commentId})
              MERGE (u)-[r :${neo4jInfo.rel.comment.user_send_react}]->(c)
              ON CREATE SET r.createdAt = timestamp(), r.name = $reactName
          `;
        return this.write(async tx => {
            await tx.run(cypher, params);
        });
    };
    updateSendReactToComment = async (
        userId: string,
        commentId: string,
        data: { reactName: ReactName }
    ) => {
        const params = {
            userId,
            commentId,
            reactName: data.reactName,
        };
        const cypher = `
              MATCH (u: ${neo4jInfo.node.user} { id: $userId }) -[r: ${neo4jInfo.rel.comment.user_send_react} ]-> (c: ${neo4jInfo.node.comment} { id: $commentId})
              SET r.name = $reactName, r.createdAt = timestamp()
          `;
        return this.write(async tx => {
            await tx.run(cypher, params);
        });
    };
    deleteSendReact = async (userId: string, commentId: string) => {
        const params = {
            userId,
            commentId,
        };
        const cypher = `
              MATCH (u: ${neo4jInfo.node.user} { id: $userId }) -[r: ${neo4jInfo.rel.comment.user_send_react}]-> (c: ${neo4jInfo.node.comment} { id: $commentId})
              DELETE r
          `;
        return this.write(async tx => {
            await tx.run(cypher, params);
        });
    };
    /**
     * Hàm giúp lấy ra thông tin quan hệ send_react giữa user và comment
     * @param userId
     * @param commentId
     * @returns
     */
    findSendReactRelation = async (
        userId: string,
        commentId: string
    ): Promise<SendReactRelation | null> => {
        const params = {
            userId,
            commentId,
        };
        const cypher = `
              MATCH (u: ${neo4jInfo.node.user} { id: $userId }) -[r: ${neo4jInfo.rel.comment.user_send_react}]-> (c: ${neo4jInfo.node.comment} { id: $commentId})
              RETURN r
          `;
        return this.read(async tx => {
            const result = await tx.run(cypher, params);
            const record = result.records[0];
            return record ? SendReactRelation.formatRaw(record.get('r')) : null;
        });
    };
    // =============================== USER SEND REACT TO COMMENT =============================================
}

export default new CommentNodeRepository();
