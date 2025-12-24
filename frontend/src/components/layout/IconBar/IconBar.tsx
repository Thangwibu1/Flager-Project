import { useState } from 'react';
import NavIcon from '@/components/common/NavIcon/NavIcon';
import { NAV_ITEMS } from '@/utils/IconData';
import './IconBar.css';

export default function IconBar() {
    const [activeId, setActiveId] = useState('home');

    return (
        <div className="icon-bar">
            <ul className="icon-bar__list">
                {NAV_ITEMS.slice(0, 4).map(item => (
                    <NavIcon 
                        className={activeId === item.id ? "active" : ""} 
                        key={item.id} 
                        icon={item.icon}
                        onClick={() => setActiveId(item.id)}
                    />
                ))}
            </ul>
        </div>
    );
}
