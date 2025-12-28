import TrendingItem from '@/components/common/TrendingItem/TrendingItem';
import './TrendingList.css';

const TRENDS_DATA = [
    {
        id: 1,
        category: 'Technology',
        status: 'Trending',
        topic: '#AIRevolution',
        posts: '52.4K posts',
    },
    {
        id: 2,
        category: 'Design',
        status: 'Trending',
        topic: 'Minimalism',
        posts: '18.2K posts',
    },
    {
        id: 3,
        category: 'Sports',
        status: 'Live',
        topic: 'Championship Finals',
        posts: '120K posts',
    },
];

export default function TrendingList() {
    return (
        <div className="sidebar-card">
            <div className="card-header">
                <h3>Trending Now</h3>
                <span className="see-all">See All</span>
            </div>
            <div className="card-content">
                {TRENDS_DATA.map(trend => (
                    <TrendingItem
                        key={trend.id}
                        category={trend.category}
                        status={trend.status}
                        topic={trend.topic}
                        posts={trend.posts}
                    />
                ))}
            </div>
        </div>
    );
}
