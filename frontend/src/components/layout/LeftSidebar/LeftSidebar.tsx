import InfoCard from '@/components/Layout/InfoCard/InfoCard';
import PhotosWidget from '@/components/Layout/PhotosWidget/PhotosWidget';
import FriendsWidget from '@/components/Layout/FriendsWidget/FriendsWidget';
import './LeftSidebar.css';

export interface LeftSidebarProps {
    userInfo?: any[];
    photos?: any[];
    friends?: any[];
}

function LeftSidebar({ userInfo = [], photos = [], friends = [] }: LeftSidebarProps) {
    return (
        <div className="left-sidebar">
            <InfoCard
                items={userInfo}
                onEditDetails={() => console.log('Edit details clicked')}
            />

            <PhotosWidget
                photos={photos}
                totalCount={156}
                onSeeAll={() => console.log('See all photos')}
                onPhotoClick={(id) => console.log('Photo clicked:', id)}
            />

            <FriendsWidget
                friends={friends}
                totalCount={1245}
                onSeeAll={() => console.log('See all friends')}
                onFriendClick={(id) => console.log('Friend clicked:', id)}
            />
        </div>
    );
}

export default LeftSidebar;
