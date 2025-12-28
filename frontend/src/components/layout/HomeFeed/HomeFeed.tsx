import { HiOutlinePhotograph, HiOutlineEmojiHappy } from 'react-icons/hi';
import PostFeed from '@/components/common/PostFeed/PostFeed';
import StoryList from '../StoryList/StoryList';
import ListPost from '../PostList/PostList';
import './HomeFeed.css';

// Chỗ này mốt tụi mình sẽ lấy từ DB lên á nha , nên mốt sẽ tách nó ra folder data nữa , này dữu liệu gải á
const NAV_ICON_POST_LIST = [
    {
        id: 'photo',
        icon: HiOutlinePhotograph,
        text: 'Photo/Video',
        color: '#b0b3b8',
    },
    {
        id: 'feeling',
        icon: HiOutlineEmojiHappy,
        text: 'Feeling',
        color: '#b0b3b8',
    },
];

export default function HomeFeed() {
    return (
        <div className="home-feed-container">
            <StoryList />
            <PostFeed iconList={NAV_ICON_POST_LIST} />
            <ListPost />
        </div>
    );
}
