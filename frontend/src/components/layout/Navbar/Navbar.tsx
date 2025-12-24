
import SearchNavBar from '@/components/common/Search/SearchNavBar';
import IconBar from '../IconBar/IconBar';
import UserActionMenu from '../UserActionMenu/UserActionMenu';
import './Navbar.css';
import Logo from '@/components/common/Logo/Logo';

export default function Navbar() {
    return (
        <nav className="navbar">
            <div className="navbar__logobar">
                <Logo />
                <SearchNavBar />
            </div>

            {/* <div className="navbar__center">
                <IconBar />
            </div> */}

            <div className="navbar__right">
                <UserActionMenu />
            </div>
        </nav>
    );
}
