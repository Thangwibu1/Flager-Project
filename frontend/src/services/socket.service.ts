import { io, Socket } from 'socket.io-client';
import { SOCKET_EVENTS } from '../shared/constants/socket-events.constants';

/**
 * Socket.IO Service - Singleton Pattern
 * Quản lý Socket.IO connection và provide methods để emit/listen events
 */
class SocketService {
    public socket: Socket | null = null;
    private serverUrl: string =
        import.meta.env.VITE_SOCKET_URL || 'http://localhost:5000';

    /**
     * Connect to Socket.IO server với JWT token
     */
    connect(token: string): void {
        if (this.socket?.connected) {
            console.log('⚠️ Socket already connected');
            return;
        }

        this.socket = io(this.serverUrl, {
            auth: { token },
            reconnection: true,
            reconnectionAttempts: 5,
            reconnectionDelay: 1000,
        });

        // Setup basic event listeners
        this.socket.on(SOCKET_EVENTS.CONNECT, () => {
            console.log('✅ Socket connected:', this.socket?.id);
        });

        this.socket.on(SOCKET_EVENTS.DISCONNECT, reason => {
            console.log('❌ Socket disconnected:', reason);
        });

        this.socket.on(SOCKET_EVENTS.ERROR, error => {
            console.error('🔴 Socket error:', error);
        });

        this.socket.on('connect_error', error => {
            console.error('🔴 Connection error:', error.message);
        });
    }

    /**
     * Disconnect from server
     */
    disconnect(): void {
        if (this.socket) {
            this.socket.disconnect();
            this.socket = null;
            console.log('🔌 Socket disconnected manually');
        }
    }

    /**
     * Check if socket is connected
     */
    isConnected(): boolean {
        return this.socket?.connected || false;
    }

    // ===== Emit Events (Client → Server) =====

    /**
     * Join group chat room
     */
    joinGroupChat(
        groupChatId: string,
        callback?: (response: any) => void
    ): void {
        this.socket?.emit(
            SOCKET_EVENTS.JOIN_GROUP_CHAT,
            { groupChatId },
            callback
        );
    }

    /**
     * Leave group chat room
     */
    leaveGroupChat(
        groupChatId: string,
        callback?: (response: any) => void
    ): void {
        this.socket?.emit(
            SOCKET_EVENTS.LEAVE_GROUP_CHAT,
            { groupChatId },
            callback
        );
    }

    /**
     * Create new message
     */
    createMessage(
        data: {
            groupChatId: string;
            content: string;
            type: string;
            replyBy?: string;
            metadata?: any;
        },
        callback?: (response: any) => void
    ): void {
        this.socket?.emit(SOCKET_EVENTS.CREATE_MESSAGE, data, callback);
    }

    /**
     * Update message
     */
    updateMessage(
        data: {
            messageId: string;
            content: string;
        },
        callback?: (response: any) => void
    ): void {
        this.socket?.emit(SOCKET_EVENTS.UPDATE_MESSAGE, data, callback);
    }

    /**
     * Delete message
     */
    deleteMessage(
        data: {
            messageId: string;
        },
        callback?: (response: any) => void
    ): void {
        this.socket?.emit(SOCKET_EVENTS.DELETE_MESSAGE, data, callback);
    }

    /**
     * Add reaction to message
     */
    addReaction(
        data: {
            messageId: string;
            type: string;
        },
        callback?: (response: any) => void
    ): void {
        this.socket?.emit(SOCKET_EVENTS.ADD_REACTION, data, callback);
    }

    /**
     * Remove reaction from message
     */
    removeReaction(
        data: {
            messageId: string;
            reactionId: string;
        },
        callback?: (response: any) => void
    ): void {
        this.socket?.emit(SOCKET_EVENTS.REMOVE_REACTION, data, callback);
    }

    /**
     * Mark message as read
     */
    markAsRead(
        data: {
            messageId: string;
        },
        callback?: (response: any) => void
    ): void {
        this.socket?.emit(SOCKET_EVENTS.MARK_AS_READ, data, callback);
    }

    /**
     * Send typing indicator
     */
    sendTyping(data: { groupChatId: string; isTyping: boolean }): void {
        this.socket?.emit(SOCKET_EVENTS.TYPING, data);
    }

    // ===== Listen Events (Server → Client) =====

    /**
     * Listen for new messages
     */
    onNewMessage(callback: (message: any) => void): void {
        this.socket?.on(SOCKET_EVENTS.NEW_MESSAGE, callback);
    }

    /**
     * Listen for message updates
     */
    onMessageUpdated(callback: (message: any) => void): void {
        this.socket?.on(SOCKET_EVENTS.MESSAGE_UPDATED, callback);
    }

    /**
     * Listen for message deletions
     */
    onMessageDeleted(callback: (data: { messageId: string }) => void): void {
        this.socket?.on(SOCKET_EVENTS.MESSAGE_DELETED, callback);
    }

    /**
     * Listen for message read status
     */
    onMessageRead(
        callback: (data: {
            messageId: string;
            userId: string;
            readAt: Date;
        }) => void
    ): void {
        this.socket?.on(SOCKET_EVENTS.MESSAGE_READ, callback);
    }

    /**
     * Listen for reaction added
     */
    onReactionAdded(
        callback: (data: { messageId: string; reaction: any }) => void
    ): void {
        this.socket?.on(SOCKET_EVENTS.REACTION_ADDED, callback);
    }

    /**
     * Listen for reaction removed
     */
    onReactionRemoved(
        callback: (data: { messageId: string; reactionId: string }) => void
    ): void {
        this.socket?.on(SOCKET_EVENTS.REACTION_REMOVED, callback);
    }

    /**
     * Listen for typing indicators
     */
    onUserTyping(
        callback: (data: {
            userId: string;
            username: string;
            groupChatId: string;
            isTyping: boolean;
        }) => void
    ): void {
        this.socket?.on(SOCKET_EVENTS.USER_TYPING, callback);
    }

    /**
     * Listen for errors
     */
    onError(callback: (error: any) => void): void {
        this.socket?.on(SOCKET_EVENTS.ERROR, callback);
    }

    // ===== Remove Listeners =====

    /**
     * Remove new message listener
     */
    offNewMessage(): void {
        this.socket?.off(SOCKET_EVENTS.NEW_MESSAGE);
    }

    /**
     * Remove message updated listener
     */
    offMessageUpdated(): void {
        this.socket?.off(SOCKET_EVENTS.MESSAGE_UPDATED);
    }

    /**
     * Remove message deleted listener
     */
    offMessageDeleted(): void {
        this.socket?.off(SOCKET_EVENTS.MESSAGE_DELETED);
    }

    /**
     * Remove message read listener
     */
    offMessageRead(): void {
        this.socket?.off(SOCKET_EVENTS.MESSAGE_READ);
    }

    /**
     * Remove reaction added listener
     */
    offReactionAdded(): void {
        this.socket?.off(SOCKET_EVENTS.REACTION_ADDED);
    }

    /**
     * Remove reaction removed listener
     */
    offReactionRemoved(): void {
        this.socket?.off(SOCKET_EVENTS.REACTION_REMOVED);
    }

    /**
     * Remove user typing listener
     */
    offUserTyping(): void {
        this.socket?.off(SOCKET_EVENTS.USER_TYPING);
    }

    /**
     * Remove error listener
     */
    offError(): void {
        this.socket?.off(SOCKET_EVENTS.ERROR);
    }

    /**
     * Remove all listeners
     */
    removeAllListeners(): void {
        this.socket?.removeAllListeners();
    }
}

// Export singleton instance
export default new SocketService();
