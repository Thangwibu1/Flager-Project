import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import HomePost from './pages/homepost/HomePost';
import { AuthRoutes } from './routes/AuthRoutes';
import { MessagePage } from './pages/messagepage/MessagePage';
import { ProfilePage } from './pages/profilepage/ProfilePage';
import { SocketProvider } from './contexts/SocketContext';
import { ProtectedRoute } from './routes/ProtectedRoute';
import { useAuthStore } from './features/auth/store/auth.store';
import { isTokenExpired } from './utils/jwt.util';

// Create QueryClient instance
const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 1000 * 60 * 5, // 5 minutes
            gcTime: 1000 * 60 * 30, // 30 minutes
            refetchOnWindowFocus: true,
            retry: 1,
        },
    },
});

function App() {
    const { accessToken, isAuthenticated } = useAuthStore();

    // Check if user is authenticated with valid token
    const isUserAuthenticated = () => {
        if (!accessToken || !isAuthenticated) return false;
        return !isTokenExpired(accessToken);
    };

    return (
        <QueryClientProvider client={queryClient}>
            <SocketProvider>
                <BrowserRouter>
                    <Routes>
                        {/* Auth routes */}
                        <Route path="/auth/*" element={<AuthRoutes />} />

                        {/* Root route - redirect based on auth status */}
                        <Route
                            path="/"
                            element={
                                isUserAuthenticated() ? (
                                    <HomePost />
                                ) : (
                                    <Navigate to="/auth/login" replace />
                                )
                            }
                        />

                        {/* Protected routes */}
                        <Route
                            path="/messages"
                            element={
                                <ProtectedRoute>
                                    <MessagePage />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/messages/:chatId"
                            element={
                                <ProtectedRoute>
                                    <MessagePage />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/profile"
                            element={
                                <ProtectedRoute>
                                    <ProfilePage />
                                </ProtectedRoute>
                            }
                        />
                    </Routes>
                </BrowserRouter>

                {/* React Query DevTools */}
                <ReactQueryDevtools initialIsOpen={false} />
            </SocketProvider>
        </QueryClientProvider>
    );
}

export default App;
