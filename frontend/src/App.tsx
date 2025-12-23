import { BrowserRouter } from 'react-router-dom';
import Navbar from './components/layout/Navbar/Navbar';

function App() {
    return (
        <BrowserRouter>
            <Navbar />
            {/* <Abc /> Component Abc sẽ nằm dưới Navbar */}
        </BrowserRouter>
    );
}

export default App;
