// import TrendingNow from './TrendingNow'; // Nếu bạn đã tạo

import ListFollowers from '../ListFollowers/ListFollower';
import './RightSidebar.css';
import ListTrending from '../ListTrending/ListTrending';

export default function RightSidebar() {
    return (
        <div className="right-sidebar">
            {/* Phần 1: Xu hướng */}
            <ListTrending />

            {/* Phần 2: Gợi ý kết bạn (Sử dụng component ListFollowers bạn đã tách) */}
            <ListFollowers />

            <footer className="sidebar-footer">
                Privacy · Terms · Advertising · Cookies · More © 2024 SocialApp
            </footer>
        </div>
    );
}
