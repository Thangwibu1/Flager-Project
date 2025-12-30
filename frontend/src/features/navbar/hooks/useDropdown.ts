import { useState, useEffect, useRef } from 'react';

interface UseDropdownReturn {
    isOpen: boolean;
    toggle: () => void;
    open: () => void;
    close: () => void;
    ref: React.RefObject<HTMLDivElement>;
}

/**
 * Custom hook để quản lý state của dropdown
 * 
 */
export function useDropdown(): UseDropdownReturn {
    const [isOpen, setIsOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    const toggle = () => setIsOpen(prev => !prev);
    const open = () => setIsOpen(true);
    const close = () => setIsOpen(false);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                close();
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    return { isOpen, toggle, open, close, ref };
}
