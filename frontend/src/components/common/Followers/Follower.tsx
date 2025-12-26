import { UserPlus } from 'lucide-react';

interface FollowerProps {
    name: string;
    handle: string;
    avatar: string;
}

export default function Follower({ name, handle, avatar }: FollowerProps) {
    return (
        <div className="follower-item">
            <div className="follower-info">
                <img src={avatar} alt={name} className="mini-avatar" />
                <div>
                    <p className="follower-name">{name}</p>
                    <span className="follower-handle">{handle}</span>
                </div>
            </div>
            <div className="follower-add-btn">
                <UserPlus size={18} color="#e4e6eb" />
            </div>
        </div>
    );
}
