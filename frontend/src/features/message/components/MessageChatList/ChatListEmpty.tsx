import React from 'react';

interface ChatListEmptyProps {
    hasSearchQuery: boolean;
    icon?: string;
    emptyMessage?: string;
    noResultsMessage?: string;
}

/**
 * ChatListEmpty Component
 * Empty state when no chats are available
 */
export const ChatListEmpty: React.FC<ChatListEmptyProps> = ({
    hasSearchQuery,
    icon = '💬',
    emptyMessage = 'No chats yet. Start a conversation!',
    noResultsMessage = 'No chats found',
}) => {
    return (
        <div className="chat-list-empty">
            <div className="empty-icon">{icon}</div>
            <p>{hasSearchQuery ? noResultsMessage : emptyMessage}</p>
        </div>
    );
};
