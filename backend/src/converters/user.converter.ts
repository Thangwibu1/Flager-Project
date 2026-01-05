import { FullUser } from '../types/user/user.request';
import { UserProfileResponse } from '../types/user/user.response';
import { formatDate } from '../utils/formatter.util';

export const toUserProfile = (user: FullUser): UserProfileResponse => {
    return {
        id: user._id.toString(),
        username: user.username,
        avatar: user.avatar,
        bio: 'bio example',
        createdAt: formatDate(user.createdAt),
        email: user.email,
        phone: user.phone,
        updatedAt: formatDate(user.updatedAt),
        location: 'location example',
        website: 'website example'
    };
};
export const toMyProfile = (user: FullUser) => {
    return {
        id: user._id.toString(),
        username: user.username,
        email: user.email,
        phone: user.phone,
    };
};
