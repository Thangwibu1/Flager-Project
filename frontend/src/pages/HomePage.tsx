import { Button } from '@/components/Button/Button';
import { Routes, Route, Navigate } from 'react-router-dom';

export function HomePage() {
    return (
        <Routes>
            <Route path="/" element={<Button>Button</Button>} />
            <Route path="/login" element={<div>Login Page</div>} />
            <Route path="/register" element={<div>Regisisisiis Page</div>} />
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    );
}
