import React from 'react';
import { IconType } from 'react-icons';

interface NavIconProps extends React.HTMLAttributes<HTMLElement> {
    icon: IconType | string;
    size?: number;
    color?: string;
    Tag?: React.ElementType;
    alt?: string;
}

function NavIcon({
    icon,
    size = 24,
    color = 'white',
    Tag = 'div',
    alt = 'icon',
    ...props
}: NavIconProps) {
    // Helper function to detect if string is an image URL/path
    const isImageSource = (value: string): boolean => {
        return (
            value.includes('/') ||
            value.includes('.') ||
            value.startsWith('http') ||
            value.startsWith('data:')
        );
    };

    const renderContent = () => {
        // If icon is a function (IconType from react-icons)
        if (typeof icon === 'function') {
            const Icon = icon;
            return <Icon size={size} color={color} />;
        }

        // If icon is a string
        if (typeof icon === 'string') {
            // Check if it's an image source
            if (isImageSource(icon)) {
                return (
                    <img
                        src={icon}
                        alt={alt}
                        style={{ width: size, height: size }}
                    />
                );
            }

            // Otherwise, render as text
            return (
                <span style={{ color, fontSize: size }}>
                    {icon}
                </span>
            );
        }

        return null;
    };

    return <Tag {...props}>{renderContent()}</Tag>;
}

export default NavIcon;
