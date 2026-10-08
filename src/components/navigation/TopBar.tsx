import React, { useState } from 'react';
import { PenTool, Bot, Sparkles, Cloud, Sun, Moon, Sunrise, ChevronDown } from 'lucide-react';
import { useFutureMail } from '../../context/FutureMailContext';
import { SkyTheme } from '../../types';
import { sound } from '../../utils/audio';

const SKY_THEMES: { id: SkyTheme; label: string; icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>; color: string }[] = [
  { id: 'future-sky', label: 'Twilight Sky', icon: Cloud, color: '#38BDF8' },
  { id: 'aurora-sky', label: 'Aurora Sky', icon: Sparkles, color: '#34D399' },
  { id: 'sunset-sky', label: 'Sunset Horizon', icon: Sunrise, color: '#FB923C' },
  { id: 'starlight-sky', label: 'Midnight Sky', icon: Moon, color: '#818CF8' },
];

export const TopBar: React.FC = () => {
  const { setActiveTab, setOrionOpen, user, skyTheme, setSkyTheme } = useFutureMail();
  const [skyMenuOpen, setSkyMenuOpen] = useState(false);

  const handleCompose = () => {
    sound.playTick();
    setActiveTab('compose');
  };

  const handleOpenOrion = () => {
    sound.playTick();
    setOrionOpen(true);
  };

  const currentThemeObj = SKY_THEMES.find((t) => t.id === skyTheme) || SKY_THEMES[0];
  const CurrentIcon = currentThemeObj.icon;

  const handleSelectSky = (id: SkyTheme) => {
    sound.playTick();
    setSkyTheme(id);
    setSkyMenuOpen(false);
  };

  return (
    <header className="w-full flex items-center justify-between py-4 px-4 sm:px-6 mb-6 border-b border-white/5 relative z-30">
      {/* Zone 1: Brand Wordmark (Single element) */}
      <div 
        onClick={() => {
          sound.playTick();
          setActiveTab('dashboard');
        }}
        className="cursor-pointer flex items-center gap-2 group"
      >
        <span className="font-heading text-lg sm:text-xl font-bold tracking-tight text-[#F0F7FF] group-hover:text-white transition-colors">
          FutureMail
        </span>
        <span className="text-xs font-mono text-[#93C5FD] hidden md:inline">
          · Future Sky 2035
        </span>
      </div>

      {/* Zone 2: Navigation Links (Clean unboxed links) */}
      <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-[#93C5FD]">
        <button 
          onClick={() => { sound.playTick(); setActiveTab('dashboard'); }} 
          className="hover:text-white transition-colors"
        >
          Control Center
        </button>
        <button 
          onClick={() => { sound.playTick(); setActiveTab('vault'); }} 
          className="hover:text-white transition-colors"
        >
          Vault
        </button>
        <button 
          onClick={() => { sound.playTick(); setActiveTab('timeline'); }} 
          className="hover:text-white transition-colors"
        >
          Trajectory
        </button>
        <button 
          onClick={() => { sound.playTick(); setActiveTab('templates'); }} 
          className="hover:text-white transition-colors"
        >
          Prompts
        </button>
      </nav>

      {/* Zone 3: 1-2 Primary Actions & Sky Theme Selector */}
      <div className="flex items-center gap-2.5">
        {/* Sky Theme Selector */}
        <div className="relative">
          <button
            onClick={() => setSkyMenuOpen(!skyMenuOpen)}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-[rgba(16,28,71,0.8)] hover:bg-[rgba(24,40,94,0.9)] border border-sky-400/25 text-xs font-mono text-[#E0F2FE] transition-all shadow-sm"
            title="Change Future Sky Atmosphere"
          >
            <CurrentIcon className="w-3.5 h-3.5" style={{ color: currentThemeObj.color }} />
            <span className="hidden sm:inline text-[11px]">{currentThemeObj.label}</span>
            <ChevronDown className="w-3 h-3 text-[#93C5FD]" />
          </button>

          {skyMenuOpen && (
            <div className="absolute right-0 mt-2 w-44 rounded-2xl glass-panel border border-sky-400/25 p-1.5 shadow-2xl space-y-1 animate-fade-in z-50">
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#93C5FD] px-2 py-1 block">
                FUTURE SKY MODES
              </span>
              {SKY_THEMES.map((theme) => {
                const Icon = theme.icon;
                const isSelected = skyTheme === theme.id;
                return (
                  <button
                    key={theme.id}
                    onClick={() => handleSelectSky(theme.id)}
                    className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded-xl text-xs font-mono text-left transition-all ${
                      isSelected
                        ? 'bg-sky-500/20 text-[#38BDF8] font-bold border border-sky-400/30'
                        : 'text-[#E0F2FE] hover:bg-white/5'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" style={{ color: theme.color }} />
                    <span>{theme.label}</span>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        <button
          onClick={handleOpenOrion}
          className="hidden sm:flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-[#C4B5FD] bg-[rgba(16,28,71,0.8)] hover:bg-[rgba(24,40,94,0.9)] border border-[#818CF8]/30 rounded-xl transition-all"
        >
          <Bot className="w-3.5 h-3.5 text-[#818CF8]" />
          <span>Ask ORION</span>
        </button>

        <button
          onClick={handleCompose}
          className="flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-medium text-white gradient-primary rounded-xl hover:opacity-95 shadow-[0_0_20px_rgba(56,189,248,0.35)] transition-all whitespace-nowrap"
        >
          <PenTool className="w-3.5 h-3.5" />
          <span>Create FutureMail</span>
        </button>

        <button
          onClick={() => {
            sound.playTick();
            setActiveTab('profile');
          }}
          className="w-8 h-8 rounded-full border border-sky-400/20 bg-[rgba(16,28,71,0.8)] flex items-center justify-center text-xs font-mono font-bold text-[#2FFFD2] hover:border-[#2FFFD2]/50 transition-colors"
          title={`Signed in as ${user.callsign}`}
        >
          {user.callsign.substring(0, 2).toUpperCase()}
        </button>
      </div>
    </header>
  );
};
