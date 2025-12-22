import React from 'react';

interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {
    children: React.ReactNode;
    onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
}

export const FormGroup: React.FC<FormProps> = ({
    children,
    onSubmit,
    className = '',
    ...props
}) => {
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (onSubmit) {
            onSubmit(e);
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className={`space-y-6 ${className}`}
            {...props}
        >
            {children}
        </form>
    );
};
