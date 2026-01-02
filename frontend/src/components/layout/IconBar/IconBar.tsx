import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import NavIcon from '@/components/common/NavIcon/NavIcon';
import { NAV_ITEMS } from '@/utils/IconData';
import './IconBar.css';

const START_INDEX = 0;
const END_INDEX = 4;

export default function IconBar() {
    const navigate = useNavigate();
    const location = useLocation();
    const [activeId, setActiveId] = useState('home');

    // Update active icon based on current route
    useEffect(() => {
        if (location.pathname === '/profile') {
            setActiveId('profile');
        } else if (location.pathname === '/') {
            setActiveId('home');
        }
    }, [location.pathname]);

    const handleIconClick = (itemId: string) => {
        setActiveId(itemId);

        // Navigate based on icon clicked
        if (itemId === 'home') {
            navigate('/');
        } else if (itemId === 'profile') {
            navigate('/profile');
        }
    };

    return (
        <div className="icon-bar">
            <ul className="icon-bar__list">
                {NAV_ITEMS.slice(START_INDEX, END_INDEX).map(item => (
                    <NavIcon
                        key={item.id}
                        icon={item.icon}
                        className={activeId === item.id ? 'active' : ''}
                        onClick={() => handleIconClick(item.id)}
                    />
                ))}
            </ul>
        </div>
    );
}
