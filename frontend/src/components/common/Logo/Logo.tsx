import LogoSvg from '@assets/img/logo.svg?react';

export const Logo = ({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) => {
    const sizes = {
        sm: 'w-8 h-8',
        md: 'w-15 h-15',
        lg: 'w-30 h-30',
    };

    return <LogoSvg className={sizes[size]} />;
};
