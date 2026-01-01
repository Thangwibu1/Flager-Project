/**
 * Socket.IO Event Constants
 * Sử dụng constants thay vì hardcoded strings để tránh typo và dễ maintain
 */

export const SOCKET_EVENTS = {
    // ===== Connection Events =====
    CONNECT: 'connect',
    DISCONNECT: 'disconnect',
    ERROR: 'error',

    // ===== Message Events (Client → Server) =====
    CREATE_MESSAGE: 'create_message',
    UPDATE_MESSAGE: 'update_message',
    DELETE_MESSAGE: 'delete_message',
    MARK_AS_READ: 'mark_as_read',

    // ===== Reaction Events (Client → Server) =====
    ADD_REACTION: 'add_reaction',
    REMOVE_REACTION: 'remove_reaction',

    // ===== Room Events (Client → Server) =====
    JOIN_GROUP_CHAT: 'join_group_chat',
    LEAVE_GROUP_CHAT: 'leave_group_chat',

    // ===== Typing Events (Client → Server) =====
    TYPING: 'typing',

    // ===== Message Events (Server → Client) =====
    NEW_MESSAGE: 'new_message',
    MESSAGE_UPDATED: 'message_updated',
    MESSAGE_DELETED: 'message_deleted',
    MESSAGE_READ: 'message_read',

    // ===== Reaction Events (Server → Client) =====
    REACTION_ADDED: 'reaction_added',
    REACTION_REMOVED: 'reaction_removed',

    // ===== Typing Events (Server → Client) =====
    USER_TYPING: 'user_typing',

    // ===== Acknowledgment Events (Server → Client) =====
    MESSAGE_CREATED: 'message_created',
    JOINED_GROUP_CHAT: 'joined_group_chat',

    // ===== Notifications =====
    NEW_NOTIFICATION: 'new_notification',

    // ===== Presence =====
    USER_ONLINE: 'user_online',
    USER_OFFLINE: 'user_offline',
} as const;

export type SocketEvent = (typeof SOCKET_EVENTS)[keyof typeof SOCKET_EVENTS];
