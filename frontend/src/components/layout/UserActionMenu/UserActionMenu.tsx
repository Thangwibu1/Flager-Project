import NavIcon from '@/components/common/NavIcon/NavIcon';
import Avatar from '@/components/common/Avatar/Avatar';

import { NAV_ITEMS } from '@/utils/IconData';
import './UserActionMenu.css';

export default function UserActionMenu() {
    return (
        <div className="user-action-menu">
            <ul className="user-action-menu__list">
                {NAV_ITEMS.slice(4, 7).map(item => (
                    <NavIcon className="" key={item.id} icon={item.icon} />
                ))}
                <li className="user-action-menu__avatar-wrapper">
                    <Avatar
                        src=""
                        alt="User"
                        fallbackText="U"
                        className="user-action-menu__avatar"
                    />
                </li>
            </ul>
        </div>
    );
}
