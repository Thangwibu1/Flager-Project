import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { MdWork, MdSchool, MdLocationOn, MdFavorite } from 'react-icons/md';

import IconBar from '@/components/Layout/IconBar/IconBar';
import Header from '@/components/Layout/Header/Header';
import ProfileCover from '@/components/Layout/ProfileCover/ProfileCover';
import ProfileHeader from '@/components/Layout/ProfileHeader/ProfileHeader';
import ProfileInfo from '@/components/Layout/ProfileInfo/ProfileInfo';
import ProfileTabs from '@/components/Layout/ProfileTabs/ProfileTabs';
import ProfileBody from '@/components/Layout/ProfileBody/ProfileBody';
import LeftSidebar from '@/components/Layout/LeftSidebar/LeftSidebar';
import UserActionMenu from '@/components/layout/UserActionMenu/UserActionMenu';
import Navbar from '@/components/layout/Navbar/Navbar';
import RightSidebar from '@/components/Layout/RightSidebar/RightSidebar';
import PostList from '@/components/layout/PostList/PostList';

import { useProfilePageData } from '@/features/user/hooks/useProfilePageData';
import { useAuthStore } from '@/store/slices/authSlice';
import {
    getMockUserProfile,
    getMockUserPosts,
    getMockFriendCount,
    getMockPhotos,
    getMockFriends,
    getMockSuggestions,
} from '@/features/user/mocks/mockData';

import './ProfilePage.css';
import LogoBar from '@/components/Layout/LogoBar/LogoBar';

export function ProfilePage() {
    const [activeTab, setActiveTab] = useState('posts');

    // Get userId
    const { userId: urlUserId } = useParams<{ userId: string }>();
    const currentUser = useAuthStore(state => state.user);
    const userId = urlUserId || currentUser?.id || '';

    // Fetch data
    const { profile, posts, friendCount } = useProfilePageData(
        userId,
        activeTab
    );

    // Determine if viewing own profile
    const isOwner = userId === currentUser?.id;

    // Display data với fallback sang mock khi API chưa có data
    const displayProfile = profile.data ?? getMockUserProfile(userId);
    const displayPosts =
        posts.data && posts.data.length > 0
            ? posts.data
            : getMockUserPosts(userId);
    const displayFriendCount = friendCount.data ?? getMockFriendCount();

    // Icon style for info cards
    const iconStyle = { fontSize: '1.5rem', color: 'var(--text-muted)' };

    // Build user info array from API data (with fallbacks)
    const userInfo = [
        {
            icon: <MdWork style={iconStyle} />,
            label: 'Director at',
            value: displayProfile.bio || 'Not specified',
            highlight: true,
        },
        {
            icon: <MdSchool style={iconStyle} />,
            label: 'Studied at',
            value: 'Art University',
            highlight: true,
        },
        {
            icon: <MdLocationOn style={iconStyle} />,
            label: 'Lives in',
            value: displayProfile.location || 'Not specified',
            highlight: true,
        },
        {
            icon: <MdFavorite style={iconStyle} />,
            label: '',
            value: 'Single',
            highlight: false,
        },
    ];

    // Mock data cho các phần chưa có API (photos, friends, suggestions)
    const photos = getMockPhotos();
    const friends = getMockFriends();
    const suggestions = getMockSuggestions();

    // Profile tabs data
    const tabs = [
        { id: 'posts', label: 'Posts', count: displayPosts.length },
        { id: 'about', label: 'About' },
        { id: 'friends', label: 'Friends', count: displayFriendCount },
        { id: 'photos', label: 'Photos', count: photos.length },
        { id: 'videos', label: 'Videos' },
    ];

    // Loading state
    if (profile.isLoading) {
        return (
            <div className="profile-page">
                <Navbar
                    components={{
                        left: <LogoBar />,
                        center: <IconBar />,
                        right: <UserActionMenu />,
                    }}
                />
                <div
                    style={{
                        textAlign: 'center',
                        padding: '2rem',
                        color: 'white',
                    }}
                >
                    Loading profile...
                </div>
            </div>
        );
    }

    // Error state
    if (!displayProfile) {
        return (
            <div className="profile-page">
                <Navbar
                    components={{
                        left: <LogoBar />,
                        center: <IconBar />,
                        right: <UserActionMenu />,
                    }}
                />
                <div
                    style={{
                        textAlign: 'center',
                        padding: '2rem',
                        color: 'white',
                    }}
                >
                    User not found
                </div>
            </div>
        );
    }

    return (
        <div className="profile-page">
            <div className="profile-page__container">
                <Navbar
                    components={{
                        left: <LogoBar />,
                        center: <IconBar />,
                        right: <UserActionMenu />,
                    }}
                />

                {/* Header Section */}
                <div className="profile-header-section">
                    <Header
                        coverPhoto={
                            <ProfileCover
                                coverImageUrl={
                                    displayProfile.coverPhoto ||
                                    'https://images.unsplash.com/photo-1557683316-973673baf926'
                                }
                                canEdit={true} 
                                //isOwner
                                // Để true để test thôi
                            />
                        }
                        avatarAndInfo={
                            <ProfileHeader
                                avatar={
                                    displayProfile.avatar ||
                                    'https://i.pravatar.cc/150'
                                }
                                avatarAlt={
                                    displayProfile.username || 'User avatar'
                                }
                            >
                                <ProfileInfo
                                    name={
                                        displayProfile.username ||
                                        displayProfile.email ||
                                        'Unknown User'
                                    }
                                    username={`@${
                                        displayProfile.username || 'user'
                                    }`}
                                    bio={displayProfile.bio || ''}
                                    location={displayProfile.location || ''}
                                    website={displayProfile.website || ''}
                                    followersCount={
                                        displayProfile.followers || 0
                                    }
                                    followingCount={
                                        displayProfile.following || 0
                                    }
                                    isVerified={false}
                                    isFollowing={false}
                                    isOwner={isOwner}
                                    onFollow={() => console.log('Follow')}
                                    onMessage={() => console.log('Message')}
                                    onEditProfile={() =>
                                        console.log('Edit profile')
                                    }
                                />
                            </ProfileHeader>
                        }
                    />

                    <ProfileTabs
                        tabs={tabs}
                        activeTab={activeTab}
                        onTabChange={(tabId: string) => {
                            setActiveTab(tabId);
                        }}
                    />
                </div>

                {/* 3-Column Body Layout */}
                <ProfileBody
                    left={
                        <LeftSidebar
                            userInfo={userInfo}
                            photos={photos}
                            friends={friends}
                        />
                    }
                    center={
                        <div className="profile-page__content">
                            <PostList />
                        </div>
                    }
                    right={<RightSidebar suggestions={suggestions} />}
                />
            </div>
        </div>
    );
}
