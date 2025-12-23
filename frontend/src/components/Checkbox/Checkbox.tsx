interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: React.ReactNode;
    error?: string;
}

export const Checkbox: React.FC<CheckboxProps> = ({
    label,
    error,
    className = '',
    id,
    ...props
}) => {
    const checkboxId =
        id || `checkbox-${Math.random().toString(36).substr(2, 9)}`;

    return (
        <div className="space-y-1.5">
            <div className="flex items-start">
                <div className="flex h-5 items-center">
                    <input
                        id={checkboxId}
                        type="checkbox"
                        className={`h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary dark:border-border-dark dark:bg-background-dark ${className}`}
                        {...props}
                    />
                </div>
                <div className="ml-3 text-sm">
                    <label
                        className="font-medium text-gray-700 dark:text-gray-300"
                        htmlFor={checkboxId}
                    >
                        {label}
                    </label>
                </div>
            </div>
            {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
        </div>
    );
};
