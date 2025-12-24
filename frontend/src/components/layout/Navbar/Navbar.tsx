import { ReactNode } from 'react';
import './Navbar.css';

interface NavbarProps {
    leftContent?: ReactNode;
    centerContent?: ReactNode;
    rightContent?: ReactNode;
}

export default function Navbar({
    leftContent,
    centerContent,
    rightContent,
}: NavbarProps) {
    return (
        <nav className="navbar">
            <div className="navbar__logobar">{leftContent}</div>

            <div className="navbar__center">{centerContent}</div>

            <div className="navbar__right">{rightContent}</div>
        </nav>
    );
}
