import { Navigate } from 'react-router-dom';
import { useAuthStore } from '@/features/auth/store/auth.store';
import { isTokenExpired } from '@/utils/jwt.util';

interface ProtectedRouteProps {
    children: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const { accessToken, isAuthenticated, clearAuth } = useAuthStore();

    // Check if user has a token
    if (!accessToken || !isAuthenticated) {
        console.log('No access token found, redirecting to login');
        return <Navigate to="/auth/login" replace />;
    }

    // Check if token is expired
    if (isTokenExpired(accessToken)) {
        console.log('Access token expired, redirecting to login');
        clearAuth();
        return <Navigate to="/auth/login" replace />;
    }

    // Token is valid, render protected content
    return <>{children}</>;
};
