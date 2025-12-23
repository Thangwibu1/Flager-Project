import NavIcon from '@/components/common/NavIcon/NavIcon';
import { NAV_ITEMS } from '@/utils/IconData';
import './UserActionMenu.css';

export default function UserActionMenu() {
    return (
        <div className="icon-bar">
            <ul className="icon-bar__list">
                <li className="icon-bar__image-container">
                    {/* Image container for user avatar */}
                </li>
                {NAV_ITEMS.slice(0, 3).map(item => (
                    <NavIcon className="" key={item.id} icon={item.icon} />
                ))}
            </ul>
        </div>
    );
}
