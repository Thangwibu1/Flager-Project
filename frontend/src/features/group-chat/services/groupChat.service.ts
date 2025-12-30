import axios from 'axios';
import {
    GetGroupChatsResponse,
    GetGroupChatResponse,
} from '../types/groupChat.types';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1';

/**
 * GroupChat Service
 * Handles all GroupChat-related API calls
 */
class GroupChatService {
    /**
     * Get all group chats for a user
     * @param userId - User ID
     * @returns Promise<GetGroupChatsResponse>
     */
    async getGroupChatsByUserId(
        userId: string
    ): Promise<GetGroupChatsResponse> {
        const token = localStorage.getItem('accessToken');

        const response = await axios.get<GetGroupChatsResponse>(
            `${API_URL}/group-chats/user/${userId}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        return response.data;
    }

    /**
     * Get single group chat by ID
     * @param groupChatId - Group Chat ID
     * @returns Promise<GetGroupChatResponse>
     */
    async getGroupChatById(groupChatId: string): Promise<GetGroupChatResponse> {
        const token = localStorage.getItem('accessToken');

        const response = await axios.get<GetGroupChatResponse>(
            `${API_URL}/group-chats/${groupChatId}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        return response.data;
    }
}

// Export singleton instance
export default new GroupChatService();
