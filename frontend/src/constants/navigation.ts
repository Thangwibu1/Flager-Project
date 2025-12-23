import { Home, Users, Video, Store } from 'lucide-react';
import { NavItem } from '../components/common/NavigationBar/NavIcons';

export const NAV_ITEMS: NavItem[] = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'friends', icon: Users, label: 'Friends' },
    { id: 'video', icon: Video, label: 'Watch' },
    { id: 'shop', icon: Store, label: 'Marketplace' },
];
