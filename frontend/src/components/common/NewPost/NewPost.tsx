import { MoreHorizontal, Heart, MessageSquare, Share2 } from 'lucide-react';

interface PostProps {
    user: {
        name: string;
        avatar: string;
        time: string;
        location: string;
    };
    content: string;
    image?: string;
    likes: number;
    comments: number;
}

export default function NewPost({
    user,
    content,
    image,
    likes,
    comments,
}: PostProps) {
    return (
        <div className="post-card">
            <div className="post-header">
                <div className="post-user-info">
                    <img
                        src={user.avatar}
                        alt={user.name}
                        className="post-avatar"
                    />
                    <div>
                        <h4 className="post-user-name">{user.name}</h4>
                        <span className="post-meta">
                            {user.time} · {user.location}
                        </span>
                    </div>
                </div>
                <MoreHorizontal size={20} color="#b0b3b8" cursor="pointer" />
            </div>

            <div className="post-content">
                <p>{content}</p>
            </div>

            {image && (
                <div className="post-image-container">
                    <img
                        src={image}
                        alt="Post content"
                        className="post-image"
                    />
                </div>
            )}

            <div className="post-stats">
                <div className="post-likes-summary">
                    <div className="like-icons">
                        <Heart size={14} fill="#e4e6eb" color="#e4e6eb" />
                    </div>
                    <span>Liked by Mike and {likes} others</span>
                </div>
                <span className="comment-count">{comments} Comments</span>
            </div>

            <div className="post-divider" />

            <div className="post-actions">
                <div className="post-action-item">
                    <Heart size={20} />
                    <span>Like</span>
                </div>
                <div className="post-action-item">
                    <MessageSquare size={20} />
                    <span>Comment</span>
                </div>
                <div className="post-action-item">
                    <Share2 size={20} />
                    <span>Share</span>
                </div>
            </div>
        </div>
    );
}
