import NavIcon from '@/components/common/NavIcon/NavIcon';
import { SIDEBAR_NAV_ITEMS, SIDEBAR_SHORTCUTS } from '@/utils/IconData';
import './Sidebar.css';

export default function Sidebar() {
    return (
        <aside className="sidebar">
            <div className="sidebar-list">
                {SIDEBAR_NAV_ITEMS.map(item => (
                    <NavIcon
                        key={item.id}
                        icon={item.icon}
                        text={item.text}
                        size={14}
                        color={item.active ? 'white' : '#b0b3b8'}
                        className={`sidebar-item ${
                            item.active ? 'active' : ''
                        }`}
                    />
                ))}
            </div>

            <div className="sidebar-divider" />

            <div className="sidebar-shortcuts">
                <h3 className="shortcuts-title">YOUR SHORTCUTS</h3>
                {SIDEBAR_SHORTCUTS.map(item => (
                    <NavIcon
                        key={item.id}
                        icon={item.icon}
                        text={item.text}
                        size={14}
                        color="#b0b3b8"
                        className="sidebar-item"
                    />
                ))}
            </div>
        </aside>
    );
}
