import { jwtDecode } from 'jwt-decode';
import { UserInfo } from '../features/auth/types/auth.types';

interface JwtPayload {
    userId: string;
    email?: string;
    username?: string;
    iat?: number;
    exp?: number;
}

/**
 * Decode user info from JWT access token
 * @param token - JWT access token
 * @returns UserInfo object or null if invalid
 */
export const decodeUserFromToken = (token: string): UserInfo | null => {
    try {
        const decoded = jwtDecode<JwtPayload>(token);

        if (!decoded.userId || !decoded.email || !decoded.username) {
            console.error('❌ Invalid token payload:', decoded);
            return null;
        }

        return {
            _id: decoded.userId,
            email: decoded.email,
            username: decoded.username,
        };
    } catch (error) {
        console.error('❌ Failed to decode token:', error);
        return null;
    }
};

/**
 * Check if token is expired
 * @param token - JWT token
 * @returns true if expired
 */
export const isTokenExpired = (token: string): boolean => {
    try {
        const decoded = jwtDecode<JwtPayload>(token);
        if (!decoded.exp) return true;

        const currentTime = Math.floor(Date.now() / 1000);
        return decoded.exp < currentTime;
    } catch (error) {
        return true;
    }
};
