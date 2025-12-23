import NavIcon from '@/components/common/NavIcon/NavIcon';
import { NAV_ITEMS } from '@/utils/IconData';

export default function IconBar() {
    return (
        <div>
            <ul>
                {NAV_ITEMS.map(item => (
                    <NavIcon className="" key={item.id} icon={item.icon} />
                ))}
            </ul>
        </div>
    );
}
