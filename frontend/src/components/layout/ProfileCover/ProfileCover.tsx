import  CoverPhoto  from '@/components/common/CoverPhoto/CoverPhoto';
import { FiCamera } from 'react-icons/fi';
import './ProfileCover.css';

interface ProfileCoverProps {
    userId?: string;
    coverImageUrl?: string;
    canEdit?: boolean;
    children?: React.ReactNode;
}

function ProfileCover({
    userId,
    coverImageUrl = 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4',
    canEdit = false,
    children,
}: ProfileCoverProps) {
    // TODO: Fetch user data based on userId
    // const { data: userData } = useUserQuery(userId);

    const handleEditCover = () => {
        console.log('Edit cover photo clicked');
        // TODO: Open upload modal
        // openCoverPhotoUploadModal();
    };

    return (
        <CoverPhoto
            coverImage={coverImageUrl}
            coverAlt="Profile cover photo"
            variant="profile"
            height="320px"
            actions={
                canEdit ? (
                    <button
                        className="cover-photo-action-btn"
                        onClick={handleEditCover}
                    >
                        <FiCamera size={16} />
                        <span>Edit Cover Photo</span>
                    </button>
                ) : undefined
            }
            overlayContent={children}
        />
    );
}

export default ProfileCover;
