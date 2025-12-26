// import Navbar from '@/components/layout/Navbar/Navbar';
import SearchNavBar from '@/components/common/Search/SearchNavBar';
// import UserActionMenu from '@/components/layout/UserActionMenu/UserActionMenu';
import './HomePost.css';
// import RightSidebar from '@/components/layout/RightSidebar/RightSidebar';
// import LogoBar from '@/components/layout/LogoBar/LogoBar';
import Logo from '@/components/common/Logo/Logo';
import Navbar from '@/components/Layout/Navbar/Navbar';
import UserActionMenu from '@/components/Layout/UserActionMenu/UserActionMenu';
import Sidebar from '@/components/Layout/Sidebar/Sidebar';
import HomeFeed from '@/components/Layout/HomeFeed/HomeFeed';
import RightSideBarHomePost from '@/components/Layout/RightSideBarHomePost/RightSideBarHomePost';

export default function HomePost() {
    return (
        <>
            <Navbar
                components={{
                    left: (
                        <>
                            <Logo />
                            <SearchNavBar />
                        </>
                    ),
                    right: <UserActionMenu />,
                }}
            />
            <main className="main-layout">
                <Sidebar />
                <HomeFeed />
                <RightSideBarHomePost />
            </main>
        </>
    );
}
