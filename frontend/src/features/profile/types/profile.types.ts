import { User, UserStats, UserRelationship } from '../../user/types/user.types';

export interface Profile {
    user: User;
    coverPhoto: string;
    stats: UserStats;
    relationship: UserRelationship;
}

export interface ProfileUpdateData {
    name?: string;
    bio?: string;
    location?: string;
    website?: string;
    avatar?: string;
    coverPhoto?: string;
}
