import { LoginPage } from '@/pages/LoginPage';
import { RegisterPage } from '@/pages/RegisterPage';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';

export const AuthRoutes = () => {
    const navigate = useNavigate();

    return (
        <Routes>
            <Route
                path="login"
                element={
                    <LoginPage
                        onSwitchToRegister={() => navigate('/auth/register')}
                    />
                }
            />
            <Route
                path="register"
                element={
                    <RegisterPage
                        onSwitchToLogin={() => navigate('/auth/login')}
                    />
                }
            />
            <Route path="*" element={<Navigate to="login" replace />} />
        </Routes>
    );
};
