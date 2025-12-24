import { BrowserRouter } from 'react-router-dom';
// import Navbar from './components/layout/Navbar/Navbar';
import { HomePost } from './pages/homepost/HomePost';

function App() {
    return (
        <BrowserRouter>
            <HomePost />
            {/* Nghĩa thêm component của Nghĩa vô nha ví dụ PersonalProfile á, chứu ko phải NMavBar */}
        </BrowserRouter>
    );
}

export default App;
