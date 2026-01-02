import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NavIcon from '@/components/common/NavIcon/NavIcon';
import { NAV_ITEMS } from '@/utils/IconData';
import { useLogout } from '@/features/auth/hooks/useLogout';
import { LogOut, User, Settings } from 'lucide-react';

import './UserActionMenu.css';

export default function UserActionMenu({ start = 4, end = 7 }) {
    const [activeId, setActiveId] = useState('more');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [dropdownPosition, setDropdownPosition] = useState({
        top: 0,
        right: 0,
    });
    const navigate = useNavigate();
    const { logout, isLoading } = useLogout();
    const avatarRef = useRef<HTMLDivElement>(null);

    const handleIconClick = (itemId: string) => {
        setActiveId(itemId);

        // Navigate to messages page when chat icon is clicked
        if (itemId === 'chat') {
            navigate('/messages');
        }
    };

    const handleAvatarClick = () => {
        if (avatarRef.current) {
            const rect = avatarRef.current.getBoundingClientRect();
            setDropdownPosition({
                top: rect.bottom + 12, // 12px below avatar
                right: window.innerWidth - rect.right, // Align to right edge of avatar
            });
        }
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handleLogout = () => {
        logout();
        setIsDropdownOpen(false);
    };

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                avatarRef.current &&
                !avatarRef.current.contains(event.target as Node)
            ) {
                setIsDropdownOpen(false);
            }
        };

        if (isDropdownOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isDropdownOpen]);

    // Update position on window resize
    useEffect(() => {
        const handleResize = () => {
            if (isDropdownOpen && avatarRef.current) {
                const rect = avatarRef.current.getBoundingClientRect();
                setDropdownPosition({
                    top: rect.bottom + 12,
                    right: window.innerWidth - rect.right,
                });
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [isDropdownOpen]);

    return (
        <div className="user-action-menu">
            <ul className="user-action-menu__list">
                {NAV_ITEMS.slice(start, end).map(item => (
                    <NavIcon
                        className={activeId === item.id ? 'active' : ''}
                        key={item.id}
                        icon={item.icon}
                        onClick={() => handleIconClick(item.id)}
                    />
                ))}
                <li className="user-action-menu__avatar-wrapper">
                    <div ref={avatarRef}>
                        <NavIcon
                            src=""
                            alt="User"
                            fallbackText="U"
                            size={40}
                            rounded="full"
                            className="user-action-menu__avatar"
                            onClick={handleAvatarClick}
                        />
                    </div>
                </li>
            </ul>

            {/* Dropdown Menu - Fixed Position */}
            {isDropdownOpen && (
                <div
                    className="user-action-menu__dropdown"
                    style={{
                        top: `${dropdownPosition.top}px`,
                        right: `${dropdownPosition.right}px`,
                    }}
                >
                    <div className="user-action-menu__dropdown-header">
                        <User size={16} />
                        <span>My Account</span>
                    </div>
                    <div className="user-action-menu__dropdown-divider"></div>
                    <button
                        className="user-action-menu__dropdown-item"
                        onClick={() => {
                            setIsDropdownOpen(false);
                            // Navigate to profile or settings
                        }}
                    >
                        <Settings size={16} />
                        <span>Settings</span>
                    </button>
                    <div className="user-action-menu__dropdown-divider"></div>
                    <button
                        className="user-action-menu__dropdown-item user-action-menu__dropdown-item--logout"
                        onClick={handleLogout}
                        disabled={isLoading}
                    >
                        <LogOut size={16} />
                        <span>{isLoading ? 'Logging out...' : 'Logout'}</span>
                    </button>
                </div>
            )}
        </div>
    );
}
