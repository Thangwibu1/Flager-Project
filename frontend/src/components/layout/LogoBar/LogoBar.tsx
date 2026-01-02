import { useNavigate } from 'react-router-dom';
import NavIcon from '@/components/common/NavIcon/NavIcon';
import logoFlager from '@/assets/img/logo.svg';
import './LogoBar.css';

export default function LogoBar() {
    const navigate = useNavigate();

    return (
        <div className="logobar">
            <div
                className="logobar__logo"
                onClick={() => navigate('/')}
                style={{ cursor: 'pointer' }}
            >
                <NavIcon
                    src={logoFlager}
                    alt="Flager Logo"
                    size={50}
                    rounded="full"
                    className="logobar__logo-img"
                />
            </div>
        </div>
    );
}
