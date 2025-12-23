import React from 'react';
import { Search } from 'lucide-react';

/*
  Props: className, ...HTMLInputAttributes (placeholder, value...)
  Handle: onSearch
*/

interface SearchInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    onSearch?: (val: string) => void;
}

export const SearchInput = ({
    className,
    onSearch,
    ...props
}: SearchInputProps) => {
    return (
        <div className="relative flex items-center w-full max-w-md">
            <div className="absolute left-3 text-gray-400 pointer-events-none">
                <Search size={18} />
            </div>
            <input
                type="text"
                className={`w-full bg-gray-800 text-white text-sm rounded-full pl-10 pr-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500 transition-all ${className}`}
                {...props}
            />
        </div>
    );
};
