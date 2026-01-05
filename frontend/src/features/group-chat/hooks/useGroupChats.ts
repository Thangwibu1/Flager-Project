import { useQuery } from '@tanstack/react-query';
import groupChatService from '../services/groupChat.service';
import { GroupChat } from '../types/groupChat.types';

/**
 * useGroupChats Hook with React Query
 *
 * Features:
 * - ✅ Auto caching với React Query
 * - ✅ Background refetch
 * - ✅ Stale-while-revalidate pattern
 * - ✅ Automatic retry on error
 *
 * @param userId - User ID to fetch group chats for
 * @returns { groupChats, isLoading, error, refetch }
 *
 * @example
 * const { groupChats, isLoading, error, refetch } = useGroupChats('userId123');
 *
 * if (isLoading) return <Spinner />;
 * if (error) return <ErrorMessage error={error} />;
 *
 * return (
 *   <div>
 *     {groupChats.map(chat => <ChatListItem key={chat._id} chat={chat} />)}
 *     <button onClick={() => refetch()}>Refresh</button>
 *   </div>
 * );
 */
export const useGroupChats = (userId: string) => {
    // useQuery: React Query hook để fetch và cache data
    const {
        data, // Response data từ API
        isLoading, // True khi đang fetch lần đầu
        error, // Error object nếu request fail
        refetch, // Function để manually refetch
        isRefetching, // True khi đang refetch (background)
    } = useQuery({
        // Query key: Unique identifier cho cache
        // Format: ['resource', ...params]
        queryKey: ['groupChats', userId],

        // Query function: Async function để fetch data
        // Phải return Promise
        queryFn: async () => {
            // Validate userId
            if (!userId) {
                throw new Error('userId is required');
            }

            // Call service để fetch data
            const response = await groupChatService.getGroupChatsByUserId(
                userId
            );

            // Return data từ response
            // React Query sẽ cache data này với key ['groupChats', userId]
            return response.data.groupChats;
        },

        // enabled: Chỉ fetch khi condition = true
        // Nếu false, query sẽ không chạy
        enabled: !!userId,

        // staleTime: Thời gian data được coi là "fresh" (ms)
        // Trong thời gian này, React Query sẽ return cached data
        // Không fetch lại từ server
        staleTime: 1000 * 60 * 5, // 5 minutes

        // cacheTime: Thời gian giữ data trong cache (ms)
        // Sau thời gian này, cache sẽ bị xóa nếu không có component nào dùng
        // Renamed to gcTime in React Query v5
        gcTime: 1000 * 60 * 30, // 30 minutes

        // refetchOnWindowFocus: Auto refetch khi user focus lại window
        // Useful để sync data khi user quay lại tab
        refetchOnWindowFocus: true,

        // refetchOnMount: Refetch khi component mount
        // 'always': Luôn refetch
        // true: Refetch nếu data stale
        // false: Không refetch
        refetchOnMount: true,

        // retry: Số lần retry khi request fail
        // false: Không retry
        // number: Retry n lần
        // function: Custom retry logic
        retry: 1,

        // retryDelay: Delay giữa các lần retry (ms)
        // number: Fixed delay
        // function: Custom delay (exponential backoff)
        retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000),
    });

    return {
        // data || []: Nếu data undefined, return empty array
        groupChats: data || [],
        isLoading,
        error,
        refetch,
        isRefetching,
    };
};
