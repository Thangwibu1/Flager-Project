import Logo from '@/components/common/Logo/Logo';
import './LogoBar.css';

export default function LogoBar() {
    return (
        <div className="logobar">
            <div className="logobar__logo">
                <Logo />
            </div>
        </div>
    );
}
