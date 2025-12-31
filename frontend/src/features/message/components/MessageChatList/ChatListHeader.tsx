import React from 'react';

interface ChatListHeaderProps {
    title?: string;
}

/**
 * ChatListHeader Component
 * Header section of the chat list with title
 */
export const ChatListHeader: React.FC<ChatListHeaderProps> = ({
    title = 'Messages',
}) => {
    return (
        <div className="chat-list-header">
            <h2>{title}</h2>
        </div>
    );
};
