import { MoreHorizontal } from 'lucide-react';

interface TrendingItemProps {
    category: string;
    status: string;
    topic: string;
    posts: string;
    // Thêm các thuộc tính size (optional)
    categorySize?: string;
    topicSize?: string;
    postsSize?: string;
}

export default function TrendingItem({
    category,
    status,
    topic,
    posts,
    categorySize = '10px', // Giá trị mặc định nếu không truyền
    topicSize = '13px',
    postsSize = '12px',
}: TrendingItemProps) {
    return (
        <div className="trend-item">
            <div className="trend-info">
                <span className="trend-meta" style={{ fontSize: categorySize }}>
                    {category} · {status}
                </span>
                <p className="trend-topic" style={{ fontSize: topicSize }}>
                    {topic}
                </p>
                <span className="trend-meta" style={{ fontSize: postsSize }}>
                    {posts}
                </span>
            </div>
            <div className="trend-more-btn">
                <MoreHorizontal size={17} color="#b0b3b8" />
            </div>
        </div>
    );
}
