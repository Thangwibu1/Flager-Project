import './Header.css';

interface HeaderProps {
    coverPhoto?: React.ReactNode;
    avatarAndInfo?: React.ReactNode;
    className?: string;
}

function Header({ coverPhoto, avatarAndInfo, className = '' }: HeaderProps) {
    return (
        <header className={`header ${className}`}>
            {/* Cover Photo */}
            {coverPhoto && <div className="header__cover">{coverPhoto}</div>}

            {/* Avatar + Profile Info (grouped together with border) */}
            {avatarAndInfo && (
                <div className="header__content-wrapper">
                    <div className="header__content">{avatarAndInfo}</div>
                </div>
            )}
        </header>
    );
}

export default Header;
