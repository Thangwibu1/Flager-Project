import React, { useEffect, useRef } from 'react';
import { useGroupChatMessages } from '../../hooks/useGroupChatMessages';
import { useAuthStore } from '../../../auth/store/auth.store';
import { MessageBubble } from '../MessageBubble/MessageBubble';
import { MessageInput } from '../MessageInput/MessageInput';
import { MessageChatHeader } from '../MessageChatHeader/MessageChatHeader';
import { GroupChat } from '../../../group-chat/types/groupChat.types';
import './MessageChatWindow.css';

interface MessageChatWindowProps {
    groupChat: GroupChat;
}

/**
 * MessageChatWindow Component
 * Container chính hiển thị chat window với header, messages, và input
 */
export const MessageChatWindow: React.FC<MessageChatWindowProps> = ({
    groupChat,
}) => {
    const { user } = useAuthStore();
    const {
        messages,
        isLoading,
        sendMessage,
        isSending,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
    } = useGroupChatMessages(groupChat._id);

    const messagesEndRef = useRef<HTMLDivElement>(null);
    const messagesContainerRef = useRef<HTMLDivElement>(null);

    // Auto-scroll to bottom when new message arrives
    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages]);

    // Handle send message
    const handleSendMessage = (content: string) => {
        sendMessage(content);
    };

    // Handle load more
    const handleLoadMore = () => {
        if (hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
        }
    };

    return (
        <div className="chat-window">
            {/* Header */}
            <MessageChatHeader groupChat={groupChat} />

            {/* Messages Container */}
            <div className="messages-container" ref={messagesContainerRef}>
                {/* Load More Button */}
                {hasNextPage && (
                    <div className="load-more-container">
                        <button
                            className="load-more-button"
                            onClick={handleLoadMore}
                            disabled={isFetchingNextPage}
                        >
                            {isFetchingNextPage ? (
                                <span className="loading-spinner">⏳</span>
                            ) : (
                                'Load older messages'
                            )}
                        </button>
                    </div>
                )}

                {/* Loading State */}
                {isLoading && (
                    <div className="loading-state">
                        <div className="spinner"></div>
                        <p>Loading messages...</p>
                    </div>
                )}

                {/* Empty State */}
                {!isLoading && messages.length === 0 && (
                    <div className="empty-state">
                        <div className="empty-icon">💬</div>
                        <h3>No messages yet</h3>
                        <p>Start the conversation by sending a message!</p>
                    </div>
                )}

                {/* Messages List */}
                {!isLoading && messages.length > 0 && (
                    <div className="messages-list">
                        {messages.map(message => (
                            <MessageBubble
                                key={message._id}
                                message={message}
                                isOwn={message.senderId === user?._id}
                            />
                        ))}
                        <div ref={messagesEndRef} />
                    </div>
                )}
            </div>

            {/* Input */}
            <MessageInput onSend={handleSendMessage} disabled={isSending} />
        </div>
    );
};
