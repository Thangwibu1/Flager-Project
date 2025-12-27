import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthRoutes } from './AuthRoutes';

export const AppRoutes = () => {
    return (
        <Routes>
            {/* <Route path="/*" element={<PublicRoutes />} /> */}
            <Route path="/auth/*" element={<AuthRoutes />} />
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    );
};
