import SuggestionsWidget from '@/components/Layout/SuggestionsWidget/SuggestionsWidget';
import './RightSidebar.css';

interface RightSidebarProps {
    suggestions?: any[];
}

function RightSidebar({ suggestions = [] }: RightSidebarProps) {
    return (
        <div className="right-sidebar">
            <SuggestionsWidget
                suggestions={suggestions}
                onSeeAll={() => console.log('See all suggestions')}
                onFollow={(id) => console.log('Follow user:', id)}
            />
        </div>
    );
}

export default RightSidebar;
// import TrendingNow from './TrendingNow'; // Nếu bạn đã tạo

import ListFollowers from '../FollowersList/FollowersList';
import './RightSidebar.css';
import ListTrending from '../TrendingList/TrendingList';

export default function RightSidebar() {
    return (
        <div className="right-sidebar">
            <ListTrending />
            <ListFollowers />

            <footer className="sidebar-footer">
                Privacy · Terms · Advertising · Cookies · More © 2025 SocialApp
            </footer>
        </div>
    );
}
