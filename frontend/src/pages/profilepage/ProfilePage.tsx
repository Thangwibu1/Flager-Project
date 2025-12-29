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
import LogoSearch from '@/components/layout/LogoSearch/LogoSearch';

import {
    useUserProfile,
    useFriendCount,
    useUserPosts,
} from '@/hooks/useProfileQuery';
import { useAuthStore } from '@/store/slices/authSlice';

import './ProfilePage.css';
import LogoBar from '@/components/Layout/LogoBar/LogoBar';

export function ProfilePage() {
    const [activeTab, setActiveTab] = useState('posts');

    // Get userId
    const { userId: urlUserId } = useParams<{ userId: string }>();
    const currentUser = useAuthStore(state => state.user);
    const userId = urlUserId || currentUser?.id || '';

    // Fetch data
    const { data: userProfile, isLoading: profileLoading } =
        useUserProfile(userId);
    const { data: friendCount } = useFriendCount(userId);
    const { data: userPosts } = useUserPosts(userId, 1, 100);

    // Determine if viewing own profile
    const isOwner = userId === currentUser?.id;

    // Mock data for UI testing
    const MOCK_USER_PROFILE = {
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
    };

    const MOCK_POSTS = [
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

    const MOCK_FRIEND_COUNT = 128;

    // Use API data - for UI testing
    const displayProfile = userProfile || MOCK_USER_PROFILE;
    const displayPosts =
        userPosts && userPosts.length > 0 ? userPosts : MOCK_POSTS;
    const displayFriendCount = friendCount ?? MOCK_FRIEND_COUNT;

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

    // Mock photo data (No backend data)
    const photos = [
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

    // Mock friend data (No backend data)
    const friends = [
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

    // Mock suggestions (No backend data)
    const suggestions = [
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

    // Profile tabs data (using real API data with mock fallback)
    const tabs = [
        { id: 'posts', label: 'Posts', count: displayPosts.length },
        { id: 'about', label: 'About' },
        { id: 'friends', label: 'Friends', count: displayFriendCount },
        { id: 'photos', label: 'Photos', count: photos.length },
        { id: 'videos', label: 'Videos' },
    ];

    // Loading state
    if (profileLoading) {
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
                                canEdit={isOwner}
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
