import React, { useState } from 'react';
import { MdVisibility, MdVisibilityOff } from 'react-icons/md';
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    showPasswordToggle?: boolean;
}

export const Input: React.FC<InputProps> = ({
    label,
    error,
    leftIcon,
    rightIcon,
    showPasswordToggle = false,
    type = 'text',
    className = '',
    id,
    ...props
}) => {
    const [showPassword, setShowPassword] = useState(false);
    const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;
    const inputType = showPasswordToggle && showPassword ? 'text' : type;

    return (
        <div className="flex flex-col gap-2">
            {label && (
                <label
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 dark:text-white"
                    htmlFor={inputId}
                >
                    {label}
                </label>
            )}
            <div className="relative flex items-center">
                <input
                    id={inputId}
                    type={inputType}
                    className={`flex h-12 w-full rounded-lg border ${
                        error
                            ? 'border-red-500 focus:ring-red-500'
                            : 'border-gray-300 dark:border-border-dark focus:ring-primary'
                    } bg-white dark:bg-surface-dark px-3 py-2 ${
                        leftIcon ? 'pl-10' : ''
                    } ${
                        rightIcon || showPasswordToggle ? 'pr-10' : ''
                    } text-sm placeholder:text-gray-400 dark:placeholder:text-text-muted text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200 ${className}`}
                    {...props}
                />
                {leftIcon && (
                    <span className="absolute left-3 text-gray-400 dark:text-text-muted">
                        {leftIcon}
                    </span>
                )}
                {showPasswordToggle && (
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 text-gray-400 dark:text-text-muted hover:text-gray-600 dark:hover:text-white cursor-pointer focus:outline-none"
                    >
                        <span className="material-symbols-outlined text-[20px]">
                            {showPassword ? (
                                <MdVisibility size={20} />
                            ) : (
                                <MdVisibilityOff size={20} />
                            )}
                        </span>
                    </button>
                )}
                {!showPasswordToggle && rightIcon && (
                    <span className="absolute right-3 text-gray-400 dark:text-text-muted">
                        {rightIcon}
                    </span>
                )}
            </div>
            {error && <p className="text-sm text-red-500">{error}</p>}
        </div>
    );
};
