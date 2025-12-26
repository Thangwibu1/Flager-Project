import { UserPlus } from 'lucide-react';

interface FollowerProps {
    user: {
        id: number | string;
        name: string;
        handle: string;
        avatar: string;
    };
    nameSize?: string;
    handleSize?: string;
}

export default function Follower({
    user: { name, handle, avatar },
    nameSize = '15px',
    handleSize = '13px',
}: FollowerProps) {
    return (
        <div className="follower-item">
            <div className="follower-info">
                <img src={avatar} alt={name} className="mini-avatar" />
                <div>
                    <p className="follower-name" style={{ fontSize: nameSize }}>
                        {name}
                    </p>
                    <span
                        className="follower-handle"
                        style={{ fontSize: handleSize }}
                    >
                        {handle}
                    </span>
                </div>
            </div>
            <div className="follower-add-btn">
                <UserPlus size={18} color="#e4e6eb" />
            </div>
        </div>
    );
}
