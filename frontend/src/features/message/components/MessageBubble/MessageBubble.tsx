import React from 'react';
import { Message } from '../../types/message.types';
import './MessageBubble.css';

interface MessageBubbleProps {
    message: Message;
    isOwn: boolean;
}

/**
 * MessageBubble Component
 * Hiển thị một message bubble với styling khác nhau cho own vs other messages
 */
export const MessageBubble: React.FC<MessageBubbleProps> = ({
    message,
    isOwn,
}) => {
    // Format timestamp
    const formatTime = (date: Date) => {
        const messageDate = new Date(date);
        const now = new Date();
        const diffInHours =
            (now.getTime() - messageDate.getTime()) / (1000 * 60 * 60);

        if (diffInHours < 24) {
            // Today: Show time only
            return messageDate.toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit',
            });
        } else if (diffInHours < 48) {
            // Yesterday
            return 'Yesterday';
        } else {
            // Older: Show date
            return messageDate.toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
            });
        }
    };

    // Get status icon
    const getStatusIcon = () => {
        switch (message.status) {
            case 'sending':
                return <span className="status-icon sending">⏳</span>;
            case 'sent':
                return <span className="status-icon sent">✓</span>;
            case 'failed':
                return <span className="status-icon failed">❌</span>;
            default:
                return null;
        }
    };

    return (
        <div className={`message-bubble ${isOwn ? 'own' : 'other'}`}>
            <div className="bubble-content">
                <p className="message-text">{message.content}</p>

                <div className="bubble-footer">
                    <span className="message-time">
                        {formatTime(message.createdAt)}
                    </span>
                    {isOwn && getStatusIcon()}
                </div>

                {/* Reactions */}
                {message.reactions && message.reactions.length > 0 && (
                    <div className="message-reactions">
                        {message.reactions.map(reaction => (
                            <span key={reaction._id} className="reaction-item">
                                {reaction.type} {reaction.count}
                            </span>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};
