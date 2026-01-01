import React, { useState, useRef, useEffect } from 'react';
import './MessageInput.css';

interface MessageInputProps {
    onSend: (content: string) => void;
    onTyping?: (isTyping: boolean) => void;
    disabled?: boolean;
}

/**
 * MessageInput Component
 * Input để user gửi message với auto-resize và typing indicator
 */
export const MessageInput: React.FC<MessageInputProps> = ({
    onSend,
    onTyping,
    disabled = false,
}) => {
    const [content, setContent] = useState('');
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const typingTimeoutRef = useRef<number>();

    // Auto-resize textarea
    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = `${Math.min(
                textareaRef.current.scrollHeight,
                150
            )}px`;
        }
    }, [content]);

    // Typing indicator (debounced)
    useEffect(() => {
        if (content.length > 0 && onTyping) {
            onTyping(true);

            // Clear previous timeout
            if (typingTimeoutRef.current) {
                clearTimeout(typingTimeoutRef.current);
            }

            // Set new timeout
            typingTimeoutRef.current = setTimeout(() => {
                onTyping(false);
            }, 1000);
        }

        return () => {
            if (typingTimeoutRef.current) {
                clearTimeout(typingTimeoutRef.current);
            }
        };
    }, [content, onTyping]);

    // Send message
    const handleSend = () => {
        const trimmedContent = content.trim();
        if (trimmedContent && !disabled) {
            onSend(trimmedContent);
            setContent('');
            if (onTyping) onTyping(false);
        }
    };

    // Handle Enter key
    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <div className="message-input-container">
            <div className="message-input-wrapper">
                <textarea
                    ref={textareaRef}
                    className="message-input"
                    value={content}
                    onChange={e => setContent(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Type a message..."
                    disabled={disabled}
                    rows={1}
                />
                <button
                    className="send-button"
                    onClick={handleSend}
                    disabled={!content.trim() || disabled}
                >
                    <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <line x1="22" y1="2" x2="11" y2="13"></line>
                        <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                    </svg>
                </button>
            </div>
        </div>
    );
};
