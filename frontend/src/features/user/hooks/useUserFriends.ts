import { apiClient } from '@/api/axios-client';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1';

interface User {
    _id: string;
    username: string;
    email: string;
    avatar?: string;
}

/**
 * useUserFriends Hook with React Query
 *
 * Features:
 * - ✅ Auto caching với React Query
 * - ✅ Background refetch
 * - ✅ Stale-while-revalidate pattern
 * - ✅ Automatic retry on error
 *
 * @param userId - User ID to fetch friends for
 * @returns { friends, isLoading, error, refetch }
 *
 * @example
 * const { friends, isLoading, error } = useUserFriends('userId123');
 *
 * if (isLoading) return <Spinner />;
 * if (error) return <ErrorMessage error={error} />;
 *
 * return (
 *   <div>
 *     {friends.map(friend => <FriendCard key={friend._id} friend={friend} />)}
 *   </div>
 * );
 */
export const useUserFriends = (userId: string) => {
    // useQuery: React Query hook để fetch và cache data
    const {
        data, // Response data từ API
        isLoading, // True khi đang fetch lần đầu
        error, // Error object nếu request fail
        refetch, // Function để manually refetch
        isRefetching, // True khi đang refetch (background)
    } = useQuery({
        // Query key: Unique identifier cho cache
        // ['friends', userId] → Mỗi userId có cache riêng
        queryKey: ['friends', userId],

        // Query function: Async function để fetch data
        queryFn: async () => {
            // Validate userId
            if (!userId) {
                throw new Error('userId is required');
            }

            // Call API với axios
            const response = await apiClient.get(`/users/${userId}/friends`);

            // Return friends array từ response
            return response.data.data.friends || [];
        },

        // enabled: Chỉ fetch khi có userId
        enabled: !!userId,

        // staleTime: Data fresh trong 5 phút
        // Friends list không thay đổi thường xuyên
        staleTime: 1000 * 60 * 5, // 5 minutes

        // gcTime: Giữ cache trong 30 phút
        gcTime: 1000 * 60 * 30, // 30 minutes

        // refetchOnWindowFocus: Auto refetch khi focus window
        refetchOnWindowFocus: true,

        // refetchOnMount: Refetch khi component mount nếu data stale
        refetchOnMount: true,

        // retry: Retry 1 lần nếu fail
        retry: 1,

        // retryDelay: Exponential backoff
        retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000),
    });

    return {
        // data || []: Return empty array nếu data undefined
        friends: data || [],
        isLoading,
        error,
        refetch,
        isRefetching,
    };
};
