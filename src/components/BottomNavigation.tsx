import { Home, Upload, Palette, Calendar, User } from 'lucide-react';

interface BottomNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export default function BottomNavigation({ activeTab, onTabChange }: BottomNavigationProps) {
  const tabs = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'wardrobe', icon: Upload, label: 'Wardrobe' },
    { id: 'builder', icon: Palette, label: 'Builder' },
    { id: 'calendar', icon: Calendar, label: 'Calendar' },
    { id: 'profile', icon: User, label: 'Profile' }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-purple-100 px-2 py-2 shadow-lg z-50">
      <div className="flex justify-around items-center max-w-md mx-auto">
        {tabs.map(({ id, icon: Icon, label }) => (
          <button
            key={id}
            onClick={() => onTabChange(id)}
            className={`flex flex-col items-center py-2 px-3 rounded-lg smooth-transition ${
              activeTab === id 
                ? 'text-purple-600' 
                : 'text-gray-400 hover:text-purple-400'
            }`}
          >
            <div className={`p-2 rounded-full smooth-transition ${
              activeTab === id 
                ? 'bg-purple-100' 
                : 'bg-transparent'
            }`}>
              <Icon size={20} strokeWidth={activeTab === id ? 2.5 : 2} />
            </div>
            <span className="text-xs mt-1">{label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}