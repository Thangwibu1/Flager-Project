import HomeFeed from '@/components/layout/HomeFeed/HomeFeed';
import Navbar from '@/components/layout/Navbar/Navbar';

import LogoSearch from '@/components/layout/LogoSearch/LogoSearch';
import Sidebar from '@/components/layout/Sidebar/Sidebar';
import UserActionMenu from '@/components/layout/UserActionMenu/UserActionMenu';
import './HomePost.css';
import RightSideBarHomePost from '@/components/layout/RightSideBarHomePost/RightSideBarHomePost';

export default function HomePost() {
    return (
        <>
            <Navbar
                components={{
                    left: <LogoSearch />,
                    right: <UserActionMenu start={5} end={7} />,
                }}
            />
            <main className="main-layout">
                <Sidebar fontSize={25} />
                <HomeFeed />
                <RightSideBarHomePost />
            </main>
        </>
    );
}
