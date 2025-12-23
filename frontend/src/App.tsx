import { BrowserRouter } from 'react-router-dom';
import Navbar from './components/Layout/Navbar/Navbar';

function App() {
    return (
        <BrowserRouter>
            <Navbar />
        </BrowserRouter>
    );
}

export default App;
