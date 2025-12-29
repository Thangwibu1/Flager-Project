import { ReactNode, ComponentPropsWithoutRef, useState, useEffect } from 'react';
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
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 0) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <nav className={`navbar ${className || ''}`} {...restProps}>
            <div className={`navbar__container ${isScrolled ? 'scrolled' : ''}`}>
                <div className="navbar__left">{left}</div>
                <div className="navbar__center">{center}</div>
                <div className="navbar__right">{right}</div>
                {Object.values(extra)}
            </div>
        </nav>
    );
}
