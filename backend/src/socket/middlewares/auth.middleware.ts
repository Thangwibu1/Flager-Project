import { Socket } from 'socket.io';
import authService from '../../services/auth.service';
import userRepository from '../../repositories/user/user.repository';

const socketAuthMiddleware = async (
    socket: Socket,
    next: (err?: any) => void
) => {
    try {
        //get token from sokcet handshake
        const token = socket.handshake.auth.token;
        if (!token) {
            return next(new Error('Authentication error: Token not provided'));
        }

        //verify token
        const { userId } = await authService.verifyAccessToken(token);
        const user = await userRepository.findById(userId);
        //attach user info to socket data
        (socket as any).data.user = {
            userId: userId,
            email: user?.email,
            username: user?.username,
            avatar: user?.avatar,
        };
        next();
    } catch (error) {
        next(new Error('Authentication error'));
    }
};

export { socketAuthMiddleware };
