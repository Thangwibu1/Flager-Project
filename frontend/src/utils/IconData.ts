import { MdHomeFilled } from 'react-icons/md';
import { IoMdPeople } from 'react-icons/io';
import { FaStore } from 'react-icons/fa';
import { PiVideoFill } from 'react-icons/pi';
import { PiDotsNineBold } from 'react-icons/pi';
import { PiChatCircleDotsDuotone } from 'react-icons/pi';
import { IoMdNotifications } from 'react-icons/io';
import { IoPersonAddSharp } from 'react-icons/io5';
import { FaBookmark } from 'react-icons/fa';
import { MdOutlinePhotoLibrary } from 'react-icons/md';
import { MdEmojiEmotions } from 'react-icons/md';

export const NAV_ITEMS = [
    { id: 'home', icon: MdHomeFilled, label: 'Home' },
    { id: 'friends', icon: IoMdPeople, label: 'Friends' },
    { id: 'store', icon: FaStore, label: 'Store' },
    { id: 'video', icon: PiVideoFill, label: 'Video' },
    { id: 'more', icon: PiDotsNineBold, label: 'More' },
    { id: 'chat', icon: PiChatCircleDotsDuotone, label: 'Chat' },
    { id: 'notifications', icon: IoMdNotifications, label: 'Notifications' },
    { id: 'addFriend', icon: IoPersonAddSharp, label: 'AddFriend' },
    { id: 'bookmarks', icon: FaBookmark, label: 'Bookmarks' },
    { id: 'photos', icon: MdOutlinePhotoLibrary, label: 'Photos' },
    { id: 'emoji', icon: MdEmojiEmotions, label: 'Emoji' },
];
