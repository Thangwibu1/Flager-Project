import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from '@store/slices/authSlice';
import LoginPage from './features/login/LoginPage';
// import { Input } from './components/Input/Input';
// import { Button } from './components/Button/Button';

function App() {
    const isAuthenticated = useAuthStore(state => state.isAuthenticated);

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<div>Home Page</div>} />
                <Route path="/login" element={<LoginPage></LoginPage>} />
                <Route
                    path="/register"
                    element={<div>Regisisisiis Page</div>}
                />
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
