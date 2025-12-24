import Navbar from '@/components/layout/Navbar/Navbar';
import Logo from '@/components/common/Logo/Logo';
import SearchNavBar from '@/components/common/Search/SearchNavBar';
import UserActionMenu from '@/components/layout/UserActionMenu/UserActionMenu';
// import IconBar from '@/components/layout/IconBar/IconBar';

export function HomePost() {
    return (
        <>
            <Navbar
                leftContent={
                    <>
                        <Logo />
                        <SearchNavBar />
                    </>
                }
                rightContent={<UserActionMenu />}
            />
            <main className="main-layout">
                {/* <Sidebar /> */}
                {/* <Feed /> */}
            </main>
        </>
    );
}
