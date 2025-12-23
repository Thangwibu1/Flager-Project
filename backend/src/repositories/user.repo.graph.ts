import { BaseGraphRepo } from "./base.repo.graph";
import { UserGraph } from "../models/user/user.model.neo4j";

export class UserRepository extends BaseGraphRepo {
  /**
   * Hàm giúp tạo 1 node User vào db
   * @param user 
   * @returns
   */
  async createUser(user: { id: string; username: string }) {
    const cypher = `
      CREATE (u:User {
        id: $id,
        username: $username,
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
      return records.length > 0 ? UserGraph.fromNeo4j(records[0].get('u')) : null;
    })
  }
}
