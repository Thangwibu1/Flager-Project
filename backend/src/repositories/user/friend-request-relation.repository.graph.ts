import { neo4jInfo } from '../../config/constant.config';
import { FriendRequestRelation } from '../../models/user/friend-request-relation.model.neo4j';
import { BaseGraphRepo } from '../base.repository.graph';
import * as neo4jConverter from '../../utils/converters/neo4j.converter.util';
class FriendRequestRelationRepository extends BaseGraphRepo {
    private from = 'n1';
    private to = 'n2';
    private rel = 'r';
    private joinKey = () => {
        return this.from + ',' + this.rel + ',' + this.to;
    };
    /**
     * Tạo quan hệ giữa user1(fromId) và user2(toId)
     * @param fromId
     * @param toId
     * @param data
     * @returns
     */
    create = async (
        fromId: string,
        toId: string,
        data: { createdAt: Date }
    ) => {
        const cypher = `
      MATCH (${this.from}:User) WHERE ${this.from}.id = $fromId
      MATCH (${this.to}:User) WHERE ${this.to}.id = $toId
      MERGE (${this.from})-[${this.rel}:${
            neo4jInfo.rel.user.requestFriend
        }]->(${this.to})
      ON CREATE SET ${this.rel}.createdAt = $createdAt
      RETURN ${this.joinKey()}
    `;
        return this.write(async tx => {
            const result = await tx.run(cypher, {
                fromId,
                toId,
                createdAt: neo4jConverter.toNeo4jDate(data.createdAt),
            });
            const record = result.records[0];
            return record
                ? FriendRequestRelation.formatRaw(record, {
                      fromNode: this.from,
                      relation: this.rel,
                      toNode: this.to,
                  })
                : null;
        });
    };
    /**
     * Hàm giúp query kiểm tra userA(fromId) có quan hệ REQUEST_FRIEND với userB(toId) không
     * @param checkId
     * @param withId
     * @returns
     */
    isHaveRelationWith = async (fromId: string, toId: string) => {
        const cypher = `
      MATCH (${this.from}:User) -[${this.rel}:${
            neo4jInfo.rel.user.requestFriend
        }]-> (${this.to}:User)
      WHERE ${this.from}.id = $fromId AND ${this.to}.id = $toId
      RETURN ${this.joinKey()}
    `;
        return this.read(async tx => {
            const result = await tx.run(cypher, { fromId, toId });
            const record = result.records[0];
            return record ? true : false;
        });
    };
    /**
     * Hàm giúp xóa relationship của 2 node
     * @param fromId
     * @param toId
     * @returns
     */
    deleteByFromIdAndToId = async (fromId: string, toId: string) => {
        const cypher = `
      MATCH (${this.from}:User) -[${this.rel}:${neo4jInfo.rel.user.requestFriend}]-> (${this.to}:User)
      WHERE ${this.from}.id = $fromId AND ${this.to}.id = $toId
      DELETE ${this.rel}
    `;
        return this.write(async tx => {
            const result = await tx.run(cypher, { fromId, toId });
            // thông tin phần update sẽ chứa trong result.summary.counters.updates() khi sài delete phải vào đây để lấy info
            const cntDelete = result.summary.counters.updates().relationshipsDeleted;
            return cntDelete == 0 ? false : true;
        });
    };
}

export default new FriendRequestRelationRepository();
