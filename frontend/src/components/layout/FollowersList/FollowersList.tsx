
import Follower from '@/components/common/Followers/Follower';
import './FollowersList.css';

const FOLLOWERS_DATA = [
    {
        id: 1,
        name: 'Ralph Edwards',
        handle: '@ralphie',
        avatar: 'https://i.pravatar.cc/150?u=1',
    },
    {
        id: 2,
        name: 'Eleanor Pena',
        handle: '@eleanorp',
        avatar: 'https://i.pravatar.cc/150?u=2',
    },
    {
        id: 3,
        name: 'Cody Fisher',
        handle: 'Follows you',
        avatar: 'https://i.pravatar.cc/150?u=3',
    },
];

export default function WhoToFollow() {
    return (
        <div className="sidebar-card">
            <div className="card-header">
                <h3>Who to follow</h3>
                <span className="see-all">See All</span>
            </div>
            <div className="card-content">
                {FOLLOWERS_DATA.map(user => (
                    <Follower
                        key={user.id}
                        user={user}
                        nameSize="14px"
                        handleSize="12px"
                    />
                ))}
            </div>
        </div>
    );
}
