import IconBar from '@/components/Layout/IconBar/IconBar';
import UserActionMenu from '@/components/Layout/UserActionMenu/UserActionMenu';
import LogoBar from '@/components/Layout/LogoBar/LogoBar';
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
