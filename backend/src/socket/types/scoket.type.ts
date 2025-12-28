import { Socket } from 'socket.io';

// authenticated socket type
export interface AuthenticatedSocket extends Socket {
    data: {
        user: {
            userId: string;
            email: string;
            username: string;
            avatar: string;
        };
    };
}

// data when join chat
export interface JoinChatData {
    groupChatId: string;
}

// data when sending message
export interface SendMessageData {
    groupChatId: string;
    content: string;
    type: 'text' | 'image' | 'video' | 'file';
    metadata?: any;
}

// data when typing
export interface TypingData {
    groupChatId: string;
}

//data message boradcast
export interface MessageBroadcastData {
    groupChatId: string;
    messageId: string;
    senderId: string;
    senderName: string;
    content: string;
    type: 'text' | 'image' | 'video' | 'file';
    metadata?: any;
    createdAt: Date;
}
