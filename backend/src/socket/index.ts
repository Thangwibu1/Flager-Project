import { Server, Socket } from 'socket.io';
import { socketAuthMiddleware } from './middlewares/auth.middleware';
import { messageHandlers } from './handlers/message.handler';
import { SOCKET_EVENTS } from '../shared/constants/socket-events.constants';

/**
 * Setup Socket.IO server với tất cả handlers và middlewares
 * @param io - Socket.IO Server instance
 */
export const setupSocket = (io: Server) => {
    // Auth middleware
    io.use(socketAuthMiddleware);

    // Connection Handler
    io.on(SOCKET_EVENTS.CONNECT, (socket: Socket) => {
        const user = (socket as any).data.user;
        console.log(`✅ User connected: ${user.username} (${socket.id})`);

        // Register Message Events
        socket.on(
            SOCKET_EVENTS.CREATE_MESSAGE,
            messageHandlers[SOCKET_EVENTS.CREATE_MESSAGE]
        );
        socket.on(
            SOCKET_EVENTS.UPDATE_MESSAGE,
            messageHandlers[SOCKET_EVENTS.UPDATE_MESSAGE]
        );
        socket.on(
            SOCKET_EVENTS.DELETE_MESSAGE,
            messageHandlers[SOCKET_EVENTS.DELETE_MESSAGE]
        );

        // Register Reaction Events
        socket.on(
            SOCKET_EVENTS.ADD_REACTION,
            messageHandlers[SOCKET_EVENTS.ADD_REACTION]
        );
        socket.on(
            SOCKET_EVENTS.REMOVE_REACTION,
            messageHandlers[SOCKET_EVENTS.REMOVE_REACTION]
        );

        // Register Read Status Events
        socket.on(
            SOCKET_EVENTS.MARK_AS_READ,
            messageHandlers[SOCKET_EVENTS.MARK_AS_READ]
        );

        // Register Room Events
        socket.on(
            SOCKET_EVENTS.JOIN_GROUP_CHAT,
            messageHandlers[SOCKET_EVENTS.JOIN_GROUP_CHAT]
        );
        socket.on(
            SOCKET_EVENTS.LEAVE_GROUP_CHAT,
            messageHandlers[SOCKET_EVENTS.LEAVE_GROUP_CHAT]
        );

        // ===== Register Typing Events =====
        socket.on(SOCKET_EVENTS.TYPING, messageHandlers[SOCKET_EVENTS.TYPING]);

        // ===== Disconnect Handler =====
        socket.on(SOCKET_EVENTS.DISCONNECT, () => {
            console.log(
                `❌ User disconnected: ${user.username} (${socket.id})`
            );
            // Socket.IO tự động remove socket khỏi tất cả rooms khi disconnect
        });

        // ===== Error Handler =====
        socket.on(SOCKET_EVENTS.ERROR, error => {
            console.error(`🔴 Socket error for ${user.username}:`, error);
        });
    });

    console.log('🔌 Socket.IO setup completed');
};
