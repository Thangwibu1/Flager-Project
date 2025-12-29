import { useUserProfile, useUserPosts, useFriendCount } from './userHooks';

/**
 * Interface cho return value của useProfilePageData
 */
export interface ProfilePageData {
    profile: {
        data: ReturnType<typeof useUserProfile>['data'];
        isLoading: boolean;
        error: ReturnType<typeof useUserProfile>['error'];
        isError: boolean;
    };
    posts: {
        data: ReturnType<typeof useUserPosts>['data'];
        isLoading: boolean;
        error: ReturnType<typeof useUserPosts>['error'];
        isError: boolean;
    };
    friendCount: {
        data: ReturnType<typeof useFriendCount>['data'];
        isLoading: boolean;
        error: ReturnType<typeof useFriendCount>['error'];
        isError: boolean;
    };
}

/**
 * @param userId - ID của user cần fetch data
 * @param activeTab - Tab hiện tại đang active ('posts', 'friends', etc.)
 * @returns Object chứa tất cả query results (profile, posts, friendCount)
 */
export const useProfilePageData = (
    userId: string,
    activeTab: string
): ProfilePageData => {
    const profileQuery = useUserProfile(userId);

    const postsQuery = useUserPosts(
        userId,
        1, 
        10,
        {
            // QUAN TRỌNG: Lazy loading
            enabled: activeTab === 'posts', 
        }
    );

    const friendCountQuery = useFriendCount(userId, {
        enabled: activeTab === 'friends', 
    });

    // Trả về object với structure rõ ràng
    return {
        profile: {
            data: profileQuery.data,
            isLoading: profileQuery.isLoading,
            error: profileQuery.error,
            isError: profileQuery.isError,
        },
        posts: {
            data: postsQuery.data,
            isLoading: postsQuery.isLoading,
            error: postsQuery.error,
            isError: postsQuery.isError,
        },
        friendCount: {
            data: friendCountQuery.data,
            isLoading: friendCountQuery.isLoading,
            error: friendCountQuery.error,
            isError: friendCountQuery.isError,
        },
    };
};
