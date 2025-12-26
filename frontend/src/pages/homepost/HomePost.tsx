// import LogoBar from '@/components/layout/LogoBar/LogoBar';
import Logo from '@/components/common/Logo/Logo';
import SearchNavBar from '@/components/common/Search/SearchNavBar';
import HomeFeed from '@/components/Layout/HomeFeed/HomeFeed';
import Navbar from '@/components/layout/Navbar/Navbar';
import RightSideBarHomePost from '@/components/Layout/RightSideBarHomePost/RightSideBarHomePost';
import Sidebar from '@/components/Layout/Sidebar/Sidebar';
import UserActionMenu from '@/components/layout/UserActionMenu/UserActionMenu';

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
