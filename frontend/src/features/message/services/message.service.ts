import { apiClient } from '@/api/axios-client';
import { GetMessagesResponse } from '../types/message.types';

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
            ? `/messages/group-chat/${groupChatId}?${queryString}`
            : `/messages/group-chat/${groupChatId}`;

        const response = await apiClient.get<GetMessagesResponse>(url);

        return response.data;
    }
}

// Export singleton instance
export default new MessageService();
