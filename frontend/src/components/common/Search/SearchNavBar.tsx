// src/components/common/Search/SearchNavBar.tsx
import { Search } from 'lucide-react';
import { ComponentPropsWithoutRef } from 'react';
import './SearchNavBar.css';

interface SearchNavBarProps extends ComponentPropsWithoutRef<'div'> {
    text?: string;
    widthSearch?: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void; // lấy data theo ký tự gõ á
    name?: string;
}

export default function SearchNavBar({
    text = 'Search for friends, groups or post ...',
    widthSearch = '25rem',
    value,
    onChange,
    name,
    style,
    className,
    ...restProps
}: SearchNavBarProps) {
    return (
        <div
            className={`search-navbar ${className || ''}`}
            style={{ width: widthSearch, ...style }}
            {...restProps}
        >
            <div className="search-navbar__container">
                <div className="search-navbar__icon">
                    <Search size={18} strokeWidth={2.5} />
                </div>

                <div className="search-navbar__input-wrapper">
                    <input
                        type="text"
                        name={name}
                        value={value}
                        onChange={onChange}
                        placeholder={text}
                        className="search-navbar__input"
                    />
                </div>
            </div>
        </div>
    );
}
