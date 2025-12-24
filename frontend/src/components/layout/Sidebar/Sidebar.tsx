import {
    Home,
    Users,
    Store,
    PlayCircle,
    Bookmark,
    Code,
    Gamepad2,
    Trees,
} from 'lucide-react';

const SIDEBAR_ITEMS = [
    { id: 1, icon: Home, text: 'Home Feed', active: true },
    { id: 2, icon: Users, text: 'Friends' },
    { id: 3, icon: Store, text: 'Marketplace' },
    { id: 4, icon: PlayCircle, text: 'Watch' },
    { id: 5, icon: Bookmark, text: 'Saved' },
];

const SHORTCUT_ITEMS = [
    { id: 6, icon: Code, text: 'UI/UX Designers' },
    { id: 7, icon: Gamepad2, text: 'Gaming Community' },
    { id: 8, icon: Trees, text: 'Nature Lovers' },
];
import NavIcon from '@/components/common/NavIcon/NavIcon';
import './Sidebar.css';

export default function Sidebar() {
    return (
        <aside className="sidebar">
            {/* Phần Menu chính */}
            <div className="sidebar-list">
                {SIDEBAR_ITEMS.map(item => (
                    <NavIcon
                        key={item.id}
                        icon={item.icon}
                        text={item.text}
                        size={20}
                        color={item.active ? 'white' : '#b0b3b8'}
                        className={`sidebar-item ${
                            item.active ? 'active' : ''
                        }`}
                    />
                ))}
            </div>

            <div className="sidebar-divider"></div>

            {/* Phần Shortcuts */}
            <div className="sidebar-shortcuts">
                <h3 className="shortcuts-title">YOUR SHORTCUTS</h3>
                {SHORTCUT_ITEMS.map(item => (
                    <NavIcon
                        key={item.id}
                        icon={item.icon}
                        text={item.text}
                        size={20}
                        color="#b0b3b8"
                        className="sidebar-item shortcut-item"
                    />
                ))}
            </div>
        </aside>
    );
}