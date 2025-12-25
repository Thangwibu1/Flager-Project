import NavIcon from '@/components/common/NavIcon/NavIcon';
import { FiCamera } from 'react-icons/fi';
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
                <div className="profile-avatar-container">
                    <NavIcon
                        src={avatar}
                        alt={avatarAlt}
                        size={128} // Increased size
                        rounded="full"
                        className="profile-avatar"
                    />
                    <button className="profile-avatar-edit-btn">
                        <FiCamera size={18} />
                    </button>
                </div>
            </div>
            <div className="profile-header-wrapper__info">
                {children}
            </div>
        </div>
    );
}

export default ProfileHeader;
