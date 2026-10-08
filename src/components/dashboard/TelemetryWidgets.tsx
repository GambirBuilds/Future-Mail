import React from 'react';
import { useFutureMail } from '../../context/FutureMailContext';
import { Send, Flame, Sparkles, Calendar, Layers, Clock } from 'lucide-react';
import { formatShortDate } from '../../utils/dateUtils';
import { sound } from '../../utils/audio';

export const TelemetryWidgets: React.FC = () => {
  const { stats, messages, setActiveTab } = useFutureMail();

  // Next 3 upcoming transmissions
  const upcoming = messages
    .filter((m) => m.status === 'scheduled')
    .sort((a, b) => new Date(a.scheduledFor).getTime() - new Date(b.scheduledFor).getTime())
    .slice(0, 3);

  const widgets = [
    {
      title: 'MESSAGES IN TIME',
      value: stats.scheduledCount,
      unit: 'SCHEDULED',
      icon: Send,
      color: '#38BDF8',
      subtext: 'Active transmissions traversing future horizons',
      onClick: () => { sound.playTick(); setActiveTab('vault'); },
    },
    {
      title: 'MEMORIES CREATED',
      value: stats.totalMessages,
      unit: 'TOTAL VAULT',
      icon: Sparkles,
      color: '#C4B5FD',
      subtext: 'Letters, forecasts and reflections sealed',
      onClick: () => { sound.playTick(); setActiveTab('vault'); },
    },
    {
      title: 'WRITING STREAK',
      value: `${stats.writingStreak}`,
      unit: 'DAYS CONSECUTIVE',
      icon: Flame,
      color: '#2FFFD2',
      subtext: 'Daily temporal mindfulness habit',
      onClick: () => { sound.playTick(); setActiveTab('profile'); },
    },
    {
      title: 'TIME CAPSULE SPAN',
      value: stats.futureYearsSpan,
      unit: 'CALENDAR HORIZON',
      icon: Calendar,
      color: '#8B5CF6',
      subtext: 'Furthest temporal coordinate mapped',
      onClick: () => { sound.playTick(); setActiveTab('timeline'); },
    },
  ];

  return (
    <div className="space-y-6">
      {/* 4 Telemetry Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {widgets.map((widget, i) => {
          const Icon = widget.icon;
          return (
            <div
              key={i}
              onClick={widget.onClick}
              className="glass-panel p-5 rounded-2xl border border-white/5 hover:border-white/20 transition-all duration-200 cursor-pointer group flex flex-col justify-between"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] font-mono tracking-wider text-[#94A3B8] uppercase">
                  {widget.title}
                </span>
                <div 
                  className="w-7 h-7 rounded-lg flex items-center justify-center transition-transform group-hover:scale-110"
                  style={{ backgroundColor: `${widget.color}15` }}
                >
                  <Icon className="w-3.5 h-3.5" style={{ color: widget.color }} />
                </div>
              </div>

              <div>
                <div className="flex items-baseline gap-2">
                  <span className="font-future text-2xl sm:text-3xl font-bold text-[#EAF2FF] tracking-tight group-hover:text-white tabular-nums">
                    {widget.value}
                  </span>
                  <span className="text-[10px] font-mono text-[#64748B] uppercase">
                    {widget.unit}
                  </span>
                </div>
                <p className="text-xs text-[#94A3B8] mt-1.5 line-clamp-1">
                  {widget.subtext}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Mini Horizon Feed */}
      <div className="glass-panel rounded-2xl p-5 border border-white/5">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-[#38BDF8]" />
            <h4 className="text-sm font-semibold text-[#EAF2FF]">
              Upcoming Temporal Arrivals
            </h4>
          </div>
          <button 
            onClick={() => { sound.playTick(); setActiveTab('timeline'); }}
            className="text-xs font-mono text-[#2FFFD2] hover:underline"
          >
            VIEW FULL TRAJECTORY →
          </button>
        </div>

        {upcoming.length > 0 ? (
          <div className="divide-y divide-white/5">
            {upcoming.map((msg) => (
              <div 
                key={msg.id}
                onClick={() => { sound.playTick(); setActiveTab('vault'); }}
                className="py-3 flex items-center justify-between hover:bg-white/5 px-2 rounded-lg transition-colors cursor-pointer group"
              >
                <div className="flex items-center gap-3 min-w-0 pr-4">
                  <div className="w-2 h-2 rounded-full bg-[#8B5CF6] group-hover:bg-[#2FFFD2] transition-colors shrink-0" />
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-[#EAF2FF] truncate group-hover:text-white">
                      {msg.subject}
                    </p>
                    <p className="text-xs text-[#64748B] font-mono">
                      For: {msg.recipient} · {msg.category}
                    </p>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <span className="text-xs font-mono font-medium text-[#38BDF8] block">
                    {formatShortDate(msg.scheduledFor)}
                  </span>
                  <span className="text-[10px] font-mono text-[#64748B]">
                    {msg.timeCoordinates.stardate}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-4 text-center text-xs text-[#94A3B8]">
            No pending arrivals in the current orbit.
          </div>
        )}
      </div>
    </div>
  );
};
