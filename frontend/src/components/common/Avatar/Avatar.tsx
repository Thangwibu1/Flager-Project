import { ComponentPropsWithoutRef } from 'react';
import './Avatar.css';

interface AvatarProps extends ComponentPropsWithoutRef<'div'> {
    src?: string;
    alt?: string;
    size?: string;
    fallbackText?: string;
}

export default function Avatar({
    src,
    alt = 'User Avatar',
    size = '40px',
    fallbackText,
    className,
    style,
    ...restProps
}: AvatarProps) {
    return (
        <div
            className={`avatar ${className || ''}`}
            style={{ width: size, height: size, ...style }}
            {...restProps}
        >
            {src ? (
                <img src={src} alt={alt} className="avatar__img" />
            ) : (
                <span className="avatar__fallback">
                    {fallbackText || alt.charAt(0).toUpperCase()}
                </span>
            )}
        </div>
    );
}
