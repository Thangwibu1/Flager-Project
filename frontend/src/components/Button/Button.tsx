import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary';
    fullWidth?: boolean;
    children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
    variant = 'primary',
    fullWidth = false,
    children,
    className = '',
    disabled,
    ...props
}) => {
    const baseClasses =
        'inline-flex items-center justify-center rounded-lg px-8 py-2 text-sm font-bold shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 transition-colors disabled:opacity-50 disabled:pointer-events-none';

    const variantClasses = {
        primary:
            'bg-primary text-white hover:bg-red-700 focus-visible:outline-primary',
        secondary:
            'border border-gray-300 dark:border-border-dark bg-white dark:bg-surface-dark hover:bg-gray-50 dark:hover:bg-[#322424] text-gray-700 dark:text-white',
    };

    const widthClass = fullWidth ? 'w-full' : '';
    const heightClass = 'h-12';

    return (
        <button
            className={`${baseClasses} ${variantClasses[variant]} ${widthClass} ${heightClass} ${className}`}
            disabled={disabled}
            {...props}
        >
            {children}
        </button>
    );
};
