import Logo from '@/components/common/Logo/Logo';
import SearchNavBar from '@/components/common/Search/SearchNavBar';
import './LogoBar.css';

export default function LogoBar() {
    return (
        <div className="logobar">
            <div className="logobar__logo">
                <Logo />
            </div>
            <div className="logobar__search">
                <SearchNavBar />
            </div>
        </div>
    );
}
