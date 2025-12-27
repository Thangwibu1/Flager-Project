import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { UserInfo } from '../types/auth.types';

interface AuthState {
    // State
    accessToken: string | null;
    refreshToken: string | null;
    user: UserInfo | null;
    isAuthenticated: boolean;

    // Actions
    setTokens: (accessToken: string, refreshToken: string) => void;
    setUser: (user: UserInfo) => void;
    setAuth: (
        accessToken: string,
        refreshToken: string,
        user: UserInfo
    ) => void;
    clearAuth: () => void;
}

export const useAuthStore = create<AuthState>()(
    persist(
        set => ({
            // Initial state
            accessToken: null,
            refreshToken: null,
            user: null,
            isAuthenticated: false,

            // Set both tokens
            setTokens: (accessToken: string, refreshToken: string) => {
                localStorage.setItem('accessToken', accessToken);
                localStorage.setItem('refreshToken', refreshToken);
                set({
                    accessToken,
                    refreshToken,
                    isAuthenticated: true,
                });
            },

            // Set user information
            setUser: (user: UserInfo) => {
                set({ user });
            },

            // Set everything at once (used after login)
            setAuth: (
                accessToken: string,
                refreshToken: string,
                user: UserInfo
            ) => {
                localStorage.setItem('accessToken', accessToken);
                localStorage.setItem('refreshToken', refreshToken);
                set({
                    accessToken,
                    refreshToken,
                    user,
                    isAuthenticated: true,
                });
            },

            // Clear all auth data (used on logout)
            clearAuth: () => {
                localStorage.removeItem('accessToken');
                localStorage.removeItem('refreshToken');
                set({
                    accessToken: null,
                    refreshToken: null,
                    user: null,
                    isAuthenticated: false,
                });
            },
        }),
        {
            name: 'auth-storage',
            partialize: state => ({
                accessToken: state.accessToken,
                refreshToken: state.refreshToken,
                user: state.user,
                isAuthenticated: state.isAuthenticated,
            }),
        }
    )
);
