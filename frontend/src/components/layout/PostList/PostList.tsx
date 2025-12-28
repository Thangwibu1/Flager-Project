import NewPost from '@/components/common/NewPost/NewPost';
import '../../common/NewPost/NewPost.css';

//chỗ này sau này cần lấy từ DB xử lý
const POSTS_DATA = [
    {
        id: 1,
        user: {
            name: 'Jane Cooper',
            avatar: 'https://i.pravatar.cc/150?u=jane',
            time: '2 hours ago',
            location: 'San Francisco',
        },
        content:
            'Just arrived at this amazing spot! The coffee here is absolutely incredible. ☕✨ #CoffeeLovers #MorningVibes',
        image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=600',
        likes: 42,
        comments: 12,
    },
    {
        id: 2,
        user: {
            name: 'Wade Warren',
            avatar: 'https://i.pravatar.cc/150?u=wade',
            time: '5 hours ago',
            location: 'New York, NY',
        },
        content:
            'Working on some new UI designs today. Coding with React and Tailwind is so satisfying! 💻🚀 #WebDev #UIUX #DesignSystem',
        image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600',
        likes: 128,
        comments: 24,
    },
];
export default function ListPost() {
    return (
        <div className="list-post-container">
            {POSTS_DATA.map(post => (
                <NewPost key={post.id} {...post} />
            ))}
        </div>
    );
}
