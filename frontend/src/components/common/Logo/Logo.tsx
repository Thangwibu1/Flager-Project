import logoFlager from '../../../assets/img/logo.svg';
import { ComponentPropsWithoutRef } from 'react';
import './Logo.css';

interface LogoProps extends ComponentPropsWithoutRef<'div'> {
    widthLogo?: string;
}

export default function Logo({
    widthLogo = '80px',
    style,
    className,
    ...restProps
}: LogoProps) {
    return (
        <div
            className={`logo-wrapper ${className || ''}`}
            style={{ width: widthLogo, ...style }}
            {...restProps}
        >
            <img src={logoFlager} alt="Flager Logo" className="logo-img" />
        </div>
    );
}
