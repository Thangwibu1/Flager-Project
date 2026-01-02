/**
 * GroupChat Types
 * Match với backend GroupChat model
 */

export interface GroupChat {
    _id: string;
    name: string;
    avatar?: string;
    type: 'groupChat' | 'privateChat';
    admin?: string;
    members?: string[];
    lastMessageAt?: Date;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date | null;
}

/**
 * API Response Types
 */
export interface GetGroupChatsResponse {
    success: boolean;
    message: string;
    data: {
        groupChats: GroupChat[];
    };
}

export interface GetGroupChatResponse {
    success: boolean;
    message: string;
    data: {
        groupChat: GroupChat;
    };
}

/**
 * Create GroupChat Data
 */
export interface CreateGroupChatData {
    name: string;
    avatar?: string;
    type: 'groupChat' | 'privateChat';
    friendId?: string;
}
