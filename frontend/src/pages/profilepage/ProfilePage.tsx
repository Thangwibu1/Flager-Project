import IconBar from '@/components/layout/IconBar/IconBar';
import LogoBar from '@/components/layout/LogoBar/LogoBar';
import Header from '@/components/layout/Header/Header';
import ProfileCover from '@/components/layout/ProfileCover/ProfileCover';
import ProfileHeader from '@/components/layout/ProfileHeader/ProfileHeader';
import ProfileInfo from '@/components/layout/ProfileInfo/ProfileInfo';
import ProfileTabs from '@/components/layout/ProfileTabs/ProfileTabs';
import ProfileBody from '@/components/layout/ProfileBody/ProfileBody';
import LeftSidebar from '@/components/layout/LeftSidebar/LeftSidebar';
import { MdWork, MdSchool, MdLocationOn, MdFavorite } from 'react-icons/md';
import './ProfilePage.css';
import UserActionMenu from '@/components/layout/UserActionMenu/UserActionMenu';
import Navbar from '@/components/layout/Navbar/Navbar';
import RightSidebar from '@/components/layout/RightSidebar/RightSidebar';

export function ProfilePage() {
    const activeTab = 'posts';

    // --- Mock Data (Should be fetched from API) ---
    const iconStyle = { fontSize: '1.5rem', color: 'var(--text-muted)' };

    const userInfo = [
        {
            icon: <MdWork style={iconStyle} />,
            label: 'Director at',
            value: 'Design Co.',
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
            value: 'New York, NY',
            highlight: true,
        },
        {
            icon: <MdFavorite style={iconStyle} />,
            label: '',
            value: 'Single',
            highlight: false,
        },
    ];

    const photos = [
        {
            id: '1',
            url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400',
            alt: 'Photo 1',
        },
        {
            id: '2',
            url: 'https://images.unsplash.com/photo-1618556450994-a6a128ef0d9d?w=400',
            alt: 'Photo 2',
        },
        {
            id: '3',
            url: 'https://images.unsplash.com/photo-1618556450991-2f1af64e8191?w=400',
            alt: 'Photo 3',
        },
        {
            id: '4',
            url: 'https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?w=400',
            alt: 'Photo 4',
        },
    ];

    const friends = [
        { id: '1', name: 'Marcus', avatar: 'https://i.pravatar.cc/150?img=12' },
        { id: '2', name: 'Elena', avatar: 'https://i.pravatar.cc/150?img=5' },
        { id: '3', name: 'John', avatar: 'https://i.pravatar.cc/150?img=13' },
        { id: '4', name: 'David', avatar: 'https://i.pravatar.cc/150?img=14' },
        { id: '5', name: 'Sarah', avatar: 'https://i.pravatar.cc/150?img=9' },
        { id: '6', name: 'Mike', avatar: 'https://i.pravatar.cc/150?img=15' },
    ];

    const suggestions = [
        {
            id: '1',
            name: 'Jenny Wilson',
            username: 'jennywilson',
            avatar: 'https://i.pravatar.cc/150?img=1',
            mutualFriends: 12,
        },
        {
            id: '2',
            name: 'Robert Fox',
            username: 'robertfox',
            avatar: 'https://i.pravatar.cc/150?img=2',
            mutualFriends: 8,
        },
        {
            id: '3',
            name: 'Kristin Watson',
            username: 'kristinwatson',
            avatar: 'https://i.pravatar.cc/150?img=3',
            mutualFriends: 5,
        },
        {
            id: '4',
            name: 'Cameron',
            username: 'cameronw',
            avatar: 'https://i.pravatar.cc/150?img=4',
            mutualFriends: 15,
        },
        {
            id: '5',
            name: 'Esther',
            username: 'estherh',
            avatar: 'https://i.pravatar.cc/150?img=6',
            mutualFriends: 3,
        },
    ];
    // ----------------------------------------------

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

                {/* Header Section Wrapper */}
                <div className="profile-header-section">
                    <Header
                        coverPhoto={
                            <ProfileCover
                                coverImageUrl="https://i.pinimg.com/1200x/66/42/1a/66421a405ac7c4ca4e29b97b066c47f3.jpg"
                                canEdit={true}
                            />
                        }
                        avatarAndInfo={
                            <ProfileHeader
                                avatar="https://i.pinimg.com/736x/52/aa/9a/52aa9a7dcf0b72fd435ce6cd526981a1.jpg"
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
                                    onFollow={() =>
                                        console.log('Follow clicked')
                                    }
                                    onMessage={() =>
                                        console.log('Message clicked')
                                    }
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
                            {/* Mock Posts for Scroll Testing */}
                            {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
                                <div
                                    key={num}
                                    style={{
                                        background: 'var(--bg-card)',
                                        border: '1px solid var(--border-primary)',
                                        borderRadius: '0.75rem',
                                        padding: '1.5rem',
                                        marginBottom: '1rem',
                                    }}
                                >
                                    <h3
                                        style={{
                                            margin: '0 0 0.5rem 0',
                                            color: 'var(--text-primary)',
                                        }}
                                    >
                                        Post {num}
                                    </h3>
                                    <p
                                        style={{
                                            margin: '0',
                                            color: 'var(--text-secondary)',
                                            lineHeight: '1.6',
                                        }}
                                    >
                                        This is a sample post content for
                                        testing the scroll behavior. Lorem ipsum
                                        dolor sit amet, consectetur adipiscing
                                        elit. Sed do eiusmod tempor incididunt
                                        ut labore et dolore magna aliqua.
                                    </p>
                                    <div
                                        style={{
                                            marginTop: '1rem',
                                            padding: '0.5rem',
                                            background: 'var(--bg-hover)',
                                            borderRadius: '0.5rem',
                                        }}
                                    >
                                        <small
                                            style={{
                                                color: 'var(--text-muted)',
                                            }}
                                        >
                                            Posted 2 hours ago
                                        </small>
                                    </div>
                                </div>
                            ))}
                        </div>
                    }
                    right={<RightSidebar suggestions={suggestions} />}
                />
            </div>
        </div>
    );
}
