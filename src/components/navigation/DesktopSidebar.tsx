import React from 'react';
import { 
  Home, 
  LayoutDashboard, 
  PenTool, 
  Archive, 
  GitCommit, 
  MailCheck, 
  Sparkles, 
  User, 
  Settings,
  Volume2,
  VolumeX,
  Bot
} from 'lucide-react';
import { useFutureMail } from '../../context/FutureMailContext';
import { sound } from '../../utils/audio';

interface NavItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: number;
}

export const DesktopSidebar: React.FC = () => {
  const { 
    activeTab, 
    setActiveTab, 
    stats, 
    soundEnabled, 
    setSoundEnabled,
    setOrionOpen
  } = useFutureMail();

  const navItems: NavItem[] = [
    { id: 'landing', label: 'Home', icon: Home },
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'compose', label: 'Compose', icon: PenTool },
    { id: 'vault', label: 'Future Vault', icon: Archive, badge: stats.scheduledCount },
    { id: 'timeline', label: 'Timeline', icon: GitCommit },
    { id: 'arrived', label: 'Arrived', icon: MailCheck, badge: stats.deliveredCount },
    { id: 'templates', label: 'Templates', icon: Sparkles },
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const handleNavClick = (id: string) => {
    sound.playTick();
    setActiveTab(id);
  };

  return (
    <aside 
      className="hidden lg:flex fixed left-5 top-5 bottom-5 w-64 glass-panel rounded-2xl flex-col justify-between p-4 z-40 border border-white/10 shadow-2xl"
    >
      {/* Top Brand Lockup */}
      <div>
        <div 
          onClick={() => handleNavClick('landing')}
          className="cursor-pointer px-3 py-3 rounded-xl hover:bg-white/5 transition-colors group flex items-center gap-3"
        >
          <div className="w-9 h-9 rounded-lg gradient-primary flex items-center justify-center shadow-[0_0_15px_rgba(139,92,246,0.5)] group-hover:scale-105 transition-transform">
            <span className="font-future font-bold text-white text-base">F</span>
          </div>
          <div>
            <div className="font-heading font-bold text-base text-[#F0F7FF] tracking-tight group-hover:text-white transition-colors flex items-center gap-1.5">
              <span>FutureMail</span>
              <span className="text-[10px] font-mono font-medium px-1.5 py-0.2 rounded bg-sky-400/15 text-[#38BDF8] border border-sky-400/30">
                SKY 2035
              </span>
            </div>
            <p className="text-[11px] font-mono text-[#93C5FD]">Future Sky Network</p>
          </div>
        </div>

        {/* Primary Navigation */}
        <nav className="mt-6 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all group ${
                  isActive
                    ? 'bg-gradient-to-r from-[#8B5CF6]/25 to-[#3B82F6]/15 text-[#2FFFD2] border border-[#2FFFD2]/30 shadow-[0_0_15px_rgba(47,255,210,0.15)] font-semibold'
                    : 'text-[#94A3B8] hover:text-[#EAF2FF] hover:bg-white/5 border border-transparent'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon 
                    className={`w-4 h-4 transition-transform group-hover:scale-110 ${
                      isActive ? 'text-[#2FFFD2]' : 'text-[#64748B] group-hover:text-[#C4B5FD]'
                    }`} 
                  />
                  <span>{item.label}</span>
                </div>

                {item.badge !== undefined && item.badge > 0 && (
                  <span className={`text-[11px] font-mono px-2 py-0.5 rounded-full ${
                    isActive 
                      ? 'bg-[#2FFFD2]/20 text-[#2FFFD2] border border-[#2FFFD2]/40' 
                      : 'bg-white/5 text-[#94A3B8]'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Footer controls: ORION Assistant & Audio Toggle */}
      <div className="pt-4 border-t border-white/5 space-y-2">
        {/* Orion Quick Trigger */}
        <button
          onClick={() => {
            sound.playTick();
            setOrionOpen(true);
          }}
          className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium text-[#C4B5FD] bg-[#151B2E] hover:bg-[#1E2742] border border-[#8B5CF6]/30 transition-all group shadow-sm"
        >
          <div className="flex items-center gap-2">
            <Bot className="w-4 h-4 text-[#8B5CF6] group-hover:rotate-12 transition-transform" />
            <span>ORION AI Assistant</span>
          </div>
          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#8B5CF6]/20 text-[#C4B5FD]">
            READY
          </span>
        </button>

        {/* Audio Mute / Unmute */}
        <div className="flex items-center justify-between px-2 pt-1 text-xs text-[#64748B]">
          <span className="font-mono text-[11px]">Audio Telemetry</span>
          <button
            onClick={() => {
              setSoundEnabled(!soundEnabled);
              if (!soundEnabled) sound.playTick();
            }}
            className="p-1.5 rounded-lg hover:bg-white/5 text-[#94A3B8] hover:text-[#EAF2FF] transition-colors"
            title={soundEnabled ? 'Mute Interface Audio' : 'Enable Interface Audio'}
            aria-label="Toggle sound"
          >
            {soundEnabled ? (
              <Volume2 className="w-4 h-4 text-[#22D3EE]" />
            ) : (
              <VolumeX className="w-4 h-4 text-[#64748B]" />
            )}
          </button>
        </div>
      </div>
    </aside>
  );
};
