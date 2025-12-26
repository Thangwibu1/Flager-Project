// import TrendingNow from './TrendingNow'; // Nếu bạn đã tạo

import ListFollowers from '../ListFollowers/ListFollower';
import './RightSidebar.css';
import ListTrending from '../ListTrending/ListTrending';

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
