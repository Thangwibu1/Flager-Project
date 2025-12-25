import { BaseGraphRepo } from '../base.repository.graph';
import { GroupChatNode } from '../../models/groupChat/group-chat.model.neo4j';
import * as neo4jConverter from '../../utils/converters/neo4j.converter.util';
import { neo4jInfo } from '../../config/constant.config';
import { UserNode } from '../../models/user/user.model.neo4j';

class GroupChatNodeRepository extends BaseGraphRepo {
    /**
     * Tạo GroupChat node với logic khác nhau tùy theo type:
     * - type === 'groupChat': Tạo CẢ 2 edges IS_ADMIN và IS_IN cho admin
     * - type === 'privateChat': Chỉ tạo edge IS_IN cho creator (KHÔNG có admin)
     * @param creatorId - ID của user tạo group chat
     * @param groupChat - Thông tin group chat
     * @returns group chat id hoặc null
     */
    async createNodeWithAdmin(
        creatorId: string,
        groupChat: {
            id: string;
            name: string;
            avatar?: string;
            type: 'groupChat' | 'privateChat';
            lastMessageAt?: Date;
        }
    ) {
        const cypher = `
      MATCH (u:${neo4jInfo.node.user} {id: $creatorId})
      CREATE (g:${neo4jInfo.node.groupChat} {
        id: $id,
        name: $name,
        avatar: $avatar,
        type: $type,
        lastMessageAt: $lastMessageAt
      })
      ${
          groupChat.type === 'groupChat'
              ? `CREATE (u)-[:${neo4jInfo.rel.user.isAdmin}]->(g)
      CREATE (u)-[:${neo4jInfo.rel.user.isIn}]->(g)`
              : `CREATE (u)-[:${neo4jInfo.rel.user.isIn}]->(g)`
      }
      RETURN g
    `;
        return this.write(async tx => {
            const result = await tx.run(cypher, {
                creatorId,
                id: groupChat.id,
                name: groupChat.name,
                avatar: groupChat.avatar || null,
                type: groupChat.type,
                lastMessageAt: groupChat.lastMessageAt
                    ? neo4jConverter.toNeo4jDate(groupChat.lastMessageAt)
                    : null,
            });
            const record = result.records[0].get('g');
            return record ? record.id : null;
        });
    }

    /**
     * Thêm member vào GroupChat với edge IS_IN
     * - Tạo edge IS_IN từ User đến GroupChat
     * @param userId - ID của user được thêm vào
     * @param groupChatId - ID của group chat
     * @returns return node user hoặc null
     */
    async addMember(userId: string, groupChatId: string, adderId?: string) {
        const cypher = `
      MATCH (u:${neo4jInfo.node.user} {id: $userId})
      MATCH (g:${neo4jInfo.node.groupChat} {id: $groupChatId})
      MERGE (u)-[r:${neo4jInfo.rel.user.isIn}]->(g)
      FOREACH (ignoreMe IN CASE WHEN $adderId IS NOT NULL THEN [1] ELSE [] END |
        SET r.addBy = $adderId
      )
      RETURN u, g
    `;

        return this.write(async tx => {
            const result = await tx.run(cypher, {
                userId,
                groupChatId,
                adderId: adderId || null, // Chuyển undefined thành null cho Neo4j
            });

            // Kiểm tra xem có record trả về không trước khi get
            if (result.records.length === 0) return null;

            const record = result.records[0].get('u');
            return record ? UserNode.formatRaw(record) : null;
        });
    }

    /**
     * Xóa member khỏi GroupChat (xóa edge IS_IN)
     * @param userId - ID của user cần xóa
     * @param groupChatId - ID của group chat
     * @returns
     */
    async removeMember(userId: string, groupChatId: string) {
        const cypher = `
      MATCH (u:${neo4jInfo.node.user} {id: $userId})-[r:${neo4jInfo.rel.user.isIn}]->(g:${neo4jInfo.node.groupChat} {id: $groupChatId})
      DELETE r
    `;
        return this.write(async tx => {
            const result = await tx.run(cypher, { userId, groupChatId });
            const cntDelete =
                result.summary.counters.updates().relationshipsDeleted;
            return cntDelete == 0 ? false : true;
        });
    }

    /**
     * Tìm GroupChat node theo id
     * @param id
     * @returns
     */
    async findById(id: string) {
        const cypher = `
      MATCH (g:GroupChat {id: $id})
      RETURN g
    `;
        return this.read(async tx => {
            const result = await tx.run(cypher, { id });
            const records = result.records;
            return records.length > 0
                ? GroupChatNode.formatRaw(records[0].get('g'))
                : null;
        });
    }

    /**
     * Cập nhật thông tin GroupChat node
     * @param id
     * @param data
     * @returns
     */
    async updateById(
        id: string,
        data: {
            name?: string;
            lastMessageAt?: Date;
        }
    ) {
        const updateFields: string[] = [];
        const params: any = { id };

        if (data.name !== undefined) {
            updateFields.push('g.name = $name');
            params.name = data.name;
        }
        if (data.lastMessageAt !== undefined) {
            updateFields.push('g.lastMessageAt = $lastMessageAt');
            params.lastMessageAt = neo4jConverter.toNeo4jDate(
                data.lastMessageAt
            );
        }

        if (updateFields.length === 0) return false;

        const cypher = `
      MATCH (g:GroupChat {id: $id})
      SET ${updateFields.join(', ')}
      RETURN g
    `;

        return this.write(async tx => {
            const result = await tx.run(cypher, params);
            const records = result.records;
            return records.length > 0 ? true : false;
        });
    }

    /**
     * Xóa GroupChat node và tất cả relationships liên quan
     * @param id
     * @returns
     */
    async deleteById(id: string) {
        const cypher = `
      MATCH (g:GroupChat {id: $id})
      DETACH DELETE g
    `;
        return this.write(async tx => {
            const result = await tx.run(cypher, { id });
            const cntDelete = result.summary.counters.updates().nodesDeleted;
            return cntDelete == 0 ? false : true;
        });
    }
}

export default new GroupChatNodeRepository();
