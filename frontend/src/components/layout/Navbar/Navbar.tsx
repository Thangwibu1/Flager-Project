import IconBar from '../IconBar/IconBar';
import UserActionMenu from '../UserActionMenu/UserActionMenu';
import './Navbar.css';

export default function Navbar() {
    return (
        <nav className="navbar">
            <div className="navbar__left">
                <IconBar />
            </div>
            
            <div className="navbar__center">
                <UserActionMenu />
            </div>
            
            <div className="navbar__right">
                {/* Có thể thêm các component khác ở đây */}
            </div>
        </nav>
    );
}
