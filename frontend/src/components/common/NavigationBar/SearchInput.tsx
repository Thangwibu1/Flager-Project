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
        <div className="relative w-full max-w-md text-gray-400 focus-within:text-blue-500">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none z-10">
                <Search size={20} />
            </div>

            <input
                type="text"
                style={{ paddingLeft: '50px' }}
                className={`w-80 bg-[#1f2937] text-gray-200 text-5px rounded-full pr-5 py-20.5 outline-none ring-1 ring-transparent focus:ring-blue-500 placeholder-gray-500 transition-all ${className}`}
                {...props}
            />
        </div>
    );
};
