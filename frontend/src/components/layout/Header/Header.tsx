import './Header.css';

/**
 * Header Component
 * Flexible header with proper avatar + info grouping
 */

interface HeaderProps {
    coverPhoto?: React.ReactNode;
    avatarAndInfo?: React.ReactNode; // Avatar + Info together
    className?: string;
}

function Header({ coverPhoto, avatarAndInfo, className = '' }: HeaderProps) {
    return (
        <header className={`header ${className}`}>
            {/* Cover Photo */}
            {coverPhoto && <div className="header__cover">{coverPhoto}</div>}
            
            {/* Avatar + Profile Info (grouped together) */}
            {avatarAndInfo && (
                <div className="header__content">{avatarAndInfo}</div>
            )}
        </header>
    );
}

export default Header;
