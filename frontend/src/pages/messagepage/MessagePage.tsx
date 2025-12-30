import React, { useState } from 'react';
import { MessageChatList } from '../../features/message/components/MessageChatList/MessageChatList';
import { MessageChatWindow } from '../../features/message/components/MessageChatWindow/MessageChatWindow';
import { GroupChat } from '../../features/group-chat/types/groupChat.types';
import './MessagePage.css';

/**
 * MessagePage Component
 * Main page hiển thị chat interface với sidebar và chat window
 */
export const MessagePage: React.FC = () => {
    const [selectedChat, setSelectedChat] = useState<GroupChat | null>(null);

    const handleSelectChat = (groupChat: GroupChat) => {
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
