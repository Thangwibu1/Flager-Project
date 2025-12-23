import NavIcon from '@/components/common/NavIcon/NavIcon';
import { NAV_ITEMS } from '@/utils/IconData';
import './IconBar.css';

export default function IconBar() {
    return (
        <div className="icon-bar">
            <ul className="icon-bar__list">
                {/* Cân nhắc lại ở đây nha */}
                {NAV_ITEMS.slice(0, 4).map(item => (
                    <NavIcon className="" key={item.id} icon={item.icon} />
                ))}
            </ul>
        </div>
    );
}
