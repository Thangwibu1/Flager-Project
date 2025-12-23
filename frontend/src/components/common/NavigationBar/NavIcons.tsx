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
        <div className="flex items-center justify-center gap-6 md:gap-14 h-full">
            {items.map(item => {
                const isActive = activeTab === item.id;
                const Icon = item.icon;

                return (
                    <button
                        key={item.id}
                        onClick={() => onTabChange(item.id)}
                        aria-label={item.label}
                        title={item.label}
                        // Tăng độ rộng nút bấm (w-12 h-12) để vùng bấm rộng hơn, dễ bấm hơn
                        className={`w-12 h-12 rounded-lg transition-colors relative group flex items-center justify-center ${
                            isActive
                                ? 'text-blue-500'
                                : 'text-gray-400 hover:bg-[#1c1c1c]' // Thêm màu nền nhẹ khi hover
                        }`}
                    >
                        {/* Tăng kích thước icon lên một chút (size={28}) cho cân đối */}
                        <Icon size={28} strokeWidth={isActive ? 2.5 : 2} />

                        {isActive && (
                            <span className="absolute -bottom-2 left-0 w-full h-1 bg-blue-500 rounded-t-full" />
                        )}
                    </button>
                );
            })}
        </div>
    );
};
