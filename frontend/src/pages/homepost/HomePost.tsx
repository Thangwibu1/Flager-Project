import Navbar from '@/components/layout/Navbar/Navbar';

import UserActionMenu from '@/components/layout/UserActionMenu/UserActionMenu';
import Sidebar from '@/components/layout/Sidebar/Sidebar';
import './HomePost.css';
import HomeFeed from '@/components/layout/HomeFeed/HomeFeed';
import RightSidebar from '@/components/layout/RightSidebar/RightSidebar';
import LogoSearch from '@/components/layout/LogoSearch/LogoSearch';

export default function HomePost() {
    return (
        <>
            <Navbar
                components={{
                    left: (
                        <LogoSearch />
                    ),
                    right: <UserActionMenu start={5} end={7} />,
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
