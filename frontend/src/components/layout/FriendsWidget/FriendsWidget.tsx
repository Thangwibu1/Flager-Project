import Card from '@/components/common/Card/Card';
import './FriendsWidget.css';

export interface Friend {
    id: string;
    name: string;
    avatar: string;
    username?: string;
}

export interface FriendsWidgetProps {
    friends: Friend[];
    totalCount?: number;
    maxDisplay?: number;
    onSeeAll?: () => void;
    onFriendClick?: (friendId: string) => void;
}

function FriendsWidget({
    friends,
    totalCount,
    maxDisplay = 6,
    onSeeAll,
    onFriendClick,
}: FriendsWidgetProps) {
    const displayFriends = friends.slice(0, maxDisplay);
    const count = totalCount || friends.length;

    return (
        <Card
            title="Friends"
            action={
                onSeeAll && (
                    <span className="widget-action" onClick={onSeeAll}>
                        See All
                    </span>
                )
            }
        >
            <div className="friends-widget">
                <p className="friends-widget__count">{count} friends</p>
                <div className="friends-widget__grid">
                    {displayFriends.map((friend) => (
                        <div
                            key={friend.id}
                            className="friends-widget__item"
                            onClick={() => onFriendClick?.(friend.id)}
                        >
                            <div className="friends-widget__avatar">
                                <img
                                    src={friend.avatar}
                                    alt={friend.name}
                                    className="friends-widget__avatar-img"
                                />
                            </div>
                            <p className="friends-widget__name">
                                {friend.name}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </Card>
    );
}

export default FriendsWidget;
