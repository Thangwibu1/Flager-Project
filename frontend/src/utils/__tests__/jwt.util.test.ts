import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { decodeUserFromToken, isTokenExpired } from '../jwt.util';
import { jwtDecode } from 'jwt-decode';

// Mock jwt-decode
vi.mock('jwt-decode', () => ({
    jwtDecode: vi.fn(),
}));

describe('JWT Utilities', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        // Mock console.error to avoid cluttering test output
        vi.spyOn(console, 'error').mockImplementation(() => {});
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    describe('decodeUserFromToken', () => {
        it('should successfully decode valid token with complete payload', () => {
            // Arrange
            const mockToken = 'valid.jwt.token';
            const mockPayload = {
                userId: 'user-123',
                email: 'test@example.com',
                username: 'testuser',
                iat: 1234567890,
                exp: 9999999999,
            };

            vi.mocked(jwtDecode).mockReturnValueOnce(mockPayload);

            // Act
            const result = decodeUserFromToken(mockToken);

            // Assert
            expect(jwtDecode).toHaveBeenCalledWith(mockToken);
            expect(result).toEqual({
                _id: 'user-123',
                email: 'test@example.com',
                username: 'testuser',
            });
        });

        it('should return null when token payload is missing userId', () => {
            // Arrange
            const mockToken = 'invalid.jwt.token';
            const mockPayload = {
                email: 'test@example.com',
                username: 'testuser',
            };

            vi.mocked(jwtDecode).mockReturnValueOnce(mockPayload);

            // Act
            const result = decodeUserFromToken(mockToken);

            // Assert
            expect(result).toBeNull();
            expect(console.error).toHaveBeenCalledWith(
                '❌ Invalid token payload:',
                mockPayload
            );
        });

        it('should return null when token payload is missing email', () => {
            // Arrange
            const mockToken = 'invalid.jwt.token';
            const mockPayload = {
                userId: 'user-123',
                username: 'testuser',
            };

            vi.mocked(jwtDecode).mockReturnValueOnce(mockPayload);

            // Act
            const result = decodeUserFromToken(mockToken);

            // Assert
            expect(result).toBeNull();
        });

        it('should return null when token payload is missing username', () => {
            // Arrange
            const mockToken = 'invalid.jwt.token';
            const mockPayload = {
                userId: 'user-123',
                email: 'test@example.com',
            };

            vi.mocked(jwtDecode).mockReturnValueOnce(mockPayload);

            // Act
            const result = decodeUserFromToken(mockToken);

            // Assert
            expect(result).toBeNull();
        });

        it('should return null when jwtDecode throws an error', () => {
            // Arrange
            const mockToken = 'malformed.token';
            const error = new Error('Invalid token format');

            vi.mocked(jwtDecode).mockImplementationOnce(() => {
                throw error;
            });

            // Act
            const result = decodeUserFromToken(mockToken);

            // Assert
            expect(result).toBeNull();
            expect(console.error).toHaveBeenCalledWith(
                '❌ Failed to decode token:',
                error
            );
        });
    });

    describe('isTokenExpired', () => {
        beforeEach(() => {
            // Mock Date.now() for consistent testing
            vi.useFakeTimers();
        });

        afterEach(() => {
            vi.useRealTimers();
        });

        it('should return false for valid non-expired token', () => {
            // Arrange
            const currentTime = new Date('2024-01-15T12:00:00Z');
            vi.setSystemTime(currentTime);

            const mockToken = 'valid.jwt.token';
            const futureExp = Math.floor(currentTime.getTime() / 1000) + 3600; // 1 hour in future

            vi.mocked(jwtDecode).mockReturnValueOnce({
                userId: 'user-123',
                exp: futureExp,
            });

            // Act
            const result = isTokenExpired(mockToken);

            // Assert
            expect(result).toBe(false);
            expect(jwtDecode).toHaveBeenCalledWith(mockToken);
        });

        it('should return true for expired token', () => {
            // Arrange
            const currentTime = new Date('2024-01-15T12:00:00Z');
            vi.setSystemTime(currentTime);

            const mockToken = 'expired.jwt.token';
            const pastExp = Math.floor(currentTime.getTime() / 1000) - 3600; // 1 hour in past

            vi.mocked(jwtDecode).mockReturnValueOnce({
                userId: 'user-123',
                exp: pastExp,
            });

            // Act
            const result = isTokenExpired(mockToken);

            // Assert
            expect(result).toBe(true);
        });

        it('should return false when token is expiring at exact current time', () => {
            // Arrange
            const currentTime = new Date('2024-01-15T12:00:00Z');
            vi.setSystemTime(currentTime);

            const mockToken = 'expiring.jwt.token';
            const currentExp = Math.floor(currentTime.getTime() / 1000);

            vi.mocked(jwtDecode).mockReturnValueOnce({
                userId: 'user-123',
                exp: currentExp,
            });

            // Act
            const result = isTokenExpired(mockToken);

            // Assert
            // The implementation uses exp < currentTime, so exp === currentTime is still valid
            expect(result).toBe(false);
        });

        it('should return true when token has no exp field', () => {
            // Arrange
            const mockToken = 'no-exp.jwt.token';

            vi.mocked(jwtDecode).mockReturnValueOnce({
                userId: 'user-123',
                // No exp field
            });

            // Act
            const result = isTokenExpired(mockToken);

            // Assert
            expect(result).toBe(true);
        });

        it('should return true when jwtDecode throws an error', () => {
            // Arrange
            const mockToken = 'malformed.token';

            vi.mocked(jwtDecode).mockImplementationOnce(() => {
                throw new Error('Invalid token');
            });

            // Act
            const result = isTokenExpired(mockToken);

            // Assert
            expect(result).toBe(true);
        });

        it('should correctly handle token expiring in 1 second', () => {
            // Arrange
            const currentTime = new Date('2024-01-15T12:00:00Z');
            vi.setSystemTime(currentTime);

            const mockToken = 'almost-expired.jwt.token';
            const nearFutureExp = Math.floor(currentTime.getTime() / 1000) + 1; // 1 second in future

            vi.mocked(jwtDecode).mockReturnValueOnce({
                userId: 'user-123',
                exp: nearFutureExp,
            });

            // Act
            const result = isTokenExpired(mockToken);

            // Assert
            expect(result).toBe(false); // Still valid for 1 more second
        });

        it('should correctly handle token expired 1 second ago', () => {
            // Arrange
            const currentTime = new Date('2024-01-15T12:00:00Z');
            vi.setSystemTime(currentTime);

            const mockToken = 'just-expired.jwt.token';
            const justPastExp = Math.floor(currentTime.getTime() / 1000) - 1; // 1 second in past

            vi.mocked(jwtDecode).mockReturnValueOnce({
                userId: 'user-123',
                exp: justPastExp,
            });

            // Act
            const result = isTokenExpired(mockToken);

            // Assert
            expect(result).toBe(true);
        });

        it('should handle token with very far future expiration', () => {
            // Arrange
            const currentTime = new Date('2024-01-15T12:00:00Z');
            vi.setSystemTime(currentTime);

            const mockToken = 'long-lived.jwt.token';
            const farFutureExp =
                Math.floor(currentTime.getTime() / 1000) + 31536000; // 1 year in future

            vi.mocked(jwtDecode).mockReturnValueOnce({
                userId: 'user-123',
                exp: farFutureExp,
            });

            // Act
            const result = isTokenExpired(mockToken);

            // Assert
            expect(result).toBe(false);
        });
    });

    describe('Integration: decodeUserFromToken and isTokenExpired', () => {
        it('should decode user from non-expired token', () => {
            // Arrange
            const currentTime = new Date('2024-01-15T12:00:00Z');
            vi.setSystemTime(currentTime);

            const mockToken = 'valid.jwt.token';
            const futureExp = Math.floor(currentTime.getTime() / 1000) + 3600;

            const mockPayload = {
                userId: 'user-123',
                email: 'test@example.com',
                username: 'testuser',
                exp: futureExp,
            };

            // First call for decodeUserFromToken
            vi.mocked(jwtDecode).mockReturnValueOnce(mockPayload);
            const userInfo = decodeUserFromToken(mockToken);

            // Second call for isTokenExpired
            vi.mocked(jwtDecode).mockReturnValueOnce(mockPayload);
            const expired = isTokenExpired(mockToken);

            // Assert
            expect(userInfo).not.toBeNull();
            expect(userInfo?._id).toBe('user-123');
            expect(expired).toBe(false);
        });

        it('should handle expired token with valid payload', () => {
            // Arrange
            const currentTime = new Date('2024-01-15T12:00:00Z');
            vi.setSystemTime(currentTime);

            const mockToken = 'expired-but-valid.jwt.token';
            const pastExp = Math.floor(currentTime.getTime() / 1000) - 3600;

            const mockPayload = {
                userId: 'user-123',
                email: 'test@example.com',
                username: 'testuser',
                exp: pastExp,
            };

            // First call for decodeUserFromToken
            vi.mocked(jwtDecode).mockReturnValueOnce(mockPayload);
            const userInfo = decodeUserFromToken(mockToken);

            // Second call for isTokenExpired
            vi.mocked(jwtDecode).mockReturnValueOnce(mockPayload);
            const expired = isTokenExpired(mockToken);

            // Assert
            expect(userInfo).not.toBeNull(); // Can still decode user info
            expect(expired).toBe(true); // But token is expired
        });
    });
});
