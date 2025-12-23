import { useState } from 'react';
import { Search } from 'lucide-react';

// Import components con
import { SearchInput } from '../common/NavigationBar/SearchInput';
import { NavIcons } from '../common/NavigationBar/NavIcons';
import { UserActionMenu } from '../common/NavigationBar/UserActionMenu';

// Import dữ liệu
import { NAV_ITEMS } from '../../constants/navigation';

export const Navbar = () => {
    const [activeTab, setActiveTab] = useState('home');

    // MOOCK DATA
    const currentUser = {
        avatarUrl:
            'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=60',
        notifications: 5,
        messages: 2,
    };

    return (
        <header className="sticky top-0 z-50 bg-[#0a0a0a] border-b border-gray-800 h-16 px-4">
            <div className="max-w-1920px mx-auto h-full grid grid-cols-[auto_1fr_auto] md:grid-cols-[1fr_auto_1fr] items-center gap-4">
                {/* --- KHU VỰC TRÁI --- */}
                <div className="flex items-center gap-2 md:gap-4 justify-start">
                    <div className="flex items-center gap-2 cursor-pointer shrink-0">
                        <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                            <span className="text-black font-bold text-xl leading-none pb-0.5">
                                S
                            </span>
                        </div>
                        <span className="text-white font-bold text-xl hidden xl:block">
                            SocialBW
                        </span>
                    </div>

                    <div className="hidden md:block w-full max-w-240px lg:max-w-280px">
                        <SearchInput
                            placeholder="Search friends, posts..."
                            onSearch={val => console.log('Searching:', val)}
                        />
                    </div>

                    <button
                        aria-label="Search"
                        className="md:hidden w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400"
                    >
                        <Search size={20} />
                    </button>
                </div>

                {/* --- KHU VỰC GIỮA --- */}
                <div className="flex justify-center">
                    <NavIcons
                        items={NAV_ITEMS}
                        activeTab={activeTab}
                        onTabChange={setActiveTab}
                    />
                </div>

                {/* --- KHU VỰC PHẢI --- */}
                <div className="justify-self-end">
                    <UserActionMenu
                        avatarUrl={currentUser.avatarUrl}
                        notificationsCount={currentUser.notifications}
                        messagesCount={currentUser.messages}
                        onProfileClick={() =>
                            console.log('Navigate to Profile')
                        }
                    />
                </div>
            </div>
        </header>
    );
};
