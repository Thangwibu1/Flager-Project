import { BaseGraphRepo } from '../base.repository.graph';
import { UserNode } from '../../models/user/user.model.neo4j';
import {
    ISendReactRelation,
    SendReactRelation,
} from '../../models/user/send-react-relation.model.neo4j';
import { neo4jInfo } from '../../config/constant.config';
import { PostNode } from '../../models/post/post.model.neo4j';
import * as neo4jConverter from '../../utils/converters/neo4j.converter.util';
import { RequestFriendRelation } from '../../models/user/friend-request-relation.model.neo4j';
import { IsFriendRelation } from '../../models/user/is-friend-relation.model.neo4j';
class UserNodeRepository extends BaseGraphRepo {

    // =========================================== CRUD USER ==========================================

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
        return this.write(async tx => {
            const result = await tx.run(cypher, user);
            const records = result.records;
            if (records.length == 0) return false;
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
        return this.read(async tx => {
            const result = await tx.run(cypher, { id });
            const records = result.records;
            return records.length > 0
                ? UserNode.formatRaw(records[0].get('u'))
                : null;
        });
    }

    // =========================================== END CRUD USER =========================================

    // =============================== USER _REQUEST_FRIEND_ USER ========================================
    /**
     * Tạo quan hệ request friend user1(fromId) và user2(toId)
     * @param fromId
     * @param toId
     * @param data
     * @returns
     */
    createRequestFriend = async (
        fromId: string,
        toId: string,
        data: { createdAt: Date }
    ) => {
        const cypher = `
        MATCH (u1:${neo4jInfo.node.user} { id: $fromId })
        MATCH (u2:${neo4jInfo.node.user} { id: $toId })
        MERGE (u1)-[r:${neo4jInfo.rel.user.requestFriend}]->(u2)
        ON CREATE SET r.createdAt = $createdAt
        RETURN r
      `;
        return this.write(async tx => {
            const result = await tx.run(cypher, {
                fromId,
                toId,
                createdAt: neo4jConverter.toNeo4jDate(data.createdAt),
            });
            const record = result.records[0];
            return record
                ? RequestFriendRelation.formatRaw(record.get('r'))
                : null;
        });
    };

    /**
     * Hàm giúp query kiểm tra userA(fromId) có quan hệ REQUEST_FRIEND với userB(toId) không
     * @param checkId
     * @param withId
     * @returns
     */
    isRequestFriend = async (fromId: string, toId: string) => {
        const cypher = `
      MATCH (u1:${neo4jInfo.node.user} {id: $fromId}) -[r:${neo4jInfo.rel.user.requestFriend}]-> (u2:${neo4jInfo.node.user} { id: $toId })
      RETURN r
    `;
        return this.read(async tx => {
            const result = await tx.run(cypher, { fromId, toId });
            const record = result.records[0];
            return record && record.get('r') ? true : false;
        });
    };
    /**
     * Xóa cạnh request friend từ user1 -> user2
     * @param fromId
     * @param toId
     * @returns
     */
    deleteRequestFriend = async (fromId: string, toId: string) => {
        const cypher = `
      MATCH (u1:User) -[r:${neo4jInfo.rel.user.requestFriend}]-> (u2:User)
      WHERE u1.id = $fromId AND u2.id = $toId
      DELETE r
    `;
        return this.write(async tx => {
            const result = await tx.run(cypher, { fromId, toId });
            // thông tin phần update sẽ chứa trong result.summary.counters.updates() khi sài delete phải vào đây để lấy info
            const cntDelete =
                result.summary.counters.updates().relationshipsDeleted;
            return cntDelete == 0 ? false : true;
        });
    };
    // =============================== END USER _REQUEST_FRIEND_ USER =======================================

    // =============================== USER _IS_FRIEND_ USER ================================================
    /**
     * Tạo quan hệ giữa user1(fromId) và user2(toId)
     * @param fromId
     * @param toId
     * @param data
     * @returns
     */
    createIsFriendTwoEdges = async (
        fromId: string,
        toId: string,
        data: { createdAt: Date }
    ) => {
        const cypher = `
          MATCH (u1:User) WHERE u1.id = $fromId
          MATCH (u2:User) WHERE u2.id = $toId
    
          MERGE (u1)-[r1:${neo4jInfo.rel.user.isFriend}]->(u2)
          ON CREATE SET r.createdAt = $createdAt
          MERGE (u2)-[r2:${neo4jInfo.rel.user.isFriend}]->(u1)
          ON CREATE SET r2.createdAt = $createdAt
          RETURN r1, r2
        `;
        return this.write(async tx => {
            const result = await tx.run(cypher, {
                fromId,
                toId,
                createdAt: neo4jConverter.toNeo4jDate(data.createdAt),
            });
            const record = result.records[0];
            const r = record.get('r1');
            return record && record.get('r1') && record.get('r2')
                ? IsFriendRelation.formatRaw(r)
                : null;
        });
    };
    /**
     * Hàm kiểm tra có tồn tại quan hệ IS_FRIEND giữ 2 node không
     * @param fromId
     * @param toId
     * @returns
     */
    areFriends = async (fromId: string, toId: string): Promise<boolean> => {
        const cypher = `
          MATCH (u1:${neo4jInfo.node.user} {id: $fromId})
          MATCH (u2:${neo4jInfo.node.user} {id: $toId})
          RETURN exists((u1)-[:${neo4jInfo.rel.user.isFriend}]->(u2)) as isExist
        `;
        return this.read(async tx => {
            const result = await tx.run(cypher, { fromId, toId });
            // nếu không có record tức 1 trong 2 MATCH không ra node nên record không chứa gì
            const record = result.records[0];
            return record ? (record.get('isExist') as boolean) : false;
        });
    };

    deleteIsFriendTwoEdges = async (fromId: string, toId: string) => {
        const cypher = `
            MATCH (u1:${neo4jInfo.node.user} {id: $fromId})-[r:${neo4jInfo.rel.user.isFriend}]-(u2:${neo4jInfo.node.user} {id: $toId})
            DELETE r
        `;
        return this.write(async tx => {
            const result = await tx.run(cypher, { fromId, toId });
            const cntDelete =
                result.summary.counters.updates().relationshipsDeleted;
            console.log('>>>cntDelete', cntDelete);
            return cntDelete == 2 ? true : false;
        });
    };

    /**
     * Hàm giúp đếm số lượng bạn bè của user1 nếu theo mẫu user1->user2: tức count số lượng user2 
     * @param userId 
     * @returns 
     */
    countUserIsFriendOf = async (userId: string): Promise<number> => {
        const cypher = `
                MATCH (u:${neo4jInfo.node.user} {id: $userId})-[r:${neo4jInfo.rel.user.isFriend}]->(u2:${neo4jInfo.node.user})
                RETURN COUNT(r) as total_friends
            `;
        return this.read(async tx => {
            const result = await tx.run(cypher, { userId });
            const record = result.records[0];
            return neo4jConverter.toPureNumber(record.get('total_friends'));
        });
    };
    // =============================== END USER _IS_FRIEND_ USER ============================================

    // =============================== USER _REACT_ POST ====================================================

    createSendReactRelationToPost = async (
        userId: string,
        postId: string,
        data: ISendReactRelation
    ) => {
        const cypher = `
      MATCH ( u: ${neo4jInfo.node.user} { id: $userId })
      MATCH ( p: ${neo4jInfo.node.post} { id: $postId } )
      MERGE (u)-[r: ${neo4jInfo.rel.post.react}]->(p)
      ON CREATE SET r.name = $name
      RETURN r;
    `;
        return this.write(async tx => {
            const result = await tx.run(cypher, {
                userId,
                postId,
                name: data.name,
            });
            const record = result.records[0];
            if (!record) return null;
            return SendReactRelation.formatRaw(record.get('r'));
        });
    };
    getSendReactToPostRelation = async (userId: string, postId: string) => {
        const cypher = `
      MATCH ( u: ${neo4jInfo.node.user} { id: $userId }) -[r: ${neo4jInfo.rel.post.react}]-> ( p: ${neo4jInfo.node.post} { id: $postId } )
      RETURN p, r;
    `;
        return this.read(async tx => {
            const result = await tx.run(cypher, { userId, postId });
            const record = result.records[0];
            return record
                ? {
                      data: SendReactRelation.formatRaw(record.get('r')),
                      toPost: PostNode.formatRaw(record.get('p')),
                  }
                : null;
        });
    };
    updateSendReactRelationByReactName = async (
        userId: string,
        postId: string,
        data: { reactName: string }
    ) => {
        const cypher = `
      MATCH ( u: ${neo4jInfo.node.user} { id: $userId }) -[r: ${neo4jInfo.rel.post.react}]-> ( p: ${neo4jInfo.node.post} { id: $postId } )
      SET r.name = $name
      RETURN r;
    `;
        return this.write(async tx => {
            const result = await tx.run(cypher, {
                userId,
                postId,
                name: data.reactName,
            });
            const record = result.records[0];
            if (!record) return null;
            return SendReactRelation.formatRaw(record.get('r'));
        });
    };

    // =============================== END USER send react to POST =========================================
}
export default new UserNodeRepository();