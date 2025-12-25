import SuggestionsWidget from '@/components/Layout/SuggestionsWidget/SuggestionsWidget';
import './RightSidebar.css';

interface RightSidebarProps {
    suggestions?: any[];
}

function RightSidebar({ suggestions = [] }: RightSidebarProps) {
    return (
        <div className="right-sidebar">
            <SuggestionsWidget
                suggestions={suggestions}
                onSeeAll={() => console.log('See all suggestions')}
                onFollow={(id) => console.log('Follow user:', id)}
            />
        </div>
    );
}

export default RightSidebar;
