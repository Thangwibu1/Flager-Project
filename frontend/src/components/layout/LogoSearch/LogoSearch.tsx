import Logo from '@/components/common/Logo/Logo';
import SearchNavBar from '@/components/common/Search/SearchNavBar';

export default function HomePost({ className = '', style = {}, ...props }) {
    // Style mặc định
    const defaultStyle = {
        display: 'flex',
        justifyContent: 'space-between',
        border: '1px solid red',
    };

    return (
        <div
            style={{ ...defaultStyle, ...style }} 
            className={className}
            {...props}
        >
            <Logo />
            <SearchNavBar />
        </div>
    );
}
