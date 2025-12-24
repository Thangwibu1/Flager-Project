import { useState } from 'react';
import NavIcon from '@/components/common/NavIcon/NavIcon';
import { NAV_ITEMS } from '@/utils/IconData';

import './UserActionMenu.css';

export default function UserActionMenu() {
    const [activeId, setActiveId] = useState('more');

    return (
        <div className="user-action-menu">
            <ul className="user-action-menu__list">
                {NAV_ITEMS.slice(4, 7).map(item => (
                    <NavIcon 
                        className={activeId === item.id ? "active" : ""} 
                        key={item.id} 
                        icon={item.icon}
                        onClick={() => setActiveId(item.id)}
                    />
                ))}
                <li className="user-action-menu__avatar-wrapper">
                    <NavIcon 
                        src="" 
                        alt="User" 
                        fallbackText="U"
                        size={40}
                        rounded="full"
                        className="user-action-menu__avatar"
                    />
                </li>
            </ul>
        </div>
    );
}
