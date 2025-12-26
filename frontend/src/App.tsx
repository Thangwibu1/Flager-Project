import { BrowserRouter } from 'react-router-dom';
// import Navbar from './components/layout/Navbar/Navbar';
import HomePost from './pages/homepost/HomePost';
import { ProfilePage } from './pages/profilepage/ProfilePage';

function App() {
    return (
        <BrowserRouter>
            <HomePost />
            <ProfilePage />
            {/* Nghĩa thêm component của Nghĩa vô nha ví dụ PersonalProfile á, chứu ko phải NMavBar */}
        </BrowserRouter>
    );
}

export default App;
