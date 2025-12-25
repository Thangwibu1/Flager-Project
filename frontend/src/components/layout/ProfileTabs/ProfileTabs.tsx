import Tabs, { Tab } from '@/components/common/Tabs/Tabs';
import './ProfileTabs.css';

interface ProfileTabsProps {
    tabs: Tab[];
    activeTab: string;
    onTabChange?: (tabId: string) => void;
}

function ProfileTabs({ tabs, activeTab, onTabChange }: ProfileTabsProps) {
    return (
        <Tabs
            tabs={tabs}
            activeTab={activeTab}
            onTabChange={onTabChange}
            className="profile-tabs"
        />
    );
}

export default ProfileTabs;
