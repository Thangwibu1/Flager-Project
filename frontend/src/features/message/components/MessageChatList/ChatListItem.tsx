import React from 'react';
import { GroupChat } from '../../../group-chat/types/groupChat.types';

interface ChatListItemProps {
    chat: GroupChat;
    isActive: boolean;
    onSelect: (chat: GroupChat) => void;
    formatTime: (date?: Date) => string;
}

/**
 * ChatListItem Component
 * Individual chat item in the list
 */
export const ChatListItem: React.FC<ChatListItemProps> = ({
    chat,
    isActive,
    onSelect,
    formatTime,
}) => {
    return (
        <div
            className={`chat-list-item ${isActive ? 'active' : ''}`}
            onClick={() => onSelect(chat)}
        >
            {/* Avatar */}
            <div className="chat-item-avatar">
                {chat.avatar ? (
                    <img src={chat.avatar} alt={chat.name} />
                ) : (
                    <div className="avatar-placeholder">
                        {chat.name.charAt(0).toUpperCase()}
                    </div>
                )}
            </div>

            {/* Content */}
            <div className="chat-item-content">
                {/* Header: Name + Time */}
                <div className="chat-item-header">
                    <h4 className="chat-item-name">{chat.name}</h4>
                    <span className="chat-item-time">
                        {formatTime(chat.lastMessageAt)}
                    </span>
                </div>

                {/* Footer: Last message + Unread badge */}
                <div className="chat-item-footer">
                    <p className="chat-item-message">Click to view messages</p>
                    {/* Unread badge (optional) */}
                    {/* <span className="unread-badge">3</span> */}
                </div>
            </div>
        </div>
    );
};
