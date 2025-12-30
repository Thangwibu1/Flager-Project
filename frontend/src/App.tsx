import { BrowserRouter } from 'react-router-dom';
import HomePost from './pages/homepost/HomePost';
// import { ProfilePage } from './pages/profilepage/ProfilePage';


function App() {
    return (
        <BrowserRouter>
            {/* <ProfilePage /> */}
            <HomePost />
            
        </BrowserRouter>
    );
}
export default App;
