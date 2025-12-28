import { IconType } from 'react-icons';
import NavIcon from '../NavIcon/NavIcon';
import './PostFeed.css';

interface PostIconItem {
    id: string | number;
    icon: IconType;
    text: string;
    color: string;
}

interface PostFeedProps {
    iconList?: PostIconItem[];
}

export default function PostFeed({ iconList = [] }: PostFeedProps) {
    return (
        <div className="post-feed-container">
            <div className="post-feed-left">
                <NavIcon
                    src="https://i.pravatar.cc/150?u=alex"
                    size={40}
                    rounded="full"
                    alt="Avatar"
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
                    <form
                        className="post-feed-form"
                        onSubmit={e => e.preventDefault()}
                    >
                        <div className="post-feed-actions">
                            {iconList.map(item => (
                                <NavIcon
                                    key={item.id}
                                    icon={item.icon}
                                    text={item.text}
                                    color={item.color}
                                    iconSize={20}
                                    textSize="14px"
                                    className="post-feed-action"
                                    Tag="div"
                                />
                            ))}
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
