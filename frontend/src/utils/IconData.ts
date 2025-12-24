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

export const NAV_ITEMS = [
    { id: 'home', icon: TiHomeOutline, label: 'Home' },
    { id: 'friends', icon: MdOutlinePeopleAlt, label: 'Friends' },
    { id: 'store', icon: TbShoppingBagSearch, label: 'Store' },
    { id: 'video', icon: PiVideoBold, label: 'Video' },
    { id: 'more', icon: PiDotsNineBold, label: 'More' },
    { id: 'chat', icon: PiChatCircleDotsDuotone, label: 'Chat' },
    { id: 'notifications', icon: IoMdNotifications, label: 'Notifications' },
    { id: 'addFriend', icon: IoPersonAddSharp, label: 'AddFriend' },
    { id: 'bookmarks', icon: FaBookmark, label: 'Bookmarks' },
    { id: 'photos', icon: MdOutlinePhotoLibrary, label: 'Photos' },
    { id: 'emoji', icon: MdEmojiEmotions, label: 'Emoji' },
];
