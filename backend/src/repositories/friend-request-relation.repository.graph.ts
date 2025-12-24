import { FriendRequestRelation } from "../models/user/friend-request-relation.model.neo4j"; 
import { BaseGraphRepo } from "./base.repository.graph";

class FriendRequestRelationRepo extends BaseGraphRepo {
  private from = "n1";
  private to = "n2";
  private rel = "r";
  private joinKey = () => {
    return this.from + "," + this.rel + "," + this.to;
  }
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
      MERGE (${this.from})-[${this.rel}:REQUEST_FRIEND {createdAt: $createdAt}]->(${this.to})
      RETURN ${this.joinKey()}
    `;
    return this.write(async (tx) => {
      const result = await tx.run(cypher, {fromId, toId, createdAt: data.createdAt.getDate()});
      const record = result.records[0];
      return record ? FriendRequestRelation.formatRaw(record, {fromNode: this.from, relation: this.rel, toNode: this.to}) : null;
    });
  };
  /**
   * Hàm giúp query kiểm tra userA(checkId) có quan hệ REQUEST_FRIEND với userB(withId) không 
   * @param checkId 
   * @param withId 
   * @returns 
   */
  isHaveRelationWith = async (checkId: string, withId: string) => {
    const cypher = `
      MATCH (${this.from}:User) -[${this.rel}:REQUEST_FRIEND]-> (${this.to}:User)
      WHERE ${this.from}.id = $checkId AND ${this.to}.id = $withId
      RETURN ${this.joinKey()}
    `;
    return this.read(async (tx) => {
      const result = await tx.run(cypher, {checkId, withId});
      const record = result.records[0];
      return record ? true : false;
    })
  }
}

export default new FriendRequestRelationRepo();
