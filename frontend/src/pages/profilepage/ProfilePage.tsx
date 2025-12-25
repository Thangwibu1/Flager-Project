import IconBar from '@/components/Layout/IconBar/IconBar';
import LogoBar from '@/components/Layout/LogoBar/LogoBar';
import UserActionMenu from '@/components/Layout/UserActionMenu/UserActionMenu';
import Navbar from '@components/Layout/Navbar/Navbar';
import Header from '@/components/Layout/Header/Header';
import ProfileCover from '@/components/Layout/ProfileCover/ProfileCover';
import ProfileHeader from '@/components/Layout/ProfileHeader/ProfileHeader';
import ProfileInfo from '@/components/Layout/ProfileInfo/ProfileInfo';
import ProfileTabs from '@/components/Layout/ProfileTabs/ProfileTabs';
import './ProfilePage.css';

export function ProfilePage() {
    // TODO: Manage active tab state
    // const [activeTab, setActiveTab] = useState('posts');
    const activeTab = 'posts'; // Placeholder

    return (
        <div className="profile-page">
            <Navbar
                components={{
                    left: <LogoBar />,
                    center: <IconBar />,
                    right: <UserActionMenu />,
                }}
            />
            
            {/* Header Section Wrapper */}
            <div className="profile-header-section">
                <Header
                    coverPhoto={
                        <ProfileCover
                            userId="123"
                            coverImageUrl="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200"
                            canEdit={false}
                        />
                    }
                    avatarAndInfo={
                        <ProfileHeader
                            avatar="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400"
                            avatarAlt="Alex Sterling"
                        >
                            <ProfileInfo
                                name="Alex Sterling"
                                username="alexsterling"
                                bio="Digital Artist & UI Designer | Creating beautiful experiences ✨"
                                location="New York, USA"
                                website="alexsterling.design"
                                followersCount={12500}
                                followingCount={342}
                                isVerified={true}
                                isFollowing={false}
                                isOwner={false}
                                onFollow={() => console.log('Follow clicked')}
                                onMessage={() => console.log('Message clicked')}
                            />
                        </ProfileHeader>
                    }
                />

                <ProfileTabs
                    tabs={[
                        { id: 'posts', label: 'Posts' },
                        { id: 'about', label: 'About' },
                        { id: 'friends', label: 'Friends', count: 1200 },
                        { id: 'photos', label: 'Photos' },
                        { id: 'videos', label: 'Videos' },
                    ]}
                    activeTab={activeTab}
                    onTabChange={(tabId: string) => {
                        console.log('Tab changed:', tabId);
                        // TODO: Update state and URL
                        // setActiveTab(tabId);
                        // navigate(`/profile/123?tab=${tabId}`);
                    }}
                />
            </div>

            {/* Content Container */}
            <div className="profile-content-wrapper">
                <div className="profile-page__content">
                    {/* TODO: Render content based on activeTab */}
                    <h2>Tab Content: {activeTab}</h2>
                    <p>Content for {activeTab} tab will go here...</p>
                </div>
            </div>
        </div>
    );
}
