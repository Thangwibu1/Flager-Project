import type { Node } from 'neo4j-driver';

export class GroupChatNode {
    readonly id: string;
    readonly name: string;
    readonly type: 'groupChat' | 'privateChat';
    readonly lastMessageAt?: Date;

    constructor(groupChat: {
        id: string;
        name: string;
        type: 'groupChat' | 'privateChat';
        lastMessageAt?: Date;
    }) {
        this.id = groupChat.id;
        this.name = groupChat.name;
        this.type = groupChat.type;
        this.lastMessageAt = groupChat.lastMessageAt;
    }

    static formatRaw(node: Node): GroupChatNode {
        const p = node.properties;
        return new GroupChatNode({
            id: p.id,
            name: p.name,
            type: p.type,
            lastMessageAt: p.lastMessageAt
                ? new Date(p.lastMessageAt)
                : undefined,
        });
    }
}
