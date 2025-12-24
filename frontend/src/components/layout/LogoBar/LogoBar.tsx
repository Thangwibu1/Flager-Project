import NavIcon from '@/components/common/NavIcon/NavIcon';
import SearchNavBar from '@/components/common/Search/SearchNavBar';
import logoFlager from '@/assets/img/logo.svg';
import './LogoBar.css';

export default function LogoBar() {
    return (
        <div className="logobar">
            <div className="logobar__logo">
                <NavIcon 
                    src={logoFlager} 
                    alt="Flager Logo" 
                    size={50}
                    rounded="full"
                    className="logobar__logo-img"
                />
            </div>
            <div className="logobar__search">
                <SearchNavBar />
            </div>
        </div>
    );
}
