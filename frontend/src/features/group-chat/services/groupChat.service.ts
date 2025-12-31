import { apiClient } from '@/api/axios-client';
import {
    GetGroupChatsResponse,
    GetGroupChatResponse,
} from '../types/groupChat.types';

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
        const response = await apiClient.get<GetGroupChatsResponse>(
            `/group-chats/user/${userId}`
        );

        return response.data;
    }

    /**
     * Get single group chat by ID
     * @param groupChatId - Group Chat ID
     * @returns Promise<GetGroupChatResponse>
     */
    async getGroupChatById(groupChatId: string): Promise<GetGroupChatResponse> {
        const response = await apiClient.get<GetGroupChatResponse>(
            `/group-chats/${groupChatId}`
        );

        return response.data;
    }
}

// Export singleton instance
export default new GroupChatService();
