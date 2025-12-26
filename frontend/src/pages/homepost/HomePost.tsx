// import Navbar from '@/components/layout/Navbar/Navbar';
import SearchNavBar from '@/components/common/Search/SearchNavBar';
// import UserActionMenu from '@/components/layout/UserActionMenu/UserActionMenu';
import Sidebar from '@/components/layout/Sidebar/Sidebar';
import './HomePost.css';
import HomeFeed from '@/components/layout/HomeFeed/HomeFeed';
// import RightSidebar from '@/components/layout/RightSidebar/RightSidebar';
// import LogoBar from '@/components/layout/LogoBar/LogoBar';
import Logo from '@/components/common/Logo/Logo';
import Navbar from '@/components/Layout/Navbar/Navbar';
import UserActionMenu from '@/components/Layout/UserActionMenu/UserActionMenu';
import RightSidebar from '@/components/Layout/RightSidebar/RightSidebar';
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
                <RightSidebar />
            </main>
        </>
    );
}
