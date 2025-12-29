import Logo from '@/components/common/Logo/Logo';
import SearchNavBar from '@/components/common/Search/SearchNavBar';
import './LogoSearch.css';

export default function LogoSearch({ className = '', style = {}, ...props }) {
    return (
        <div
            className={`logo-search ${className}`}
            style={style}
            {...props}
        >
            <Logo />
            <SearchNavBar widthSearch="20rem" />
        </div>
    );
}
