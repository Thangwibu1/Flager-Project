import React, { useState } from 'react';
import { useGroupChats } from '../../../group-chat/hooks/useGroupChats';
import { useAuthStore } from '../../../auth/store/auth.store';
import { GroupChat } from '../../../group-chat/types/groupChat.types';
import { ChatListHeader } from './ChatListHeader';
import { ChatListSearch } from './ChatListSearch';
import { ChatListLoading } from './ChatListLoading';
import { ChatListEmpty } from './ChatListEmpty';
import { ChatListItem } from './ChatListItem';
import './MessageChatList.css';

interface MessageChatListProps {
    onSelectChat: (groupChat: GroupChat) => void;
    selectedChatId?: string;
}

export const MessageChatList: React.FC<MessageChatListProps> = ({
    onSelectChat,
    selectedChatId,
}) => {
    const { user } = useAuthStore();
    const { groupChats, isLoading, error } = useGroupChats(user?._id || '');
    const [searchQuery, setSearchQuery] = useState('');

    // Log for debugging
    console.log('User:', user);
    console.log('Group Chats:', groupChats);
    console.log('Loading:', isLoading);
    console.log('Error:', error);

    // Filter chats by search query
    const filteredChats = groupChats.filter(chat =>
        chat.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Format last message time
    const formatTime = (date?: Date): string => {
        if (!date) return '';
        const messageDate = new Date(date);
        const now = new Date();
        const diffInHours =
            (now.getTime() - messageDate.getTime()) / (1000 * 60 * 60);

        if (diffInHours < 1) {
            return 'Just now';
        } else if (diffInHours < 24) {
            return messageDate.toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit',
            });
        } else if (diffInHours < 48) {
            return 'Yesterday';
        } else {
            return messageDate.toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
            });
        }
    };

    return (
        <div className="chat-list">
            {/* Header */}
            <ChatListHeader />

            {/* Search */}
            <ChatListSearch value={searchQuery} onChange={setSearchQuery} />

            {/* Loading State */}
            {isLoading && <ChatListLoading />}

            {/* Empty State */}
            {!isLoading && filteredChats.length === 0 && (
                <ChatListEmpty hasSearchQuery={!!searchQuery} />
            )}

            {/* Chat List */}
            {!isLoading && filteredChats.length > 0 && (
                <div className="chat-list-items">
                    {filteredChats.map(chat => (
                        <ChatListItem
                            key={chat._id}
                            chat={chat}
                            isActive={chat._id === selectedChatId}
                            onSelect={onSelectChat}
                            formatTime={formatTime}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};
