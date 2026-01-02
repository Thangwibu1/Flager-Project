import { apiClient } from "@/api/axios-client";

export const postService = {
    getUserPosts: async (userId: string) => {
        const response = await apiClient.get(`/users/${userId}/posts`);
        return response.data;
    },
};