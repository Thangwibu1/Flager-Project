// src/components/common/Logo/Logo.tsx
import logoFlager from './logoFlager.jpg';
import './Logo.css';


export default function Logo() {
    return (
        <div className="logo-wrapper">
            <img src={logoFlager} alt="Flager Logo" className="logo-img" />
        </div>
    );
}
