import Navbar from '@/components/layout/Navbar/Navbar';
import Logo from '@/components/common/Logo/Logo';
import SearchNavBar from '@/components/common/Search/SearchNavBar';
import UserActionMenu from '@/components/layout/UserActionMenu/UserActionMenu';

export function HomePost() {
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
            <main className="main-layout">{/* Thành phân khác... */}</main>
        </>
    );
}
