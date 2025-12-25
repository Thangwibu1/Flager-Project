export interface Tab {
    id: string;
    label: string;
    count?: number;
    icon?: React.ReactNode;
}

export interface TabsProps {
    tabs: Tab[];
    activeTab: string;
    onTabChange?: (tabId: string) => void;
    className?: string;
}


function Tabs({ tabs, activeTab, onTabChange, className = '' }: TabsProps) {
    const handleTabClick = (tabId: string) => {
        if (onTabChange) {
            onTabChange(tabId);
        }
    };

    const formatCount = (count: number): string => {
        if (count >= 1000) {
            return (count / 1000).toFixed(1) + 'k';
        }
        return count.toString();
    };

    return (
        <nav className={`tabs ${className}`}>
            <div className="tabs__container">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        className={`tabs__tab ${
                            activeTab === tab.id ? 'tabs__tab--active' : ''
                        }`}
                        onClick={() => handleTabClick(tab.id)}
                        aria-current={activeTab === tab.id ? 'page' : undefined}
                    >
                        {tab.icon && (
                            <span className="tabs__icon">{tab.icon}</span>
                        )}
                        <span className="tabs__label">{tab.label}</span>
                        {tab.count !== undefined && (
                            <span className="tabs__count">
                                {formatCount(tab.count)}
                            </span>
                        )}
                    </button>
                ))}
            </div>
        </nav>
    );
}

export default Tabs;
