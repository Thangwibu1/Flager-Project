import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { userService, UserProfile, UserPost } from '@/features/user/services/user.service';
import { USER_QUERY_CONFIG, USER_QUERY_KEYS } from '@/features/user/constants';

/**
 * Hook để fetch user profile data
 * @param userId - ID của user cần fetch
 * @param options - Options cho React Query (enabled, refetchInterval, etc.)
 * @returns Query result với data, isLoading, error, etc.
 */
export const useUserProfile = (
    userId: string | undefined,
    options?: Omit<UseQueryOptions<UserProfile>, 'queryKey' | 'queryFn'>
) => {
    return useQuery({
        queryKey: USER_QUERY_KEYS.profile(userId || ''),
        queryFn: () => userService.getUserProfile(userId!),
        enabled: !!userId,
        staleTime: USER_QUERY_CONFIG.PROFILE_STALE_TIME,
        ...options, 
    });
};

/**
 * Hook để fetch user's posts với pagination
 * @param userId - ID của user cần fetch posts
 * @param page - Số trang hiện tại (mặc định = 1)
 * @param limit - Số items mỗi trang (mặc định = 10)
 * @param options - Options cho React Query
 * @returns Query result với data, isLoading, error, etc.
 */
export const useUserPosts = (
    userId: string | undefined,
    page: number = USER_QUERY_CONFIG.INITIAL_PAGE,
    limit: number = USER_QUERY_CONFIG.DEFAULT_PAGE_SIZE,
    options?: Omit<UseQueryOptions<UserPost[]>, 'queryKey' | 'queryFn'>
) => {
    return useQuery({
        queryKey: USER_QUERY_KEYS.posts(userId || '', page, limit),
        queryFn: () => userService.getUserPosts(userId!, page, limit),
        enabled: !!userId,
        staleTime: USER_QUERY_CONFIG.POSTS_STALE_TIME,
        ...options, 
    });
};

/**
 * Hook để fetch user's friend count
 * @param userId - ID của user cần fetch friend count
 * @param options - Options cho React Query
 * @returns Query result với data, isLoading, error, etc.
 */
export const useFriendCount = (
    userId: string | undefined,
    options?: Omit<UseQueryOptions<number>, 'queryKey' | 'queryFn'>
) => {
    return useQuery({
        queryKey: USER_QUERY_KEYS.friendCount(userId || ''),
        queryFn: () => userService.getFriendCount(userId!),
        enabled: !!userId,
        staleTime: USER_QUERY_CONFIG.FRIENDS_STALE_TIME,
        ...options, 
    });
};
