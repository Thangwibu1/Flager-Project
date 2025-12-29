import { apiClient } from '@/api/axios-client';

export interface UserProfile {
    _id: string;
    email: string;
    username: string;
    avatar: string;
    phone: string;
    bio?: string;
    location?: string;
    website?: string;
    coverPhoto?: string;
    followers?: number;
    following?: number;
}

export interface UserPost {
    _id: string;
    content: string;
    image?: string;
    createdAt: string;
    author: {
        _id: string;
        username: string;
        avatar: string;
    };
}

export interface FriendCount {
    totalFriends: number;
}

class UserService {
    /**
     * Get user profile by userId
     * GET /users/:userId
     */
    async getUserProfile(userId: string): Promise<UserProfile> {
        const response = await apiClient.get(`/users/${userId}`);
        return response.data.data.user;
    }

    /**
     * Get user's posts
     * GET /users/:userId/posts
     */
    async getUserPosts(
        userId: string,
        page = 1,
        limit = 10
    ): Promise<UserPost[]> {
        const response = await apiClient.get(`/users/${userId}/posts`, {
            params: { page, limit },
        });
        return response.data.data.posts || [];
    }

    /**
     * Get total friend count
     * GET /users/:userId/friends/total
     */
    async getFriendCount(userId: string): Promise<number> {
        const response = await apiClient.get(`/users/${userId}/friends/total`);
        return response.data.data.totalFriends || 0;
    }
}

export const userService = new UserService();
