export interface User {
    id: string;
    name: string;
    username: string;
    email?: string;
    avatar: string;
    bio?: string;
    location?: string;
    website?: string;
    isVerified: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface UserStats {
    followersCount: number;
    followingCount: number;
    postsCount: number;
    photosCount?: number;
}

export interface UserRelationship {
    isOwner: boolean;
    isFollowing: boolean;
    isFollower: boolean;
    isBlocked: boolean;
    isMuted: boolean;
}
