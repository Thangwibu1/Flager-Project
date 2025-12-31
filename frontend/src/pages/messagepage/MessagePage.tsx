import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MessageChatList } from '../../features/message/components/MessageChatList/MessageChatList';
import { MessageChatWindow } from '../../features/message/components/MessageChatWindow/MessageChatWindow';
import { GroupChat } from '../../features/group-chat/types/groupChat.types';
import { useGroupChats } from '../../features/group-chat/hooks/useGroupChats';
import { useAuthStore } from '../../features/auth/store/auth.store';
import './MessagePage.css';

/**
 * MessagePage Component
 * Main page displaying chat interface with sidebar and chat window
 *
 * URL Pattern: /messages/:chatId?
 * - /messages - No chat selected
 * - /messages/123abc - Chat with ID 123abc selected
 */
export const MessagePage: React.FC = () => {
    const { chatId } = useParams<{ chatId?: string }>();
    const navigate = useNavigate();
    const { user } = useAuthStore();
    const { groupChats } = useGroupChats(user?._id || '');
    const [selectedChat, setSelectedChat] = useState<GroupChat | null>(null);

    // Sync selectedChat with URL chatId
    useEffect(() => {
        if (chatId && groupChats.length > 0) {
            // Find chat by ID from URL
            const chat = groupChats.find(c => c._id === chatId);
            if (chat) {
                setSelectedChat(chat);
            } else {
                // Chat not found, redirect to messages
                navigate('/messages', { replace: true });
            }
        } else if (!chatId) {
            // No chatId in URL, clear selection
            setSelectedChat(null);
        }
    }, [chatId, groupChats, navigate]);

    const handleSelectChat = (groupChat: GroupChat) => {
        // Update URL when chat is selected
        navigate(`/messages/${groupChat._id}`);
        setSelectedChat(groupChat);
    };

    return (
        <div className="message-page">
            {/* Sidebar - Chat List */}
            <div className="message-page-sidebar">
                <MessageChatList
                    onSelectChat={handleSelectChat}
                    selectedChatId={selectedChat?._id}
                />
            </div>

            {/* Main Content - Chat Window */}
            <div className="message-page-content">
                {selectedChat ? (
                    <MessageChatWindow groupChat={selectedChat} />
                ) : (
                    <div className="no-chat-selected">
                        <div className="no-chat-icon">💬</div>
                        <h2>Select a chat to start messaging</h2>
                        <p>Choose a conversation from the sidebar to begin</p>
                    </div>
                )}
            </div>
        </div>
    );
};
