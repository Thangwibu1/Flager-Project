import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { UserInfo } from '../types/auth.types';
import { decodeUserFromToken } from '@/utils/jwt.util';

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
        user?: UserInfo // Optional, will decode from token if not provided
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

                // Decode user from token
                const user = decodeUserFromToken(accessToken);

                set({
                    accessToken,
                    refreshToken,
                    user,
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
                user?: UserInfo
            ) => {
                localStorage.setItem('accessToken', accessToken);
                if (refreshToken) {
                    localStorage.setItem('refreshToken', refreshToken);
                }

                // If user not provided, decode from token
                const finalUser = user || decodeUserFromToken(accessToken);

                set({
                    accessToken,
                    refreshToken,
                    user: finalUser,
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
                // Don't persist user, decode from token on hydration
                isAuthenticated: state.isAuthenticated,
            }),
            // Hydrate user from token after loading from storage
            onRehydrateStorage: () => state => {
                if (state?.accessToken) {
                    const user = decodeUserFromToken(state.accessToken);
                    if (user) {
                        state.user = user;
                    } else {
                        // Token invalid, clear auth
                        state.accessToken = null;
                        state.refreshToken = null;
                        state.isAuthenticated = false;
                    }
                }
            },
        }
    )
);
