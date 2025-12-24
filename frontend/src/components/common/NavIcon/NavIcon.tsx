import { IconType } from 'react-icons';
import { ComponentPropsWithoutRef } from 'react';

interface NavIconProps extends ComponentPropsWithoutRef<'div'> {
    // Content options
    icon?: IconType;
    src?: string;
    text?: string;
    fallbackText?: string;

    // Layout options
    layout?: 'horizontal' | 'vertical';
    gap?: number;

    // Styling options
    size?: number | string;
    iconSize?: number;
    textSize?: number | string;
    color?: string;
    alt?: string;

    // Shape options
    // false = square, true = rounded, 'full' = circle
    rounded?: boolean | 'full';

    // Container element
    Tag?: React.ElementType;
}

function NavIcon({
    icon: Icon,
    src,
    text,
    fallbackText,
    layout = 'horizontal',
    gap = 8,
    size,
    iconSize,
    textSize,
    color = 'white',
    alt = 'icon',
    rounded = false,
    Tag = 'div',
    className = '',
    style,
    ...props
}: NavIconProps) {
    const getBorderRadius = () => {
        if (rounded === 'full') return '50%';
        if (rounded === true) return '8px';
        return '0';
    };

    const sizeValue = typeof size === 'number' ? `${size}px` : size;

    const finalIconSize = iconSize || (typeof size === 'number' ? size : 24);

    const finalTextSize =
        textSize || (typeof size === 'number' ? size * 0.5 : '1em');

    const hasIconAndText = (Icon && text) || (src && text);

    const containerStyle: React.CSSProperties = {
        width: hasIconAndText ? 'auto' : sizeValue,
        height: hasIconAndText ? 'auto' : sizeValue,
        borderRadius: getBorderRadius(),
        display: 'flex',
        flexDirection: hasIconAndText
            ? layout === 'vertical'
                ? 'column'
                : 'row'
            : 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: hasIconAndText ? `${gap}px` : 0,
        overflow: rounded && !hasIconAndText ? 'hidden' : 'visible',
        flexShrink: 0,
        ...style,
    };

    // Render content based on what's provided
    const renderContent = () => {
        // Có cả 2 thì làm cả hai
        if (Icon && text) {
            return (
                <>
                    <Icon size={finalIconSize} color={color} />
                    <span style={{ color, fontSize: finalTextSize }}>
                        {text}
                    </span>
                </>
            );
        }

        if (src && text) {
            return (
                <>
                    <img
                        src={src}
                        alt={alt}
                        style={{
                            width: finalIconSize,
                            height: finalIconSize,
                            objectFit: 'cover',
                            display: 'block',
                            borderRadius:
                                rounded === 'full'
                                    ? '50%'
                                    : rounded
                                    ? '4px'
                                    : '0',
                        }}
                    />
                    <span style={{ color, fontSize: finalTextSize }}>
                        {text}
                    </span>
                </>
            );
        }

        // ICon
        if (Icon) {
            return <Icon size={finalIconSize} color={color} />;
        }

        // Ảnh
        if (src) {
            return (
                <img
                    src={src}
                    alt={alt}
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        display: 'block',
                    }}
                />
            );
        }

        // Chữ
        if (text) {
            return (
                <span style={{ color, fontSize: finalTextSize }}>{text}</span>
            );
        }

        // Fallback Text
        if (fallbackText) {
            return (
                <span
                    style={{ color, fontSize: finalTextSize, fontWeight: 600 }}
                >
                    {fallbackText}
                </span>
            );
        }

        return null;
    };

    return (
        <Tag className={className} style={containerStyle} {...props}>
            {renderContent()}
        </Tag>
    );
}

export default NavIcon;
