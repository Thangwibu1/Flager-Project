import axios from 'axios';
import { GetMessagesResponse } from '../types/message.types';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1';

/**
 * Message Service
 * Handles all Message-related API calls
 */
class MessageService {
    /**
     * Get messages by group chat ID with pagination
     * @param groupChatId - Group Chat ID
     * @param options - Pagination options
     * @returns Promise<GetMessagesResponse>
     */
    async getMessagesByGroupChatId(
        groupChatId: string,
        options?: {
            limit?: number;
            before?: string; // messageId for lazy loading
        }
    ): Promise<GetMessagesResponse> {
        const token = localStorage.getItem('accessToken');

        // Build query params
        const params = new URLSearchParams();
        if (options?.limit) {
            params.append('limit', options.limit.toString());
        }
        if (options?.before) {
            params.append('before', options.before);
        }

        const queryString = params.toString();
        const url = queryString
            ? `${API_URL}/messages/group-chat/${groupChatId}?${queryString}`
            : `${API_URL}/messages/group-chat/${groupChatId}`;

        const response = await axios.get<GetMessagesResponse>(url, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data;
    }
}

// Export singleton instance
export default new MessageService();
