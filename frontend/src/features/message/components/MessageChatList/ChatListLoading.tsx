import React from 'react';

interface ChatListLoadingProps {
    message?: string;
}

/**
 * ChatListLoading Component
 * Loading state with spinner
 */
export const ChatListLoading: React.FC<ChatListLoadingProps> = ({
    message = 'Loading chats...',
}) => {
    return (
        <div className="chat-list-loading">
            <div className="spinner"></div>
            <p>{message}</p>
        </div>
    );
};
