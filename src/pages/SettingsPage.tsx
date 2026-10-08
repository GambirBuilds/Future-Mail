import React, { useState } from 'react';
import { useFutureMail } from '../context/FutureMailContext';
import { SkyTheme } from '../types';
import { sound } from '../utils/audio';
import { 
  Volume2, 
  VolumeX, 
  RotateCcw, 
  Download, 
  Trash2, 
  Clock, 
  ShieldCheck, 
  Sparkles,
  Info,
  Cloud,
  Sunrise,
  Moon
} from 'lucide-react';

const SKY_PRESETS: {
  id: SkyTheme;
  title: string;
  tagline: string;
  colors: string[];
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
}[] = [
  {
    id: 'future-sky',
    title: 'Twilight Stratosphere',
    tagline: 'Default 2035 future sky: celestial deep blue, dawn cyan & ozone mint',
    colors: ['#060B1E', '#38BDF8', '#818CF8', '#2FFFD2'],
    icon: Cloud,
  },
  {
    id: 'aurora-sky',
    title: 'Polar Aurora',
    tagline: 'Luminous emerald auroral ribbons and polar cyan stratosphere',
    colors: ['#04141A', '#2DD4BF', '#06B6D4', '#34D399'],
    icon: Sparkles,
  },
  {
    id: 'sunset-sky',
    title: 'Sunset Cyber Horizon',
    tagline: 'Dusk solar gradient: twilight purple, solar rose and horizon amber',
    colors: ['#14081E', '#F43F5E', '#FB923C', '#FBBF24'],
    icon: Sunrise,
  },
  {
    id: 'starlight-sky',
    title: 'Midnight Starlight',
    tagline: 'Deep space obsidian and diamond starfield with indigo aurora',
    colors: ['#020617', '#3B82F6', '#8B5CF6', '#F8FAFC'],
    icon: Moon,
  },
];

