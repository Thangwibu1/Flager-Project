import NavIcon from '@/components/common/NavIcon/NavIcon';
import './ProfileHeader.css';

interface ProfileHeaderProps {
    avatar: string;
    avatarAlt: string;
    children: React.ReactNode;
}

function ProfileHeader({ avatar, avatarAlt, children }: ProfileHeaderProps) {
    return (
        <div className="profile-header-wrapper">
            <div className="profile-header-wrapper__avatar">
                <NavIcon
                    src={avatar}
                    alt={avatarAlt}
                    size={100}
                    rounded="full"
                    className="profile-avatar"
                />
            </div>
            <div className="profile-header-wrapper__info">
                {children}
            </div>
        </div>
    );
}

export default ProfileHeader;
