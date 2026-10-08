import React from 'react';
import { 
  Home, 
  LayoutDashboard, 
  PenTool, 
  Archive, 
  MailCheck, 
  User 
} from 'lucide-react';
import { useFutureMail } from '../../context/FutureMailContext';
import { sound } from '../../utils/audio';

export const MobileNavbar: React.FC = () => {
  const { activeTab, setActiveTab, stats } = useFutureMail();

  const tabs = [
    { id: 'landing', label: 'Home', icon: Home },
    { id: 'dashboard', label: 'Overview', icon: LayoutDashboard },
    { id: 'compose', label: 'Compose', icon: PenTool },
    { id: 'vault', label: 'Vault', icon: Archive, badge: stats.scheduledCount },
    { id: 'arrived', label: 'Arrived', icon: MailCheck, badge: stats.deliveredCount },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  const handleSelect = (id: string) => {
    sound.playTick();
    setActiveTab(id);
  };

  return (
    <nav 
      className="lg:hidden fixed bottom-3 left-3 right-3 z-50 glass-panel rounded-2xl border border-white/10 px-2 py-2 flex items-center justify-around shadow-2xl backdrop-blur-xl"
      style={{ maxHeight: '68px' }}
    >
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;

        return (
          <button
            key={tab.id}
            onClick={() => handleSelect(tab.id)}
            className={`flex flex-col items-center justify-center py-1 px-2 rounded-xl transition-all relative ${
              isActive 
                ? 'text-[#2FFFD2]' 
                : 'text-[#94A3B8] hover:text-[#EAF2FF]'
            }`}
          >
            <div className="relative">
              <Icon className={`w-5 h-5 transition-transform ${isActive ? 'scale-110 text-[#2FFFD2]' : ''}`} />
              {tab.badge !== undefined && tab.badge > 0 && (
                <span className="absolute -top-1 -right-2 w-3.5 h-3.5 rounded-full bg-[#8B5CF6] text-white text-[9px] flex items-center justify-center font-mono font-bold">
                  {tab.badge}
                </span>
              )}
            </div>
            <span className="text-[10px] font-medium tracking-tight mt-0.5 whitespace-nowrap">
              {tab.label}
            </span>
            {isActive && (
              <span className="w-1 h-1 rounded-full bg-[#2FFFD2] mt-0.5 shadow-[0_0_6px_#2FFFD2]" />
            )}
          </button>
        );
      })}
    </nav>
  );
};
