import Navbar from '@/components/layout/Navbar/Navbar';
// import Logo from '@/components/common/Logo/Logo';
import SearchNavBar from '@/components/common/Search/SearchNavBar';
import UserActionMenu from '@/components/layout/UserActionMenu/UserActionMenu';
import Sidebar from '@/components/layout/Sidebar/Sidebar';
import './HomePost.css';
import HomeFeed from '@/components/layout/HomeFeed/HomeFeed';
import RightSidebar from '@/components/layout/RightSidebar/RightSidebar';
export default function HomePost() {
    return (
        <>
            <Navbar
                components={{
                    left: (
                        <>
                            {/* <Logo /> */}
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
