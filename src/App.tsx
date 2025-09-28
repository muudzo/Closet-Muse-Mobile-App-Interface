import { useState } from 'react';
import { AppProvider } from './contexts/AppContext';
import { Toaster } from './components/ui/sonner';
import BottomNavigation from './components/BottomNavigation';
import HomeDashboard from './components/HomeDashboard';
import WardrobeManager from './components/WardrobeManager';
import OutfitBuilder from './components/OutfitBuilder';
import OutfitCalendar from './components/OutfitCalendar';
import ProfilePage from './components/ProfilePage';

function AppContent() {
  const [activeTab, setActiveTab] = useState('home');

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <HomeDashboard />;
      case 'wardrobe':
        return <WardrobeManager />;
      case 'builder':
        return <OutfitBuilder />;
      case 'calendar':
        return <OutfitCalendar />;
      case 'profile':
        return <ProfilePage />;
      default:
        return <HomeDashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      {/* App Header */}
      <div className="sticky top-0 bg-white/80 backdrop-blur-md border-b border-purple-100 z-40">
        <div className="px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 bg-gradient-to-br from-gray-800 to-gray-600 rounded-full flex items-center justify-center shadow-lg">
              <span className="text-white text-sm font-serif">D</span>
            </div>
            <div className="flex flex-col">
              <h1 className="text-xl text-gray-800 tracking-wide" style={{ fontFamily: 'Georgia, serif' }}>
                Dior's Muse
              </h1>
              <span className="text-xs text-gray-500 italic tracking-widest">FASHION AI</span>
            </div>
          </div>
          
          {/* Weather widget placeholder - will show real weather data */}
          <div className="flex items-center space-x-2 bg-purple-50 px-3 py-1 rounded-full">
            <span className="text-sm">☀️</span>
            <span className="text-sm text-purple-700">Loading...</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="relative z-10">
        {renderContent()}
      </main>

      {/* Bottom Navigation */}
      <BottomNavigation activeTab={activeTab} onTabChange={setActiveTab} />
      
      {/* Toast Notifications */}
      <Toaster 
        position="top-center"
        toastOptions={{
          style: {
            background: 'var(--card)',
            color: 'var(--card-foreground)',
            border: '1px solid var(--border)',
          },
        }}
      />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}