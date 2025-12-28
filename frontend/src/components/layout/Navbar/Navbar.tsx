import { ReactNode, ComponentPropsWithoutRef } from 'react';
import './Navbar.css';

interface NavbarProps extends ComponentPropsWithoutRef<'nav'> {
    components?: {
        [key: string]: ReactNode;
    };
}

export default function Navbar({
    components = {},
    className,
    ...restProps
}: NavbarProps) {
    const { left, center, right, ...extra } = components;

    return (
        <nav className={`navbar ${className || ''}`} {...restProps}>
            <div className="navbar__container">
                <div className="navbar__left">{left}</div>
                <div className="navbar__center">{center}</div>
                <div className="navbar__right">{right}</div>
                {Object.values(extra)}
            </div>
        </nav>
    );
}
