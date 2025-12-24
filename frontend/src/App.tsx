import { BrowserRouter } from 'react-router-dom';
// import Navbar from './components/layout/Navbar/Navbar';
import { HomePost } from './pages/homepost/HomePost';

function App() {
    return (
        <BrowserRouter>
            <HomePost />
        </BrowserRouter>
    );
}

export default App;
