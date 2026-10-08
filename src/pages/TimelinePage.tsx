import React, { useState, useMemo } from 'react';
import { useFutureMail } from '../context/FutureMailContext';
import { formatTemporalDate, calculateTimeRemaining } from '../utils/dateUtils';
import { sound } from '../utils/audio';
import { InteractiveTimeline } from '../components/hero/InteractiveTimeline';
import { TimelineTrack, FutureMessage } from '../types';
import { 
  GitCommit, 
  Calendar, 
  Clock, 
  Lock, 
  Sparkles, 
  PenTool, 
  ArrowRight,
  Users,
  Heart,
  Home,
  Briefcase,
  Layers
} from 'lucide-react';

const TRACK_TABS: {
  id: TimelineTrack;
  label: string;
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  color: string;
}[] = [
  { id: 'all', label: 'All Dimensions', icon: Layers, color: '#38BDF8' },
  { id: 'friendship', label: 'Friendship', icon: Users, color: '#2FFFD2' },
  { id: 'life', label: 'Life & Self', icon: Heart, color: '#818CF8' },
  { id: 'family', label: 'Family', icon: Home, color: '#FB7185' },
  { id: 'career', label: 'Career', icon: Briefcase, color: '#38BDF8' },
];

function matchesTrack(msg: FutureMessage, track: TimelineTrack): boolean {
  if (track === 'all') return true;
  if (track === 'friendship') {
    return (
      msg.category === 'Friendship & Bonds' ||
      msg.category === 'Love & Gratitude' ||
      msg.recipientRelationship === 'friend' ||
      (msg.tags?.includes('friendship') ?? false)
    );
  }
  if (track === 'life') {
    return (
      msg.category === 'Life & Self' ||
      msg.category === 'Personal Reflection' ||
      msg.category === 'Wisdom & Advice' ||
      (msg.tags?.includes('life') ?? false)
    );
  }
  if (track === 'family') {
    return (
      msg.category === 'Family & Heritage' ||
      msg.category === 'Letters to Children' ||
      msg.recipientRelationship === 'child' ||
      msg.recipientRelationship === 'loved-one' ||
      (msg.tags?.includes('family') ?? false)
    );
  }
  if (track === 'career') {
    return (
      msg.category === 'Career & Ambition' ||
      msg.category === 'Milestones & Goals' ||
      msg.category === 'World Predictions' ||
      msg.recipientRelationship === 'team' ||
      (msg.tags?.includes('career') ?? false)
    );
  }
  return true;
}

