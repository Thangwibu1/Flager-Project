import PostFeed from '@/components/common/PostFeed/PostFeed';
import StoryList from '../StoryList/StoryList';
import './HomeFeed.css';

export default function HomeFeed() {
    return (
        <div className="home-feed-container">
            <StoryList />
            <PostFeed />
        </div>
    );
}
