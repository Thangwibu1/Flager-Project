import IconBar from '@/components/Layout/IconBar/IconBar';
import LogoBar from '@/components/Layout/LogoBar/LogoBar';
import UserActionMenu from '@/components/Layout/UserActionMenu/UserActionMenu';
import Navbar from '@/components/Layout/Navbar/Navbar';

export function ProfilePage() {
    return (
        <>
            <Navbar
                components={{
                    left: <LogoBar />,
                    center: <IconBar />,
                    right: <UserActionMenu />,
                }}
            />
        </>
    );
}
