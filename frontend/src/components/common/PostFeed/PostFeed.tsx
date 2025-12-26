import { Image, Smile } from 'lucide-react';
import './PostFeed.css';

export default function PostFeed() {
    return (
        <div className="post-feed-container">
            <div className="post-feed-left">
                <img
                    src="https://i.pravatar.cc/150?u=alex"
                    alt="Avatar"
                    className="post-feed-avatar"
                />
            </div>

            <div className="post-feed-right">
                <div className="post-feed-input-wrapper">
                    <input
                        type="text"
                        placeholder="What's on your mind, Alex?"
                        className="post-feed-input"
                    />
                </div>

                <div className="post-feed-divider" />

                <div className="post-feed-bottom">
                    <form className="post-feed-form">
                        <div className="post-feed-actions">
                            <div className="post-feed-action">
                                <Image color="#b0b3b8" size={20} />
                                <span>Photo/Video</span>
                            </div>
                            <div className="post-feed-action">
                                <Smile color="#b0b3b8" size={20} />
                                <span>Feeling</span>
                            </div>
                        </div>
                        <button type="submit" className="post-st-feed-button">
                            Post
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
