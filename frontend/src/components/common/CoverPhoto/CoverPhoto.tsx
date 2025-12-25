
interface CoverPhotoProps {
    coverImage: string;
    coverAlt?: string;
    actions?: React.ReactNode;
    overlayContent?: React.ReactNode;
    variant?: 'profile' | 'group' | 'page';
    height?: string | number;
    className?: string;
}

function CoverPhoto({
    coverImage,
    coverAlt = 'Cover photo',
    actions,
    overlayContent,
    variant = 'profile',
    height = '320px',
    className = '',
}: CoverPhotoProps) {
    const heightValue = typeof height === 'number' ? `${height}px` : height;

    return (
        <div
            className={`cover-photo cover-photo--${variant} ${className}`}
            style={{ height: heightValue }}
        >
            <div className="cover-photo__image-container">
                <img
                    src={coverImage}
                    alt={coverAlt}
                    className="cover-photo__image"
                />
                <div className="cover-photo__gradient" />
            </div>

            {actions && (
                <div className="cover-photo__actions">{actions}</div>
            )}

            {overlayContent && (
                <div className="cover-photo__overlay">{overlayContent}</div>
            )}
        </div>
    );
}

export default CoverPhoto;
