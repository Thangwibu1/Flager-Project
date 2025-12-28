
import FollowersList from '../FollowersList/FollowersList';
import TrendingList from '../TrendingList/TrendingList';
import './RightSideBarHomePost.css';

export default function RightSideBarHomePost() {
    return (
        <div className="right-sidebar">
            <FollowersList />
            <TrendingList />
            <footer className="sidebar-footer">
                Privacy · Terms · Advertising · Cookies · More © 2025 SocialApp
            </footer>
        </div>
    );
}
