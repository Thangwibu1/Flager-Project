import {
    createContext,
    useContext,
    useEffect,
    useState,
    ReactNode,
} from 'react';
import socketService from '../services/socket.service';
import { useAuthStore } from '../features/auth/store/auth.store';

/**
 * Socket Context Type
 */
interface SocketContextType {
    socket: typeof socketService;
    isConnected: boolean;
}

/**
 * Socket Context
 */
const SocketContext = createContext<SocketContextType | null>(null);

/**
 * Socket Provider Component
 * Wraps app và provide socket instance cho tất cả child components
 */
export const SocketProvider = ({ children }: { children: ReactNode }) => {
    const { accessToken } = useAuthStore();
    const [isConnected, setIsConnected] = useState(false);

    useEffect(() => {
        if (accessToken) {
            console.log('🔌 SocketProvider: Connecting with token...');

            // Connect to server
            socketService.connect(accessToken);

            // Setup connection status listeners
            socketService.socket?.on('connect', () => {
                console.log('✅ SocketProvider: Connected');
                setIsConnected(true);
            });

            socketService.socket?.on('disconnect', () => {
                console.log('❌ SocketProvider: Disconnected');
                setIsConnected(false);
            });

            socketService.socket?.on('connect_error', error => {
                console.error(
                    '🔴 SocketProvider: Connection error:',
                    error.message
                );
                setIsConnected(false);
            });
        } else {
            console.log('⏳ SocketProvider: No token, waiting...');
        }

        // Cleanup on unmount
        return () => {
            console.log('🔌 SocketProvider: Unmounting, disconnecting...');
            socketService.disconnect();
            setIsConnected(false);
        };
    }, [accessToken]);

    return (
        <SocketContext.Provider value={{ socket: socketService, isConnected }}>
            {children}
        </SocketContext.Provider>
    );
};

/**
 * useSocket Hook
 * Custom hook để access socket từ context
 *
 * @throws Error nếu được sử dụng ngoài SocketProvider
 * @returns {SocketContextType} Socket service instance và connection status
 *
 * @example
 * const { socket, isConnected } = useSocket();
 *
 * useEffect(() => {
 *   if (isConnected) {
 *     socket.joinGroupChat('123');
 *     socket.onNewMessage((msg) => console.log(msg));
 *
 *     return () => {
 *       socket.offNewMessage();
 *       socket.leaveGroupChat('123');
 *     };
 *   }
 * }, [isConnected]);
 */
export const useSocket = (): SocketContextType => {
    const context = useContext(SocketContext);

    if (!context) {
        throw new Error('useSocket must be used within SocketProvider');
    }

    return context;
};
