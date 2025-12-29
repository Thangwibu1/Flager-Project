import { useQuery } from '@tanstack/react-query';
import { userService } from '@/services/user.service';

/**
 * Hook to fetch user profile data
 */
export const useUserProfile = (userId: string | undefined) => {
    return useQuery({
        queryKey: ['user', 'profile', userId],
        queryFn: () => userService.getUserProfile(userId!),
        enabled: !!userId, 
        staleTime: 5 * 60 * 1000, 
    });
};

/**
 * Hook to fetch user's posts
 */
export const useUserPosts = (userId: string | undefined, page = 1, limit = 10) => {
    return useQuery({
        queryKey: ['user', 'posts', userId, page, limit],
        queryFn: () => userService.getUserPosts(userId!, page, limit),
        enabled: !!userId,
        staleTime: 2 * 60 * 1000, 
    });
};

/**
 * Hook to fetch user's friend count
 */
export const useFriendCount = (userId: string | undefined) => {
    return useQuery({
        queryKey: ['user', 'friendCount', userId],
        queryFn: () => userService.getFriendCount(userId!),
        enabled: !!userId,
        staleTime: 5 * 60 * 1000,
    });
};
