import React from 'react';
import { GroupChat } from '../../../group-chat/types/groupChat.types';
import './MessageChatHeader.css';

interface MessageChatHeaderProps {
    groupChat: GroupChat;
}

/**
 * MessageChatHeader Component
 * Header hiển thị thông tin group chat
 */
export const MessageChatHeader: React.FC<MessageChatHeaderProps> = ({
    groupChat,
}) => {
    return (
        <div className="chat-header">
            <div className="chat-header-info">
                <div className="chat-avatar">
                    {groupChat.avatar ? (
                        <img src={groupChat.avatar} alt={groupChat.name} />
                    ) : (
                        <div className="avatar-placeholder">
                            {groupChat.name.charAt(0).toUpperCase()}
                        </div>
                    )}
                </div>
                <div className="chat-details">
                    <h3 className="chat-name">{groupChat.name}</h3>
                    <p className="chat-members">
                        {groupChat.members?.length || 0} members
                    </p>
                </div>
            </div>

            <div className="chat-header-actions">
                <button className="action-button" title="Call">
                    <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                    >
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                    </svg>
                </button>
                <button className="action-button" title="Video Call">
                    <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                    >
                        <polygon points="23 7 16 12 23 17 23 7"></polygon>
                        <rect
                            x="1"
                            y="5"
                            width="15"
                            height="14"
                            rx="2"
                            ry="2"
                        ></rect>
                    </svg>
                </button>
                <button className="action-button" title="Info">
                    <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                    >
                        <circle cx="12" cy="12" r="10"></circle>
                        <line x1="12" y1="16" x2="12" y2="12"></line>
                        <line x1="12" y1="8" x2="12.01" y2="8"></line>
                    </svg>
                </button>
            </div>
        </div>
    );
};
