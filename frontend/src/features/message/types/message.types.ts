/**
 * Reaction Types
 * Text-based reaction types (components sẽ map sang icons)
 */
export type ReactionType = 'LIKE' | 'LOVE' | 'HAHA' | 'WOW' | 'SAD' | 'ANGRY';

export interface Reaction {
    _id: string;
    messageId: string;
    userId: string;
    type: ReactionType;
    createdAt: Date;
}

/**
 * Message Types
 */
export interface Message {
    _id: string;
    groupChatId: string;
    senderId: string;
    content: string;
    type: 'text' | 'image' | 'video' | 'file';
    replyBy?: string;
    metadata?: any;
    readBy: string[];
    reactions: Reaction[];
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date | null;

    // Frontend-only fields (for optimistic updates)
    status?: 'sending' | 'sent' | 'failed';
}

/**
 * API Response Types
 */
export interface GetMessagesResponse {
    success: boolean;
    message: string;
    data: {
        messages: Message[];
        hasMore: boolean;
    };
}

/**
 * Socket Event Data Types
 */
export interface CreateMessageData {
    groupChatId: string;
    content: string;
    type: string;
    replyBy?: string;
    metadata?: any;
}

export interface UpdateMessageData {
    messageId: string;
    content: string;
}

export interface DeleteMessageData {
    messageId: string;
}

export interface AddReactionData {
    messageId: string;
    type: ReactionType;
}

export interface RemoveReactionData {
    messageId: string;
    reactionId: string;
}

export interface MarkAsReadData {
    messageId: string;
}

export interface TypingData {
    groupChatId: string;
    isTyping: boolean;
}
