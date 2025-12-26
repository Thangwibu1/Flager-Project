import { MoreHorizontal } from 'lucide-react';

interface TrendingItemProps {
    category: string;
    status: string;
    topic: string;
    posts: string;
}

export default function TrendingItem({
    category,
    status,
    topic,
    posts,
}: TrendingItemProps) {
    return (
        <div className="trend-item">
            <div className="trend-info">
                <span className="trend-meta">
                    {category} · {status}
                </span>
                <p className="trend-topic">{topic}</p>
                <span className="trend-meta">{posts}</span>
            </div>
            <div className="trend-more-btn">
                <MoreHorizontal size={18} color="#b0b3b8" />
            </div>
        </div>
    );
}
