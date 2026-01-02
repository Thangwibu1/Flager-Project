import React from 'react';

interface ChatListSearchProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
}

/**
 * ChatListSearch Component
 * Search input for filtering chats
 */
export const ChatListSearch: React.FC<ChatListSearchProps> = ({
    value,
    onChange,
    placeholder = 'Search chats...',
}) => {
    return (
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
                    placeholder={placeholder}
                    value={value}
                    onChange={e => onChange(e.target.value)}
                />
            </div>
        </div>
    );
};
