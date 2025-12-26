// import TrendingNow from './TrendingNow'; // Nếu bạn đã tạo

import ListFollowers from '../FollowersList/FollowersList';
import './RightSidebar.css';
import ListTrending from '../TrendingList/TrendingList';

export default function RightSideBarHomePost() {
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
