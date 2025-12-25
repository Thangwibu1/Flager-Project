import { Button } from '@/components/common/Button/Button';
import { FiMapPin, FiLink, FiCheck } from 'react-icons/fi';
import './ProfileInfo.css';

export interface ProfileInfoProps {
    // User data
    name: string;
    username?: string;
    bio?: string;
    location?: string;
    website?: string;

    // Stats
    followersCount?: number;
    followingCount?: number;

    // Status
    isVerified?: boolean;
    isFollowing?: boolean;
    isOwner?: boolean;

    // Actions
    onFollow?: () => void;
    onMessage?: () => void;
    onEditProfile?: () => void;

    // Loading states
    followLoading?: boolean;
}

function ProfileInfo({
    name,
    username,
    bio,
    location,
    website,
    followersCount,
    followingCount,
    isVerified = false,
    isFollowing = false,
    isOwner = false,
    onFollow,
    onMessage,
    onEditProfile,
}: ProfileInfoProps) {
    return (
        <div className="profile-info">{/* Info & Actions */}
            <div className="profile-info__content">
                {/* Name & Bio */}
                <div className="profile-info__details">
                    <div className="profile-info__name-section">
                        <h1 className="profile-info__name">
                            {name}
                            {isVerified && (
                                <span className="profile-info__verified">
                                    <FiCheck size={20} />
                                </span>
                            )}
                        </h1>
                        {username && (
                            <p className="profile-info__username">
                                @{username}
                            </p>
                        )}
                    </div>

                    {bio && <p className="profile-info__bio">{bio}</p>}

                    {/* Location & Website */}
                    <div className="profile-info__meta">
                        {location && (
                            <div className="profile-info__meta-item">
                                <FiMapPin size={16} />
                                <span>{location}</span>
                            </div>
                        )}
                        {website && (
                            <div className="profile-info__meta-item">
                                <FiLink size={16} />
                                <a
                                    href={`https://${website}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    {website}
                                </a>
                            </div>
                        )}
                    </div>

                    {/* Stats */}
                    {(followersCount !== undefined ||
                        followingCount !== undefined) && (
                        <div className="profile-info__stats">
                            {followersCount !== undefined && (
                                <div className="profile-info__stat">
                                    <span className="profile-info__stat-value">
                                        {formatNumber(followersCount)}
                                    </span>
                                    <span className="profile-info__stat-label">
                                        Followers
                                    </span>
                                </div>
                            )}

                            {followingCount !== undefined && (
                                <div className="profile-info__stat">
                                    <span className="profile-info__stat-value">
                                        {formatNumber(followingCount)}
                                    </span>
                                    <span className="profile-info__stat-label">
                                        Following
                                    </span>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* Action Buttons */}
                <div className="profile-info__actions">
                    {isOwner ? (
                        <Button variant="secondary" onClick={onEditProfile}>
                            Edit Profile
                        </Button>
                    ) : (
                        <>
                            <Button
                                variant={isFollowing ? 'secondary' : 'primary'}
                                onClick={onFollow}
                            >
                                {isFollowing ? 'Following' : 'Follow'}
                            </Button>
                            <Button variant="secondary" onClick={onMessage}>
                                Message
                            </Button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

// Helper function to format numbers
function formatNumber(num: number): string {
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
}

export default ProfileInfo;
