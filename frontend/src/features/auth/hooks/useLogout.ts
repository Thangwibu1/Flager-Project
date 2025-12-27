import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/auth.service';
import { useAuthStore } from '../store/auth.store';
import { AxiosError } from 'axios';
import { LogoutResponse } from '../types/auth.types';

/**
 * Custom hook for user logout using React Query
 * Handles logout mutation, clearing auth state, and navigation
 */
export const useLogout = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const { clearAuth } = useAuthStore();

    const mutation = useMutation<LogoutResponse, AxiosError>({
        mutationFn: authService.logout,

        onSuccess: () => {
            // 1. Clear auth state from Zustand store and localStorage
            clearAuth();

            // 2. Clear all cached queries
            queryClient.clear();

            // 3. Redirect to login page
            navigate('/login');

            console.log('✅ Logout successful');
        },

        onError: error => {
            // Even if API fails, clear auth locally and redirect
            clearAuth();
            queryClient.clear();
            navigate('/login');
            console.error('❌ Logout error:', error);
        },
    });

    return {
        logout: mutation.mutate,
        logoutAsync: mutation.mutateAsync,
        isLoading: mutation.isPending,
    };
};
