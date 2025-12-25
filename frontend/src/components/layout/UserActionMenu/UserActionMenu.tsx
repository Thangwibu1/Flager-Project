import NavIcon from '@/components/common/NavIcon/NavIcon';
import { NAV_ITEMS } from '@/utils/IconData';
import './UserActionMenu.css';

export default function UserActionMenu() {
    return (
        <div className="icon-bar">
            <ul className="icon-bar__list">
                {NAV_ITEMS.slice(4, 7).map(item => (
                    <NavIcon className="" key={item.id} icon={item.icon} />
                ))}
                <li className="icon-bar__image-container">
                    {/* Image container for user avatar */}
                    <p>Avatar ở đây</p>
                </li>
            </ul>
        </div>
    );
}
