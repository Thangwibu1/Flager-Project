import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePost from './pages/homepost/HomePost';
// import { ProfilePage } from './pages/profilepage/ProfilePage';

function App() {
    return (
        <BrowserRouter>
            {/* <ProfilePage /> */}
            <Routes>
                <Route path="/" element={<HomePost />} />
            </Routes>
            {/* Nghĩa thêm component của Nghĩa vô nha ví dụ PersonalProfile á, chứu ko phải NMavBar */}
        </BrowserRouter>
    );
}
export default App;
