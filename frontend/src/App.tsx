import { Route, Routes, BrowserRouter } from 'react-router-dom';
import IconBar from './components/Layout/IconBar/IconBar';
import UserActionMenu from './components/Layout/UserActionMenu/UserActionMenu';

function App() {
    return (
        <BrowserRouter>
            <IconBar />
            <br />
            <UserActionMenu />
        </BrowserRouter>
    );
}

export default App;