export const TimelinePage: React.FC = () => {
  const { messages, setActiveTab } = useFutureMail();
  const [selectedTrack, setSelectedTrack] = useState<TimelineTrack>('all');
  const [selectedYearFilter, setSelectedYearFilter] = useState<number | 'all'>('all');

  const scheduled = useMemo(() => {
    return [...messages]
      .filter((m) => m.status === 'scheduled')
      .sort((a, b) => new Date(a.scheduledFor).getTime() - new Date(b.scheduledFor).getTime());
  }, [messages]);

  // Track counts
  const trackCounts = useMemo(() => {
    return {
      all: scheduled.length,
      friendship: scheduled.filter((m) => matchesTrack(m, 'friendship')).length,
      life: scheduled.filter((m) => matchesTrack(m, 'life')).length,
      family: scheduled.filter((m) => matchesTrack(m, 'family')).length,
      career: scheduled.filter((m) => matchesTrack(m, 'career')).length,
    };
  }, [scheduled]);

  const uniqueYears = useMemo(() => {
    const relevant = scheduled.filter((m) => matchesTrack(m, selectedTrack));
    const yrs = new Set(relevant.map((m) => new Date(m.scheduledFor).getFullYear()));
    return Array.from(yrs).sort();
  }, [scheduled, selectedTrack]);

  const filtered = useMemo(() => {
    return scheduled.filter((m) => {
      if (!matchesTrack(m, selectedTrack)) return false;
      if (selectedYearFilter !== 'all') {
        return new Date(m.scheduledFor).getFullYear() === selectedYearFilter;
      }
      return true;
    });
  }, [scheduled, selectedTrack, selectedYearFilter]);

  const handleTrackChange = (trk: TimelineTrack) => {
    sound.playTick();
    setSelectedTrack(trk);
    setSelectedYearFilter('all');
  };

  const handleComposeWithTrack = () => {
    sound.playLockChime();
    setActiveTab('compose');
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-16">
      {/* 1. Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-mono tracking-widest text-[#38BDF8] uppercase">
            TEMPORAL TRAJECTORY ARCHIVES
          </span>
          <h1 className="font-heading text-2xl sm:text-3xl font-bold text-white tracking-tight mt-1">
            Life, Friendship, Family & Career Timelines
          </h1>
          <p className="text-sm text-[#93C5FD]">
            Chart the horizons of your relationships, personal growth, loved ones, and professional journey.
          </p>
        </div>

        <button
          onClick={handleComposeWithTrack}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl gradient-primary text-white text-xs sm:text-sm font-future font-bold shadow-lg hover:opacity-95 transition-all self-start sm:self-auto"
        >
          <PenTool className="w-3.5 h-3.5" />
          <span>Launch Into Timeline</span>
        </button>
      </div>

      {/* 2. Four Life Dimension Cards Summary */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
        <div
          onClick={() => handleTrackChange('friendship')}
          className={`p-4 rounded-2xl border cursor-pointer transition-all ${
            selectedTrack === 'friendship'
              ? 'bg-[rgba(24,40,94,0.9)] border-[#2FFFD2] shadow-[0_0_15px_rgba(47,255,210,0.25)]'
              : 'glass-panel border-sky-400/15 hover:border-sky-400/40'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-mono text-[#2FFFD2] uppercase">FRIENDSHIP</span>
            <Users className="w-4 h-4 text-[#2FFFD2]" />
          </div>
          <span className="font-future text-2xl font-bold text-white tabular-nums">
            {trackCounts.friendship}
          </span>
          <p className="text-[11px] text-[#93C5FD] mt-1 line-clamp-1">Bonds, pacts & reunions</p>
        </div>

        <div
          onClick={() => handleTrackChange('life')}
          className={`p-4 rounded-2xl border cursor-pointer transition-all ${
            selectedTrack === 'life'
              ? 'bg-[rgba(24,40,94,0.9)] border-[#818CF8] shadow-[0_0_15px_rgba(129,140,248,0.25)]'
              : 'glass-panel border-sky-400/15 hover:border-sky-400/40'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-mono text-[#818CF8] uppercase">LIFE & SELF</span>
            <Heart className="w-4 h-4 text-[#818CF8]" />
          </div>
          <span className="font-future text-2xl font-bold text-white tabular-nums">
            {trackCounts.life}
          </span>
          <p className="text-[11px] text-[#93C5FD] mt-1 line-clamp-1">Inner peace & wisdom</p>
        </div>

        <div
          onClick={() => handleTrackChange('family')}
          className={`p-4 rounded-2xl border cursor-pointer transition-all ${
            selectedTrack === 'family'
              ? 'bg-[rgba(24,40,94,0.9)] border-[#FB7185] shadow-[0_0_15px_rgba(251,113,133,0.25)]'
              : 'glass-panel border-sky-400/15 hover:border-sky-400/40'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-mono text-[#FB7185] uppercase">FAMILY</span>
            <Home className="w-4 h-4 text-[#FB7185]" />
          </div>
          <span className="font-future text-2xl font-bold text-white tabular-nums">
            {trackCounts.family}
          </span>
          <p className="text-[11px] text-[#93C5FD] mt-1 line-clamp-1">Children & heritage</p>
        </div>

        <div
          onClick={() => handleTrackChange('career')}
          className={`p-4 rounded-2xl border cursor-pointer transition-all ${
            selectedTrack === 'career'
              ? 'bg-[rgba(24,40,94,0.9)] border-[#38BDF8] shadow-[0_0_15px_rgba(56,189,248,0.25)]'
              : 'glass-panel border-sky-400/15 hover:border-sky-400/40'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-mono text-[#38BDF8] uppercase">CAREER</span>
            <Briefcase className="w-4 h-4 text-[#38BDF8]" />
          </div>
          <span className="font-future text-2xl font-bold text-white tabular-nums">
            {trackCounts.career}
          </span>
          <p className="text-[11px] text-[#93C5FD] mt-1 line-clamp-1">Founding & craft</p>
        </div>
      </div>

      {/* 3. Interactive Multi-Track Horizon Component */}
      <InteractiveTimeline defaultTrack={selectedTrack} />

      {/* 4. Track Filter Tabs & Year Selector */}
      <div className="space-y-3 pt-4 border-t border-sky-400/15">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          {/* Track Segmented Control */}
          <div className="flex items-center gap-1.5 p-1.5 rounded-2xl bg-[rgba(10,19,51,0.8)] border border-sky-400/20 overflow-x-auto scrollbar-none">
            {TRACK_TABS.map((tab) => {
              const Icon = tab.icon;
              const isSelected = selectedTrack === tab.id;
              const count = trackCounts[tab.id];

              return (
                <button
                  key={tab.id}
                  onClick={() => handleTrackChange(tab.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-mono font-medium transition-all flex items-center gap-1.5 whitespace-nowrap ${
                    isSelected
                      ? 'bg-[rgba(24,40,94,0.9)] text-[#F0F7FF] border border-sky-400/40 shadow-sm font-semibold'
                      : 'text-[#93C5FD] hover:text-white hover:bg-white/5 border border-transparent'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" style={{ color: tab.color }} />
                  <span>{tab.label}</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    isSelected ? 'bg-sky-400/20 text-[#38BDF8]' : 'bg-white/5 text-[#64748B]'
                  }`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Year Buttons */}
          <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none">
            <button
              onClick={() => { sound.playTick(); setSelectedYearFilter('all'); }}
              className={`px-2.5 py-1 rounded-xl text-xs font-future transition-all ${
                selectedYearFilter === 'all'
                  ? 'bg-sky-400/20 border border-sky-400 text-[#38BDF8]'
                  : 'bg-[rgba(10,19,51,0.7)] text-[#93C5FD] hover:text-white border border-white/5'
              }`}
            >
              All Years
            </button>
            {uniqueYears.map((yr) => (
              <button
                key={yr}
                onClick={() => { sound.playTick(); setSelectedYearFilter(yr); }}
                className={`px-2.5 py-1 rounded-xl text-xs font-future transition-all ${
                  selectedYearFilter === yr
                    ? 'bg-sky-400/20 border border-sky-400 text-[#38BDF8]'
                    : 'bg-[rgba(10,19,51,0.7)] text-[#93C5FD] hover:text-white border border-white/5'
                }`}
              >
                {yr}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 5. Chronological Stream of Transmissions for the Selected Track */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-mono tracking-wider text-[#93C5FD] uppercase flex items-center gap-2">
            <span>ACTIVE {selectedTrack.toUpperCase()} QUEUE</span>
            <span className="text-slate-600">·</span>
            <span className="text-xs text-[#38BDF8]">{filtered.length} Transmissions in Flight</span>
          </h3>
        </div>

        {filtered.length > 0 ? (
          <div className="relative pl-6 sm:pl-8 space-y-6 before:absolute before:left-2.5 before:top-3 before:bottom-3 before:w-[2px] before:bg-gradient-to-b before:from-[#2FFFD2] before:via-[#38BDF8] to-[#818CF8]">
            {filtered.map((msg) => {
              const remaining = calculateTimeRemaining(msg.scheduledFor);
              return (
                <div key={msg.id} className="relative group">
                  {/* Timeline Node Orb */}
                  <div className="absolute -left-6 sm:-left-8 top-5 w-5 h-5 rounded-full bg-[#060B1E] border-2 border-[#38BDF8] flex items-center justify-center shadow-[0_0_12px_rgba(56,189,248,0.6)]">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#2FFFD2]" />
                  </div>

                  {/* Card Container */}
                  <div className="glass-panel p-6 rounded-2xl border border-sky-400/15 hover:border-sky-400/40 transition-all duration-300">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                      <div className="flex items-center gap-2">
                        <span className="font-future text-base font-bold text-[#38BDF8]">
                          {new Date(msg.scheduledFor).getFullYear()}
                        </span>
                        <span className="text-[#64748B]">·</span>
                        <span className="text-xs font-mono text-[#93C5FD]">
                          {formatTemporalDate(msg.scheduledFor)}
                        </span>
                        <span className="text-[#64748B]">·</span>
                        <span className="text-xs font-mono text-[#C4B5FD]">
                          {msg.category}
                        </span>
                      </div>

                      <span className="text-xs font-mono text-[#2FFFD2] px-2.5 py-1 rounded bg-[rgba(10,19,51,0.8)] border border-[#2FFFD2]/20 self-start sm:self-auto">
                        In {remaining.days} Days
                      </span>
                    </div>

                    <h4 className="font-heading text-lg font-bold text-white mb-2">
                      {msg.subject}
                    </h4>

                    <p className="text-xs sm:text-sm text-[#E0F2FE]/85 line-clamp-3 leading-relaxed mb-4">
                      {msg.content}
                    </p>

                    <div className="flex items-center justify-between pt-3 border-t border-white/5 text-xs font-mono text-[#93C5FD]">
                      <span>Destination Stardate: {msg.timeCoordinates.stardate}</span>
                      <button
                        onClick={() => { sound.playTick(); setActiveTab('vault'); }}
                        className="text-[#2FFFD2] hover:underline flex items-center gap-1"
                      >
                        <span>Inspect Sealed Capsule</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="py-12 text-center glass-panel rounded-3xl border border-sky-400/15 space-y-3">
            <Sparkles className="w-8 h-8 text-[#38BDF8] mx-auto opacity-70" />
            <p className="text-sm text-white font-medium">
              No active transmissions for the {selectedTrack} timeline track.
            </p>
            <p className="text-xs text-[#93C5FD] max-w-sm mx-auto">
              Create a message for this dimension to schedule your next milestone into the future sky.
            </p>
            <button
              onClick={handleComposeWithTrack}
              className="px-5 py-2 text-xs font-future font-bold text-white gradient-primary rounded-xl shadow-md"
            >
              Compose for {selectedTrack.toUpperCase()}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
