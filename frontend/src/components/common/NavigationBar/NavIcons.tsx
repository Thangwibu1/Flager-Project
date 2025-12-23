import { LucideIcon } from 'lucide-react';

/*
  Props: activeTab
  Handle: onTabChange
*/

export interface NavItem {
    id: string;
    icon: LucideIcon;
    label: string;
}

interface NavIconsProps {
    items: NavItem[];
    activeTab: string;
    onTabChange: (tab: string) => void;
}

export const NavIcons = ({ items, activeTab, onTabChange }: NavIconsProps) => {
    return (
        <div className="flex items-center justify-center gap-2 h-full">
            {items.map(item => {
                const isActive = activeTab === item.id;
                const Icon = item.icon;

                return (
                    <button
                        key={item.id}
                        onClick={() => onTabChange(item.id)}
                        aria-label={item.label}
                        title={item.label}
                        className={`p-3 rounded-lg transition-colors relative group ${
                            isActive
                                ? 'text-blue-500'
                                : 'text-gray-400 hover:bg-gray-800'
                        }`}
                    >
                        <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
                        {isActive && (
                            <span className="absolute -bottom-4 left-0 w-full h-1 bg-blue-500 rounded-t-full" />
                        )}
                    </button>
                );
            })}
        </div>
    );
};