export const SettingsPage: React.FC = () => {
  const { 
    user, 
    updateUser, 
    soundEnabled, 
    setSoundEnabled, 
    skyTheme,
    setSkyTheme,
    resetToDemoData, 
    messages 
  } = useFutureMail();

  const [notificationSim, setNotificationSim] = useState(true);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const handleExportData = () => {
    sound.playTick();
    const exportPayload = {
      exportDate: new Date().toISOString(),
      user,
      messages,
      system: 'FutureMail 2035 Time Capsule Network',
    };
    const blob = new Blob([JSON.stringify(exportPayload, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `futuremail_vault_backup_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 3000);
  };

  const handleResetData = () => {
    if (confirm('Reset entire vault back to initial 2035 demonstration transmissions?')) {
      sound.playLockChime();
      resetToDemoData();
      alert('Vault restored to default demo state.');
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 pb-16">
      {/* Top Header */}
      <div>
        <span className="text-xs font-mono tracking-widest text-[#38BDF8] uppercase">
          SYSTEM PREFERENCES
        </span>
        <h1 className="font-heading text-2xl sm:text-3xl font-bold text-white tracking-tight mt-1">
          Settings & Future Sky Atmosphere
        </h1>
        <p className="text-sm text-[#93C5FD]">
          Configure atmospheric celestial palettes, time vector parameters, and auditory feedback.
        </p>
      </div>

      {/* 1. Future Sky Atmosphere Selector */}
      <div className="glass-panel p-6 rounded-3xl border border-sky-400/20 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[10px] font-mono tracking-widest text-[#2FFFD2] uppercase block">
              CELESTIAL HORIZON
            </span>
            <h3 className="font-heading text-lg font-bold text-white">
              Future Sky Color Atmosphere
            </h3>
          </div>
          <span className="text-xs font-mono text-[#38BDF8] px-2.5 py-1 rounded-lg bg-[rgba(16,28,71,0.8)] border border-sky-400/20">
            ACTIVE: {skyTheme.toUpperCase().replace('-', ' ')}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          {SKY_PRESETS.map((preset) => {
            const isSelected = skyTheme === preset.id;
            const Icon = preset.icon;

            return (
              <div
                key={preset.id}
                onClick={() => {
                  sound.playLockChime();
                  setSkyTheme(preset.id);
                }}
                className={`p-4 rounded-2xl border cursor-pointer transition-all duration-300 relative overflow-hidden flex flex-col justify-between ${
                  isSelected
                    ? 'bg-[rgba(24,40,94,0.9)] border-[#38BDF8] shadow-[0_0_20px_rgba(56,189,248,0.25)] scale-[1.01]'
                    : 'bg-[rgba(10,19,51,0.6)] border-white/5 hover:border-sky-400/30 hover:bg-[rgba(16,28,71,0.7)]'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Icon className={`w-4 h-4 ${isSelected ? 'text-[#38BDF8]' : 'text-[#93C5FD]'}`} />
                      <h4 className="font-heading text-sm font-bold text-white">
                        {preset.title}
                      </h4>
                    </div>
                    {isSelected && (
                      <span className="w-2 h-2 rounded-full bg-[#2FFFD2] shadow-[0_0_8px_#2FFFD2]" />
                    )}
                  </div>

                  <p className="text-xs text-[#93C5FD] leading-relaxed mb-3">
                    {preset.tagline}
                  </p>
                </div>

                {/* Color swatches */}
                <div className="flex items-center gap-1.5 pt-2 border-t border-white/5">
                  {preset.colors.map((c, idx) => (
                    <div
                      key={idx}
                      className="w-5 h-5 rounded-full border border-white/20 shadow-sm"
                      style={{ backgroundColor: c }}
                      title={c}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 2. Audio & Sensory Preferences */}
      <div className="glass-panel p-6 rounded-2xl border border-white/10 space-y-4">
        <h3 className="font-heading text-base font-bold text-white">
          Sensory & Interface Feedback
        </h3>

        <div className="flex items-center justify-between p-3.5 rounded-xl bg-[rgba(10,19,51,0.8)] border border-white/5">
          <div className="flex items-center gap-3">
            {soundEnabled ? (
              <Volume2 className="w-5 h-5 text-[#2FFFD2]" />
            ) : (
              <VolumeX className="w-5 h-5 text-[#64748B]" />
            )}
            <div>
              <span className="text-xs sm:text-sm font-medium text-white block">
                Auditory Synthesizer Feedback
              </span>
              <span className="text-[11px] font-mono text-[#93C5FD]">
                Web Audio synthesized futuristic seal chimes and atmospheric resonance
              </span>
            </div>
          </div>

          <button
            onClick={() => {
              setSoundEnabled(!soundEnabled);
              if (!soundEnabled) sound.playTick();
            }}
            className={`w-12 h-6 rounded-full transition-colors relative ${
              soundEnabled ? 'bg-[#2FFFD2]' : 'bg-[#151B2E]'
            }`}
          >
            <div
              className={`w-4 h-4 rounded-full bg-[#050711] absolute top-1 transition-transform ${
                soundEnabled ? 'right-1' : 'left-1'
              }`}
            />
          </button>
        </div>

        <div className="flex items-center justify-between p-3.5 rounded-xl bg-[rgba(10,19,51,0.8)] border border-white/5">
          <div>
            <span className="text-xs sm:text-sm font-medium text-white block">
              Temporal Arrival Notification Simulation
            </span>
            <span className="text-[11px] font-mono text-[#93C5FD]">
              Simulates delivery arrival alerts within the web environment
            </span>
          </div>

          <button
            onClick={() => setNotificationSim(!notificationSim)}
            className={`w-12 h-6 rounded-full transition-colors relative ${
              notificationSim ? 'bg-[#38BDF8]' : 'bg-[#151B2E]'
            }`}
          >
            <div
              className={`w-4 h-4 rounded-full bg-[#050711] absolute top-1 transition-transform ${
                notificationSim ? 'right-1' : 'left-1'
              }`}
            />
          </button>
        </div>
      </div>

      {/* 3. Temporal Coordinates */}
      <div className="glass-panel p-6 rounded-2xl border border-white/10 space-y-4">
        <h3 className="font-heading text-base font-bold text-white">
          Temporal Coordinate Alignment
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-mono text-[#93C5FD] block mb-1">
              SYSTEM TIMEZONE
            </label>
            <input
              type="text"
              value={user.timeZone}
              onChange={(e) => updateUser({ timeZone: e.target.value })}
              className="w-full bg-[rgba(10,19,51,0.8)] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#2FFFD2]"
            />
          </div>

          <div>
            <label className="text-xs font-mono text-[#93C5FD] block mb-1">
              PRIMARY HORIZON TARGET
            </label>
            <input
              type="text"
              readOnly
              value="2026 → 2035 (Active Range)"
              className="w-full bg-[rgba(10,19,51,0.8)] border border-white/5 rounded-xl px-3.5 py-2.5 text-xs text-[#64748B] cursor-not-allowed"
            />
          </div>
        </div>
      </div>

      {/* 4. Vault Data Preservation */}
      <div className="glass-panel p-6 rounded-2xl border border-white/10 space-y-4">
        <h3 className="font-heading text-base font-bold text-white">
          Data Preservation & Architecture
        </h3>

        <div className="space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl bg-[rgba(10,19,51,0.8)] border border-white/5 gap-3">
            <div>
              <span className="text-xs sm:text-sm font-medium text-white block">
                Export Vault Transmissions (JSON)
              </span>
              <span className="text-[11px] font-mono text-[#93C5FD]">
                Download all sealed capsules, drafts, and reflections
              </span>
            </div>

            <button
              onClick={handleExportData}
              className="px-4 py-2 rounded-xl bg-[#151B2E] hover:bg-[#1E2742] text-xs font-mono text-[#2FFFD2] border border-[#2FFFD2]/30 flex items-center gap-1.5 self-start sm:self-auto"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{downloadSuccess ? 'EXPORTED!' : 'EXPORT VAULT'}</span>
            </button>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl bg-[rgba(10,19,51,0.8)] border border-white/5 gap-3">
            <div>
              <span className="text-xs sm:text-sm font-medium text-white block">
                Restore Demonstration Vault
              </span>
              <span className="text-[11px] font-mono text-[#93C5FD]">
                Reload the original 2035 temporal messages & achievements
              </span>
            </div>

            <button
              onClick={handleResetData}
              className="px-4 py-2 rounded-xl bg-[#151B2E] hover:bg-[#1E2742] text-xs font-mono text-[#93C5FD] hover:text-white border border-white/10 flex items-center gap-1.5 self-start sm:self-auto"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>RESTORE DEMO</span>
            </button>
          </div>
        </div>
      </div>

      {/* Production Notice */}
      <div className="p-4 rounded-2xl bg-[rgba(10,19,51,0.6)] border border-white/5 flex items-start gap-3 text-xs text-[#93C5FD]">
        <Info className="w-4 h-4 text-[#38BDF8] shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong>FutureMail Architecture Notice:</strong> In this client-side environment, future arrivals are computed and scheduled via persistent LocalStorage with an active countdown engine. The Future Sky engine renders real-time atmospheric twilight, dynamic auroral ribbons, and meteors in pure Canvas and CSS.
        </p>
      </div>
    </div>
  );
};
