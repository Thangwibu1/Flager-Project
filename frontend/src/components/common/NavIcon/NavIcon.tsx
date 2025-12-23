import React from 'react';
import { IconType } from 'react-icons';

interface NavIconProps extends React.HTMLAttributes<HTMLElement> {
    icon?: IconType;
    src?: string;
    text?: string;
    size?: number;
    color?: string;
    Tag?: React.ElementType;
    alt?: string;
}

function NavIcon({
    icon: Icon,
    src,
    text,
    size = 24,
    color = 'white',
    Tag = 'div',
    alt = 'icon',
    ...props
}: NavIconProps) {
    return (
        <Tag {...props}>
            {Icon && <Icon size={size} color={color} />}
            {src && <img src={src} alt={alt} width={size} height={size} />}
            {text && <span style={{ color, fontSize: size }}>{text}</span>}
        </Tag>
    );
}

export default NavIcon;
