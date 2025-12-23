import { Bell, MessageSquare, Grid } from 'lucide-react';

/*
  Props: avatarUrl, notificationsCount, messagesCount
  Handle: onProfileClick
*/

interface UserActionMenuProps {
    avatarUrl: string;
    notificationsCount?: number;
    messagesCount?: number;
    onProfileClick?: () => void;
}

export const UserActionMenu = ({
    avatarUrl,
    notificationsCount = 0,
    messagesCount = 0,
    onProfileClick,
}: UserActionMenuProps) => {
    const ActionButton = ({
        icon: Icon,
        count,
        label,
    }: {
        icon: any;
        count: number;
        label: string;
    }) => (
        <button
            aria-label={label}
            className="w-10 h-10 rounded-full bg-[#1c1c1c] flex items-center justify-center text-gray-200 hover:bg-[#2a2a2a] transition-colors relative"
        >
            <Icon size={20} />
            {count > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] font-bold h-5 w-5 flex items-center justify-center rounded-full border-[3px] border-[#0a0a0a]">
                    {count > 9 ? '9+' : count}
                </span>
            )}
        </button>
    );

    return (
        <div className="flex items-center gap-2 sm:gap-3">
            <button
                aria-label="Menu"
                className="hidden sm:flex w-10 h-10 rounded-full bg-[#1c1c1c] items-center justify-center text-gray-200 hover:bg-[#2a2a2a] transition-colors"
            >
                <Grid size={20} />
            </button>

            {/* Các nút hành động */}
            <ActionButton
                icon={MessageSquare}
                count={messagesCount}
                label="Messages"
            />
            <ActionButton
                icon={Bell}
                count={notificationsCount}
                label="Notifications"
            />

            {/* Nút Avatar */}
            <button
                onClick={onProfileClick}
                aria-label="User Profile"
                className="ml-2 w-10 h-10 rounded-full overflow-hidden border border-gray-700 hover:border-gray-500 transition-all"
            >
                <img
                    src={avatarUrl}
                    alt="User"
                    className="w-full h-full object-cover"
                />
            </button>
        </div>
    );
};
