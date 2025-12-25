import NavIcon from '@/components/common/NavIcon/NavIcon';
import { NAV_ITEMS } from '@/utils/IconData';
import './IconBar.css';

const START_INDEX = 0;
const END_INDEX = 4;

export default function IconBar() {
    return (
        <div className="icon-bar">
            <ul className="icon-bar__list">
                {NAV_ITEMS.slice(START_INDEX, END_INDEX).map(item => (
                    <NavIcon key={item.id} icon={item.icon} />
                ))}
            </ul>
        </div>
    );
}
