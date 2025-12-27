import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/auth.service';
import { useAuthStore } from '../store/auth.store';
import { LoginRequest, LoginResponse } from '../types/auth.types';
import { AxiosError } from 'axios';

interface LoginError {
    success: boolean;
    message: string;
    data: null;
}

/**
 * Custom hook for user login using React Query
 * Handles login mutation, token storage, and navigation
 */
export const useLogin = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const { setAuth } = useAuthStore();

    const mutation = useMutation<
        LoginResponse,
        AxiosError<LoginError>,
        LoginRequest
    >({
        mutationFn: authService.login,

        onSuccess: data => {
            // 1. Save tokens and user info to Zustand store (also saves to localStorage)
            setAuth(
                data.data.accessToken,
                data.data.refreshToken,
                data.data.user
            );

            // 2. Invalidate user-related queries to refetch fresh data
            queryClient.invalidateQueries({ queryKey: ['user'] });
            queryClient.invalidateQueries({ queryKey: ['profile'] });

            // 3. Navigate to dashboard after successful login
            navigate('/');

            console.log('✅ Login successful:', data.message);
        },

        onError: error => {
            console.error(
                '❌ Login failed:',
                error.response?.data?.message || error.message
            );
        },
    });

    return {
        // Mutation methods
        login: mutation.mutate,
        loginAsync: mutation.mutateAsync,

        // States
        isLoading: mutation.isPending,
        isError: mutation.isError,
        isSuccess: mutation.isSuccess,
        error: mutation.error,
        data: mutation.data,

        // Reset mutation state
        reset: mutation.reset,
    };
};
