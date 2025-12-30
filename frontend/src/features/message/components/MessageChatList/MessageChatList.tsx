import React, { useState } from 'react';
import { useGroupChats } from '../../../group-chat/hooks/useGroupChats';
import { useAuthStore } from '../../../auth/store/auth.store';
import { GroupChat } from '../../../group-chat/types/groupChat.types';
import './MessageChatList.css';

interface MessageChatListProps {
    onSelectChat: (groupChat: GroupChat) => void;
    selectedChatId?: string;
}

/**
 * MessageChatList Component
 * Sidebar hiển thị danh sách group chats
 */
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
    const formatTime = (date?: Date) => {
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
            <div className="chat-list-header">
                <h2>Messages</h2>
            </div>

            {/* Search */}
            <div className="chat-list-search">
                <div className="search-input-wrapper">
                    <svg
                        className="search-icon"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                    >
                        <circle cx="11" cy="11" r="8"></circle>
                        <path d="m21 21-4.35-4.35"></path>
                    </svg>
                    <input
                        type="text"
                        placeholder="Search chats..."
                        value={searchQuery}
                        onChange={e => setSearchQuery(e.target.value)}
                    />
                </div>
            </div>

            {/* Loading State */}
            {isLoading && (
                <div className="chat-list-loading">
                    <div className="spinner"></div>
                    <p>Loading chats...</p>
                </div>
            )}

            {/* Empty State */}
            {!isLoading && filteredChats.length === 0 && (
                <div className="chat-list-empty">
                    <div className="empty-icon">💬</div>
                    <p>
                        {searchQuery
                            ? 'No chats found'
                            : 'No chats yet. Start a conversation!'}
                    </p>
                </div>
            )}

            {/* Chat List */}
            {!isLoading && filteredChats.length > 0 && (
                <div className="chat-list-items">
                    {filteredChats.map(chat => (
                        <div
                            key={chat._id}
                            className={`chat-list-item ${
                                chat._id === selectedChatId ? 'active' : ''
                            }`}
                            onClick={() => onSelectChat(chat)}
                        >
                            <div className="chat-item-avatar">
                                {chat.avatar ? (
                                    <img src={chat.avatar} alt={chat.name} />
                                ) : (
                                    <div className="avatar-placeholder">
                                        {chat.name.charAt(0).toUpperCase()}
                                    </div>
                                )}
                            </div>

                            <div className="chat-item-content">
                                <div className="chat-item-header">
                                    <h4 className="chat-item-name">
                                        {chat.name}
                                    </h4>
                                    <span className="chat-item-time">
                                        {formatTime(chat.lastMessageAt)}
                                    </span>
                                </div>
                                <div className="chat-item-footer">
                                    <p className="chat-item-message">
                                        Click to view messages
                                    </p>
                                    {/* Unread badge (optional) */}
                                    {/* <span className="unread-badge">3</span> */}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};
