import { UserProfile, UserPost } from '../services/user.service';

/**
 * Toggle để bật/tắt mock data
 */
export const ENABLE_MOCK_DATA = import.meta.env.DEV;

/**
 *
 * Dùng khi backend chưa sẵn sàng
 */
export const getMockUserProfile = (userId: string): UserProfile => ({
    _id: userId,
    email: 'alex.sterling@example.com',
    username: 'alexsterling',
    avatar: 'https://i.pravatar.cc/150?u=alex',
    phone: '+1234567890',
    bio: 'Digital Artist & UI Designer | Creating beautiful experiences ✨',
    location: 'New York, USA',
    website: 'alexsterling.design',
    coverPhoto: 'https://images.unsplash.com/photo-1557683316-973673baf926',
    followers: 1250,
    following: 342,
});

/**
 * Mock posts của user
 */
export const getMockUserPosts = (userId: string): UserPost[] => [
    {
        _id: '1',
        content:
            'Just arrived at this amazing spot! The coffee here is absolutely incredible. ☕✨ #CoffeeLovers #MorningVibes',
        image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=600',
        createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        author: {
            _id: userId,
            username: 'alexsterling',
            avatar: 'https://i.pravatar.cc/150?u=alex',
        },
    },
    {
        _id: '2',
        content:
            'Working on some new UI designs today. Coding with React and Tailwind is so satisfying! 💻🚀 #WebDev #UIUX',
        image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600',
        createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
        author: {
            _id: userId,
            username: 'alexsterling',
            avatar: 'https://i.pravatar.cc/150?u=alex',
        },
    },
];

/**
 * Mock friend count
 */
export const getMockFriendCount = (): number => 128;

/**
 * Mock data cho photos (chưa có API)
 */
export const getMockPhotos = () => [
    {
        id: 1,
        url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4',
    },
    {
        id: 2,
        url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d',
    },
    {
        id: 3,
        url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb',
    },
];

/**
 * Mock data cho friends list (chưa có API)
 */
export const getMockFriends = () => [
    {
        id: 1,
        name: 'Jenny Wilson',
        avatar: 'https://i.pravatar.cc/150?u=jenny',
    },
    {
        id: 2,
        name: 'Robert Fox',
        avatar: 'https://i.pravatar.cc/150?u=robert',
    },
    {
        id: 3,
        name: 'Kristin Watson',
        avatar: 'https://i.pravatar.cc/150?u=kristin',
    },
];

/**
 * Mock data cho suggestions (chưa có API)
 */
export const getMockSuggestions = () => [
    {
        id: 1,
        name: 'Cameron',
        mutualFriends: 7,
        avatar: 'https://i.pravatar.cc/150?u=cameron',
    },
    {
        id: 2,
        name: 'Esther',
        mutualFriends: 12,
        avatar: 'https://i.pravatar.cc/150?u=esther',
    },
];
