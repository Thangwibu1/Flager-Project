import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Logo } from './components/common/Logo/Logo';
import { LoginPage } from './pages/LoginPage';
function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<div>Home Page</div>} />
                <Route path="/login" element={<div>Login Page</div>} />
                <Route path="/register" element={<LoginPage></LoginPage>} />
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
