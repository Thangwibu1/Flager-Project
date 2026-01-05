import { apiClient } from '@/api/axios-client';
import {
    LoginRequest,
    LoginResponse,
    RegisterRequest,
    RegisterResponse,
    LogoutResponse,
    RefreshTokenResponse,
} from '../types/auth.types';

export const authService = {
    /**
     * Login user with email and password
     * @param credentials - User login credentials
     * @returns Promise with login response containing tokens and user info
     */
    login: async (credentials: LoginRequest): Promise<LoginResponse> => {
        const response = await apiClient.post<LoginResponse>(
            '/auth/login',
            credentials //data Body
        );

        return response.data;
    },
    //Mess Header Body Auth Status

    /**
     * Register new user
     * @param userData - User registration data
     * @returns Promise with registration response
     */
    register: async (userData: RegisterRequest): Promise<RegisterResponse> => {
        const response = await apiClient.post<RegisterResponse>(
            '/auth/register',
            userData
        );

        return response.data;
    },

    /**
     * Logout current user
     * @returns Promise with logout response
     */
    logout: async (): Promise<LogoutResponse> => {
        const response = await apiClient.post<LogoutResponse>('/auth/logout');
        return response.data;
    },

    /**
     * Refresh access token using refresh token from cookie
     * @returns Promise with new access token
     */
    refreshToken: async (): Promise<RefreshTokenResponse> => {
        const response = await apiClient.post<RefreshTokenResponse>(
            '/auth/refresh-token'
        );

        return response.data;
    },

    

};
