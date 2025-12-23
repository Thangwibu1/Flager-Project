// src/components/common/Logo/Logo.tsx
import logoFlager from '../../../assets/img/logo.png';
import './Logo.css';


export default function Logo() {
    return (
        <div className="logo-wrapper">
            <img src={logoFlager} alt="Flager Logo" className="logo-img" />
        </div>
    );
}
