import { TiHomeOutline } from 'react-icons/ti';
import { MdOutlinePeopleAlt } from 'react-icons/md';
import { TbShoppingBagSearch } from 'react-icons/tb';
import { PiVideoBold } from 'react-icons/pi';
import { PiDotsNineBold } from 'react-icons/pi';
import { PiChatCircleDotsDuotone } from 'react-icons/pi';
import { IoMdNotifications } from 'react-icons/io';
import { IoPersonAddSharp } from 'react-icons/io5';
import { FaBookmark } from 'react-icons/fa';
import { MdOutlinePhotoLibrary } from 'react-icons/md';
import { MdEmojiEmotions } from 'react-icons/md';
import { CgProfile } from 'react-icons/cg';

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

export const NAV_ITEMS = [
    { id: 'home', icon: TiHomeOutline, label: 'Home' },
    { id: 'friends', icon: MdOutlinePeopleAlt, label: 'Friends' },
    { id: 'store', icon: TbShoppingBagSearch, label: 'Store' },
    { id: 'video', icon: PiVideoBold, label: 'Video' },
    { id: 'profile', icon: CgProfile, label: 'Profile' },
    { id: 'more', icon: PiDotsNineBold, label: 'More' },
    { id: 'chat', icon: PiChatCircleDotsDuotone, label: 'Chat' },
    { id: 'notifications', icon: IoMdNotifications, label: 'Notifications' },
    { id: 'addFriend', icon: IoPersonAddSharp, label: 'AddFriend' },
    { id: 'bookmarks', icon: FaBookmark, label: 'Bookmarks' },
    { id: 'photos', icon: MdOutlinePhotoLibrary, label: 'Photos' },
    { id: 'emoji', icon: MdEmojiEmotions, label: 'Emoji' },
];

export const SIDEBAR_NAV_ITEMS = [
    { id: 1, icon: Home, text: 'Home Feed', active: true },
    { id: 2, icon: Users, text: 'Friends' },
    { id: 3, icon: Store, text: 'Marketplace' },
    { id: 4, icon: PlayCircle, text: 'Watch' },
    { id: 5, icon: Bookmark, text: 'Saved' },
];

export const SIDEBAR_SHORTCUTS = [
    { id: 6, icon: Code, text: 'UI/UX Designers' },
    { id: 7, icon: Gamepad2, text: 'Gaming Community' },
    { id: 8, icon: Trees, text: 'Nature Lovers' },
];
