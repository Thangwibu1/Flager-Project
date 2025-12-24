import { BrowserRouter } from 'react-router-dom';
import Navbar from './components/layout/Navbar/Navbar';
import Sidebar from './components/layout/Sidebar/Sidebar';

function App() {
    return (
        <BrowserRouter>
            <Navbar />
            <main className="main-layout">
                {/* <Sidebar /> */}
                {/* <HomeFeed /> */}
                {/* RightSidebar */}
            </main>
        </BrowserRouter>
    );
}

export default App;
