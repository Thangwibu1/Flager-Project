import { Route, Routes, BrowserRouter } from 'react-router-dom';
import NavIcon from './components/common/NavIcon/NavIcon';
import IconBar from './components/layout/IconBar/IconBar';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<IconBar />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
