import { describe, it, expect, vi, beforeEach } from 'vitest';
import { authService } from '../auth.service';
import { apiClient } from '@/api/axios-client';
import type { LoginRequest, LoginResponse } from '../../types/auth.types';

// Mock axios-client
vi.mock('@/api/axios-client', () => ({
    apiClient: {
        post: vi.fn(),
    },
}));

describe('authService.login', () => {
    beforeEach(() => {
        // Clear all mocks before each test
        vi.clearAllMocks();
    });

    it('should successfully login with valid credentials', async () => {
        // Arrange
        const mockCredentials: LoginRequest = {
            email: 'hung@gmail.com',
            password: 'Team1345678!',
        };

        const mockResponse: LoginResponse = {
            success: true,
            message: 'Login successful',
            data: {
                accessToken: 'mock-access-token',
                refreshToken: 'mock-refresh-token',
                user: {
                    _id: '123',
                    email: 'test@example.com',
                    username: 'testuser',
                },
            },
        };

        //  LOG 1: Xem credentials được gửi
        console.log('\n📤 REQUEST PAYLOAD:');
        console.log(JSON.stringify(mockCredentials, null, 2));

        // Mock the API response
        vi.mocked(apiClient.post).mockResolvedValueOnce({
            data: mockResponse,
        });

        //  LOG 2: Xem mock response
        console.log('\n🎭 MOCK RESPONSE:');
        console.log(JSON.stringify(mockResponse, null, 2));

        // Act
        const result = await authService.login(mockCredentials);

        //  LOG 3: Xem actual result nhận được
        console.log('\n✅ ACTUAL RESULT:');
        console.log(JSON.stringify(result, null, 2));

        //  LOG 4: Xem API được gọi như thế nào
        console.log('\n📞 API CALL INFO:');
        console.log(
            'Called times:',
            vi.mocked(apiClient.post).mock.calls.length
        );
        console.log('Called with:', vi.mocked(apiClient.post).mock.calls[0]);

        // Assert
        expect(apiClient.post).toHaveBeenCalledTimes(1);
        expect(apiClient.post).toHaveBeenCalledWith(
            '/auth/login',
            mockCredentials
        );
        expect(result).toEqual(mockResponse);
        expect(result.success).toBe(true);
        expect(result.data.accessToken).toBe('mock-access-token');
        expect(result.data.user.email).toBe('test@example.com');
    });

    it('should handle login failure with invalid credentials', async () => {
        // Arrange
        const mockCredentials: LoginRequest = {
            email: 'wrong@example.com',
            password: 'wrongpassword',
        };

        const mockError = {
            response: {
                status: 401,
                data: {
                    success: false,
                    message: 'Invalid credentials',
                },
            },
        };

        // Mock the API to reject with error
        vi.mocked(apiClient.post).mockRejectedValueOnce(mockError);

        // Act & Assert
        await expect(authService.login(mockCredentials)).rejects.toEqual(
            mockError
        );
        expect(apiClient.post).toHaveBeenCalledTimes(1);
        expect(apiClient.post).toHaveBeenCalledWith(
            '/auth/login',
            mockCredentials
        );
    });

    it('should handle network errors', async () => {
        // Arrange
        const mockCredentials: LoginRequest = {
            email: 'test@example.com',
            password: 'password123',
        };

        const networkError = new Error('Network Error');

        // Mock the API to reject with network error
        vi.mocked(apiClient.post).mockRejectedValueOnce(networkError);

        // Act & Assert
        await expect(authService.login(mockCredentials)).rejects.toThrow(
            'Network Error'
        );
        expect(apiClient.post).toHaveBeenCalledTimes(1);
    });

    it('should send correct request payload format', async () => {
        // Arrange
        const mockCredentials: LoginRequest = {
            email: 'user@test.com',
            password: 'securePass123',
        };

        const mockResponse: LoginResponse = {
            success: true,
            message: 'Login successful',
            data: {
                accessToken: 'token',
                refreshToken: 'refresh',
                user: {
                    _id: '456',
                    email: 'user@test.com',
                    username: 'user',
                },
            },
        };

        vi.mocked(apiClient.post).mockResolvedValueOnce({
            data: mockResponse,
        });

        // Act
        await authService.login(mockCredentials);

        // Assert - Verify the exact structure of the request
        expect(apiClient.post).toHaveBeenCalledWith('/auth/login', {
            email: 'user@test.com',
            password: 'securePass123',
        });
    });

    it('should handle server errors (500)', async () => {
        // Arrange
        const mockCredentials: LoginRequest = {
            email: 'test@example.com',
            password: 'password123',
        };

        const serverError = {
            response: {
                status: 500,
                data: {
                    success: false,
                    message: 'Internal server error',
                },
            },
        };

        // Mock the API to reject with server error
        vi.mocked(apiClient.post).mockRejectedValueOnce(serverError);

        // Act & Assert
        await expect(authService.login(mockCredentials)).rejects.toEqual(
            serverError
        );
        expect(apiClient.post).toHaveBeenCalledTimes(1);
    });

    it('should return the complete response data structure', async () => {
        // Arrange
        const mockCredentials: LoginRequest = {
            email: 'test@example.com',
            password: 'password123',
        };

        const mockResponse: LoginResponse = {
            success: true,
            message: 'Login successful',
            data: {
                accessToken: 'access-token-xyz',
                refreshToken: 'refresh-token-abc',
                user: {
                    _id: 'user-id-789',
                    email: 'test@example.com',
                    username: 'testuser123',
                },
            },
        };

        vi.mocked(apiClient.post).mockResolvedValueOnce({
            data: mockResponse,
        });

        // Act
        const result = await authService.login(mockCredentials);

        // Assert - Verify complete structure
        expect(result).toHaveProperty('success');
        expect(result).toHaveProperty('message');
        expect(result).toHaveProperty('data');
        expect(result.data).toHaveProperty('accessToken');
        expect(result.data).toHaveProperty('refreshToken');
        expect(result.data).toHaveProperty('user');
        expect(result.data.user).toHaveProperty('_id');
        expect(result.data.user).toHaveProperty('email');
        expect(result.data.user).toHaveProperty('username');
    });

    // 🎯 TEST DEMO: Xem Response Chi Tiết
    it('🔍 DEMO: should show detailed response logging', async () => {
        console.log('\n' + '='.repeat(60));
        console.log('🎯 DEMO TEST: Xem Response Chi Tiết');
        console.log('='.repeat(60));

        // Arrange
        const mockCredentials: LoginRequest = {
            email: 'hung@gmail.com',
            password: 'Team12345678!',
        };

        const mockResponse: LoginResponse = {
            success: true,
            message: 'Login successful',
            data: {
                accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
                refreshToken: 'refresh-token-xyz-123',
                user: {
                    _id: 'user-id-12345',
                    email: 'hung@gmail.com',
                    username: 'hunguser',
                },
            },
        };

        console.log('\n📋 STEP 1: Prepare Request');
        console.log('├─ Email:', mockCredentials.email);
        console.log(
            '└─ Password:',
            mockCredentials.password.replace(/./g, '*')
        );

        // Mock the API response
        vi.mocked(apiClient.post).mockResolvedValueOnce({
            data: mockResponse,
        });

        console.log('\n🎭 STEP 2: Mock API Response');
        console.log('Mock được setup với response:');
        console.table({
            success: mockResponse.success,
            message: mockResponse.message,
            'user.email': mockResponse.data.user.email,
            'user.username': mockResponse.data.user.username,
        });

        // Act
        console.log('\n⚡ STEP 3: Call authService.login()');
        const result = await authService.login(mockCredentials);

        console.log('\n✅ STEP 4: Response Received!');
        console.log('┌─ Response Structure:');
        console.log('│  ├─ success:', result.success);
        console.log('│  ├─ message:', result.message);
        console.log('│  └─ data:');
        console.log(
            '│     ├─ accessToken:',
            result.data.accessToken.substring(0, 30) + '...'
        );
        console.log('│     ├─ refreshToken:', result.data.refreshToken);
        console.log('│     └─ user:');
        console.log('│        ├─ _id:', result.data.user._id);
        console.log('│        ├─ email:', result.data.user.email);
        console.log('│        └─ username:', result.data.user.username);

        console.log('\n📊 STEP 5: Full Response Object:');
        console.log(JSON.stringify(result, null, 2));

        console.log('\n🔍 STEP 6: API Call Details:');
        const mockCalls = vi.mocked(apiClient.post).mock.calls;
        console.log('├─ API được gọi:', mockCalls.length, 'lần');
        console.log('├─ Endpoint:', mockCalls[0][0]);
        console.log('└─ Payload:', JSON.stringify(mockCalls[0][1], null, 2));

        console.log('\n' + '='.repeat(60));
        console.log('✨ DEMO TEST COMPLETED');
        console.log('='.repeat(60) + '\n');

        // Assert
        expect(result.success).toBe(true);
        expect(result.data.user.email).toBe('hung@gmail.com');
    });
});
