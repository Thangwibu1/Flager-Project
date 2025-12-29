import { useState } from 'react';
import NavIcon from '@/components/common/NavIcon/NavIcon';
import { NAV_ITEMS } from '@/utils/IconData';
import './IconBar.css';

const START_INDEX = 0;
const END_INDEX = 5;

export default function IconBar() {
    const [activeId, setActiveId] = useState('home');

    return (
        <div className="icon-bar">
            <ul className="icon-bar__list">
                {NAV_ITEMS.slice(START_INDEX, END_INDEX).map(item => (
                    <li
                        key={item.id}
                        className={activeId === item.id ? 'active' : ''}
                        onClick={() => setActiveId(item.id)}
                    >
                        <NavIcon icon={item.icon} />
                    </li>
                ))}
            </ul>
        </div>
    );
}
