import { neo4jInfo } from "../../config/constant.config";
import { BaseGraphRepo } from "../base.repository.graph";
import * as neo4jConverter from '../../utils/converters/neo4j.converter.util';
import { IsFriendRelation } from "../../models/user/is-friend-relation.model.neo4j";
class IsFriendRelationRepository extends BaseGraphRepo{
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
    createTwoEdge = async (
        fromId: string,
        toId: string,
        data: { createdAt: Date }
    ) => {
        const cypher = `
      MATCH (${this.from}:User) WHERE ${this.from}.id = $fromId
      MATCH (${this.to}:User) WHERE ${this.to}.id = $toId

      MERGE (${this.from})-[${this.rel}:${
            neo4jInfo.rel.user.isFriend
        }]->(${this.to})
      ON CREATE SET ${this.rel}.createdAt = $createdAt
      MERGE (${this.to})-[r2:${
            neo4jInfo.rel.user.isFriend
        }]->(${this.from})
      ON CREATE SET r2.createdAt = $createdAt
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
                ? IsFriendRelation.formatRaw(record, {
                      fromNode: this.from,
                      relation: this.rel,
                      toNode: this.to,
                  })
                : null;
        });
    };
    isHaveRelationWith = async (fromId: string, toId: string): Promise<boolean> => {
      const cypher = `
      MATCH (${this.from}:${neo4jInfo.node.user} {id: $fromId})
      MATCH (${this.to}:${neo4jInfo.node.user} {id: $toId})
      RETURN exists((${this.from})-[:${neo4jInfo.rel.user.isFriend}]->(${this.to})) as isExist
    `;
        return this.read(async tx => {
            const result = await tx.run(cypher, { fromId, toId });
            // nếu không có record tức 1 trong 2 MATCH không ra node nên record không chứa gì
            const record = result.records[0];
            return record ? record.get('isExist') as boolean : false; 
        });
    }
    deleteByFromIdAndToId = async (fromId: string, toId: string) => {
        const cypher = `
            MATCH (${this.from}:${neo4jInfo.node.user} {id: $fromId})-[${this.rel}:${neo4jInfo.rel.user.isFriend}]->(${this.to}:${neo4jInfo.node.user} {id: $toId})
            DELETE ${this.rel}
        `
        return this.write(async (tx) => {
            const result = await tx.run(cypher, {fromId, toId});
            const cntDelete = result.summary.counters.updates().relationshipsDeleted;
            return cntDelete == 0 ? false : true;
        });
    }
    countByUserId = async (userId: string): Promise<number> => {
        const cypher = `
            MATCH (${this.from}:${neo4jInfo.node.user} {id: $userId})-[${this.rel}:${neo4jInfo.rel.user.isFriend}]->(${this.to}:${neo4jInfo.node.user})
            RETURN COUNT(${this.rel}) as total_friends
        `;
        return this.read(async (tx) => {
            const result = await tx.run(cypher, {userId});
            const record = result.records[0];
            return neo4jConverter.toPureNumber(record.get('total_friends'));
        })
    }
}

export default new IsFriendRelationRepository();
