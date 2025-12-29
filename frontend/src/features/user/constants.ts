/**
 * Cấu hình cho User queries
 * 
 */
export const USER_QUERY_CONFIG = {
    PROFILE_STALE_TIME: 5 * 60 * 1000, 
    POSTS_STALE_TIME: 2 * 60 * 1000,   
    FRIENDS_STALE_TIME: 5 * 60 * 1000, 
    
    DEFAULT_PAGE_SIZE: 10,      
    MAX_PAGE_SIZE: 50,         
    INITIAL_PAGE: 1,            
} as const;

/**
 * Query keys để sử dụng với React Query
 * 
 */
export const USER_QUERY_KEYS = {
    all: ['user'] as const,
    profile: (userId: string) => ['user', 'profile', userId] as const,
    posts: (userId: string, page: number, limit: number) => 
        ['user', 'posts', userId, page, limit] as const,
    friendCount: (userId: string) => ['user', 'friendCount', userId] as const,
} as const;
