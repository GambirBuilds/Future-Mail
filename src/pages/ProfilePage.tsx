import React, { useState } from 'react';
import { useFutureMail } from '../context/FutureMailContext';
import { sound } from '../utils/audio';
import { formatTemporalDate } from '../utils/dateUtils';
import { 
  Send, 
  Compass, 
  Rocket, 
  BookOpen, 
  MailCheck, 
  Layers, 
  Flame, 
  Calendar, 
  Sparkles, 
  Award,
  Edit2,
  Check
} from 'lucide-react';

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  Send,
  Compass,
  Rocket,
  BookOpen,
  MailCheck,
  Layers,
};

export const ProfilePage: React.FC = () => {
  const { user, stats, achievements, updateUser } = useFutureMail();
  const [isEditing, setIsEditing] = useState(false);
  const [callsignInput, setCallsignInput] = useState(user.callsign);
  const [emailInput, setEmailInput] = useState(user.email);
  const [timezoneInput, setTimezoneInput] = useState(user.timeZone);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    sound.playLockChime();
    updateUser({
      callsign: callsignInput,
      email: emailInput,
      timeZone: timezoneInput,
    });
    setIsEditing(false);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-10 pb-16">
      {/* Top Profile Header Card */}
      <div className="glass-panel rounded-3xl p-6 sm:p-10 border border-white/10 relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#8B5CF6]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col sm:flex-row items-center sm:items-start gap-6">
          {/* Avatar Hologram */}
          <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-[#090D1A] border-2 border-[#2FFFD2] p-1 shadow-[0_0_20px_rgba(47,255,210,0.3)] shrink-0 flex items-center justify-center">
            <div className="w-full h-full rounded-xl gradient-primary flex items-center justify-center">
              <span className="font-future font-extrabold text-2xl sm:text-3xl text-white">
                {user.callsign.substring(0, 2).toUpperCase()}
              </span>
            </div>
            <div className="absolute -bottom-2 px-2 py-0.5 rounded-full bg-[#050711] border border-[#2FFFD2]/40 text-[9px] font-mono text-[#2FFFD2]">
              VERIFIED
            </div>
          </div>

          {/* User Details */}
          <div className="flex-1 text-center sm:text-left space-y-2">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <span className="text-[10px] font-mono tracking-widest text-[#38BDF8] uppercase">
                  FUTUREMAIL CITIZEN IDENTITY
                </span>
                <h1 className="font-heading text-2xl sm:text-3xl font-bold text-white tracking-tight">
                  {user.callsign}
                </h1>
              </div>

              <button
                onClick={() => { sound.playTick(); setIsEditing(!isEditing); }}
                className="self-center sm:self-auto px-3 py-1.5 rounded-xl bg-[#151B2E] border border-white/10 hover:border-[#2FFFD2]/30 text-xs font-mono text-[#94A3B8] hover:text-white transition-all flex items-center gap-1.5"
              >
                <Edit2 className="w-3.5 h-3.5" />
                <span>{isEditing ? 'Cancel' : 'Edit Credentials'}</span>
              </button>
            </div>

            <p className="text-xs font-mono text-[#94A3B8]">
              {user.email} · {user.timeZone}
            </p>

            <div className="pt-2 flex flex-wrap gap-2 justify-center sm:justify-start">
              <span className="text-[11px] font-mono px-2.5 py-1 rounded-lg bg-[#090D1A] border border-white/5 text-[#C4B5FD]">
                ORIGIN YEAR: {user.originYear}
              </span>
              <span className="text-[11px] font-mono px-2.5 py-1 rounded-lg bg-[#090D1A] border border-white/5 text-[#2FFFD2]">
                STATUS: TIME TRAVELER ACTIVE
              </span>
            </div>
          </div>
        </div>

        {/* Edit Credentials Form */}
        {isEditing && (
          <form onSubmit={handleSave} className="mt-6 pt-6 border-t border-white/10 space-y-4 animate-fade-in">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="text-[10px] font-mono text-[#94A3B8] block mb-1">CALLSIGN NAME</label>
                <input
                  type="text"
                  value={callsignInput}
                  onChange={(e) => setCallsignInput(e.target.value)}
                  className="w-full bg-[#090D1A] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#2FFFD2]"
                />
              </div>
              <div>
                <label className="text-[10px] font-mono text-[#94A3B8] block mb-1">TIMEZONE</label>
                <input
                  type="text"
                  value={timezoneInput}
                  onChange={(e) => setTimezoneInput(e.target.value)}
                  className="w-full bg-[#090D1A] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#2FFFD2]"
                />
              </div>
              <div>
                <label className="text-[10px] font-mono text-[#94A3B8] block mb-1">EMAIL ADDRESS</label>
                <input
                  type="email"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  className="w-full bg-[#090D1A] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#2FFFD2]"
                />
              </div>
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-[#2FFFD2] text-[#050711] font-future font-bold text-xs hover:opacity-90 flex items-center gap-1.5"
              >
                <Check className="w-3.5 h-3.5" />
                <span>SAVE CHANGES</span>
              </button>
            </div>
          </form>
        )}
      </div>

      {/* Metrics Row: 4 Boxes */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="glass-panel p-5 rounded-2xl border border-white/5 text-center sm:text-left">
          <span className="text-[10px] font-mono text-[#94A3B8] uppercase block mb-1">
            MEMORIES CREATED
          </span>
          <span className="font-future text-3xl font-bold text-white tabular-nums">
            {stats.totalMessages}
          </span>
          <span className="text-[10px] font-mono text-[#64748B] block mt-1">Transmissions</span>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-white/5 text-center sm:text-left">
          <span className="text-[10px] font-mono text-[#94A3B8] uppercase block mb-1">
            FUTURE YEARS
          </span>
          <span className="font-future text-2xl sm:text-3xl font-bold text-[#38BDF8] tabular-nums">
            {stats.futureYearsSpan}
          </span>
          <span className="text-[10px] font-mono text-[#64748B] block mt-1">Horizon Range</span>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-white/5 text-center sm:text-left">
          <span className="text-[10px] font-mono text-[#94A3B8] uppercase block mb-1">
            WRITING STREAK
          </span>
          <span className="font-future text-3xl font-bold text-[#2FFFD2] tabular-nums">
            {stats.writingStreak}
          </span>
          <span className="text-[10px] font-mono text-[#64748B] block mt-1">Days Consecutive</span>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-white/5 text-center sm:text-left">
          <span className="text-[10px] font-mono text-[#94A3B8] uppercase block mb-1">
            ARRIVED & OPENED
          </span>
          <span className="font-future text-3xl font-bold text-[#C4B5FD] tabular-nums">
            {stats.deliveredCount}
          </span>
          <span className="text-[10px] font-mono text-[#64748B] block mt-1">Delivered</span>
        </div>
      </div>

      {/* Holographic Achievements Section */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-[#2FFFD2]" />
            <h2 className="font-heading text-xl font-bold text-white tracking-tight">
              HOLOGRAPHIC ACHIEVEMENTS
            </h2>
          </div>
          <span className="text-xs font-mono text-[#94A3B8]">
            {achievements.filter((a) => a.unlockedAt).length} / {achievements.length} UNLOCKED
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {achievements.map((ach) => {
            const Icon = ICON_MAP[ach.iconName] || Award;
            const isUnlocked = Boolean(ach.unlockedAt);

            return (
              <div
                key={ach.id}
                className={`p-5 rounded-2xl border transition-all duration-300 relative overflow-hidden flex items-start gap-4 ${
                  isUnlocked
                    ? 'glass-panel border-[#8B5CF6]/40 hover:border-[#2FFFD2]/50 shadow-[0_0_20px_rgba(139,92,246,0.15)]'
                    : 'bg-[#090D1A]/50 border-white/5 opacity-60'
                }`}
              >
                {/* Achievement Badge Orb */}
                <div 
                  className={`w-12 h-12 rounded-xl shrink-0 flex items-center justify-center transition-transform ${
                    isUnlocked 
                      ? 'bg-gradient-to-tr from-[#8B5CF6] to-[#22D3EE] text-white shadow-[0_0_15px_rgba(139,92,246,0.5)]' 
                      : 'bg-[#151B2E] text-[#64748B]'
                  }`}
                >
                  <Icon className="w-6 h-6" />
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <h3 className={`font-future text-xs font-bold tracking-wider ${
                      isUnlocked ? 'text-[#EAF2FF]' : 'text-[#94A3B8]'
                    }`}>
                      {ach.title}
                    </h3>
                    <span className={`text-[9px] font-mono px-1.5 py-0.5 rounded ${
                      ach.rarity === 'Quantum' 
                        ? 'bg-[#2FFFD2]/20 text-[#2FFFD2]' 
                        : ach.rarity === 'Legendary' 
                        ? 'bg-[#8B5CF6]/20 text-[#C4B5FD]' 
                        : 'bg-white/5 text-[#94A3B8]'
                    }`}>
                      {ach.rarity.toUpperCase()}
                    </span>
                  </div>

                  <p className="text-xs text-[#94A3B8] leading-relaxed mb-2">
                    {ach.description}
                  </p>

                  {/* Progress or unlock date */}
                  {isUnlocked ? (
                    <span className="text-[10px] font-mono text-[#2FFFD2] block">
                      ✓ UNLOCKED {ach.unlockedAt ? formatTemporalDate(ach.unlockedAt) : ''}
                    </span>
                  ) : (
                    <div className="space-y-1">
                      <div className="flex justify-between text-[10px] font-mono text-[#64748B]">
                        <span>PROGRESS</span>
                        <span>{ach.progress}%</span>
                      </div>
                      <div className="w-full h-1 bg-[#151B2E] rounded-full overflow-hidden">
                        <div className="h-full bg-[#8B5CF6]" style={{ width: `${ach.progress}%` }} />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
