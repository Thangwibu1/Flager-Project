import './NavIcon.css';
import React from 'react';
import { IconType } from 'react-icons';

interface NavIconProps extends React.HTMLAttributes<HTMLDivElement> {
    icon: IconType;
    size?: number;
    color?: string;
}

function NavIcon({
    icon: Icon,
    size = 24,
    color = 'white',
    ...props
}: NavIconProps) {
    return (
        <div {...props}>
            <Icon size={size} color={color} />
        </div>
    );
}

export default NavIcon;
