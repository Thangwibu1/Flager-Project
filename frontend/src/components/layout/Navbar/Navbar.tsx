import IconBar from '../IconBar/IconBar';
import LogoBar from '../LogoBar/LogoBar';
import UserActionMenu from '../UserActionMenu/UserActionMenu';
import './Navbar.css';

export default function Navbar() {
    return (
        <nav className="navbar">
            <div className="navbar__logobar">
                <LogoBar />
            </div>

            <div className="navbar__center">
                <IconBar />
            </div>

            <div className="navbar__right">
                <UserActionMenu />
            </div>
        </nav>
    );
}
