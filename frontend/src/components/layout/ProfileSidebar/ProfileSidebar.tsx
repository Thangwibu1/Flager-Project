import InfoCard, { InfoItem } from '@/components/Layout/InfoCard/InfoCard';
import PhotosWidget, { Photo } from '@/components/Layout/PhotosWidget/PhotosWidget';
import FriendsWidget, { Friend } from '@/components/Layout/FriendsWidget/FriendsWidget';
import './ProfileSidebar.css';

export interface ProfileSidebarProps {
    userInfo?: {
        items: InfoItem[];
        onEditDetails?: () => void;
    };
    photos?: {
        items: Photo[];
        totalCount?: number;
        onSeeAll?: () => void;
        onPhotoClick?: (photoId: string) => void;
    };
    friends?: {
        items: Friend[];
        totalCount?: number;
        onSeeAll?: () => void;
        onFriendClick?: (friendId: string) => void;
    };
    className?: string;
}

function ProfileSidebar({
    userInfo,
    photos,
    friends,
    className = '',
}: ProfileSidebarProps) {
    return (
        <aside className={`profile-sidebar ${className}`}>
            {userInfo && (
                <InfoCard
                    items={userInfo.items}
                    onEditDetails={userInfo.onEditDetails}
                />
            )}

            {photos && photos.items.length > 0 && (
                <PhotosWidget
                    photos={photos.items}
                    totalCount={photos.totalCount}
                    onSeeAll={photos.onSeeAll}
                    onPhotoClick={photos.onPhotoClick}
                />
            )}

            {friends && friends.items.length > 0 && (
                <FriendsWidget
                    friends={friends.items}
                    totalCount={friends.totalCount}
                    onSeeAll={friends.onSeeAll}
                    onFriendClick={friends.onFriendClick}
                />
            )}
        </aside>
    );
}

export default ProfileSidebar;
