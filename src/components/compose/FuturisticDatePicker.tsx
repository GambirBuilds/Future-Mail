import React, { useState, useMemo } from 'react';
import { getDaysUntil, formatTemporalDate, generateStardate } from '../../utils/dateUtils';
import { sound } from '../../utils/audio';
import { Calendar as CalendarIcon, Zap, Clock, ChevronLeft, ChevronRight } from 'lucide-react';

interface FuturisticDatePickerProps {
  value: string; // ISO string
  onChange: (isoDate: string) => void;
}

const MONTHS = [
  'JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN',
  'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'
];

export const FuturisticDatePicker: React.FC<FuturisticDatePickerProps> = ({ value, onChange }) => {
  const currentDate = useMemo(() => new Date(value || Date.now() + 86400000 * 365), [value]);

  const [selectedYear, setSelectedYear] = useState<number>(currentDate.getFullYear());
  const [selectedMonth, setSelectedMonth] = useState<number>(currentDate.getMonth());
  const [selectedDay, setSelectedDay] = useState<number>(currentDate.getDate());

  const daysInMonth = useMemo(() => {
    return new Date(selectedYear, selectedMonth + 1, 0).getDate();
  }, [selectedYear, selectedMonth]);

  const daysUntil = useMemo(() => {
    const target = new Date(selectedYear, selectedMonth, selectedDay, 12, 0, 0);
    return getDaysUntil(target.toISOString());
  }, [selectedYear, selectedMonth, selectedDay]);

  const applyChange = (year: number, month: number, day: number) => {
    sound.playTick();
    const safeDay = Math.min(day, new Date(year, month + 1, 0).getDate());
    const newDate = new Date(year, month, safeDay, 12, 0, 0);
    setSelectedYear(year);
    setSelectedMonth(month);
    setSelectedDay(safeDay);
    onChange(newDate.toISOString());
  };

  // Quick preset milestones
  const presets = [
    { label: '+6 Months', days: 182 },
    { label: '+1 Year', days: 365 },
    { label: '+3 Years', days: 1095 },
    { label: '+5 Years', days: 1825 },
    { label: '+10 Years', days: 3652 },
    { label: 'New Year 2030', customDate: new Date(2030, 0, 1, 0, 0, 0) },
  ];

  const handlePreset = (preset: typeof presets[0]) => {
    sound.playLockChime();
    let target: Date;
    if (preset.customDate) {
      target = preset.customDate;
    } else {
      target = new Date(Date.now() + (preset.days || 365) * 86400000);
    }
    setSelectedYear(target.getFullYear());
    setSelectedMonth(target.getMonth());
    setSelectedDay(target.getDate());
    onChange(target.toISOString());
  };

  // Generate list of available future years
  const startYear = 2026;
  const years = Array.from({ length: 15 }, (_, i) => startYear + i);

  return (
    <div className="glass-panel rounded-2xl p-5 border border-white/10 space-y-5">
      {/* Top Banner: Arrival summary with giant glow */}
      <div className="bg-[#090D1A]/80 rounded-xl p-4 border border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <span className="text-[10px] font-mono uppercase tracking-widest text-[#64748B] block">
            TEMPORAL ARRIVAL COORDINATES
          </span>
          <span className="font-heading text-lg font-bold text-[#EAF2FF]">
            {formatTemporalDate(new Date(selectedYear, selectedMonth, selectedDay).toISOString())}
          </span>
        </div>

        <div className="text-left sm:text-right">
          <span className="text-[10px] font-mono uppercase tracking-widest text-[#64748B] block">
            MESSAGE WILL ARRIVE IN
          </span>
          <div className="flex items-baseline gap-1.5 sm:justify-end">
            <span className="font-future text-2xl font-bold text-[#2FFFD2] drop-shadow-[0_0_12px_rgba(47,255,210,0.6)] tabular-nums">
              {daysUntil}
            </span>
            <span className="font-future text-xs text-[#2FFFD2] uppercase">
              DAYS
            </span>
          </div>
        </div>
      </div>

      {/* Quick Presets Ribbon */}
      <div>
        <div className="flex items-center gap-1.5 text-xs font-mono text-[#94A3B8] mb-2">
          <Zap className="w-3.5 h-3.5 text-[#38BDF8]" />
          <span>INSTANT TEMPORAL JUMP</span>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {presets.map((p, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handlePreset(p)}
              className="px-2.5 py-1 text-xs font-mono rounded-lg bg-[#151B2E] hover:bg-[#1E2742] text-[#94A3B8] hover:text-[#2FFFD2] border border-white/5 hover:border-[#2FFFD2]/30 transition-all"
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {/* Year Selector Carousel */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-mono text-[#94A3B8]">SELECT CALENDAR YEAR</span>
          <span className="text-xs font-mono text-[#38BDF8]">YEAR: {selectedYear}</span>
        </div>
        <div className="flex items-center gap-1 overflow-x-auto pb-2 scrollbar-none">
          {years.map((y) => {
            const isY = selectedYear === y;
            return (
              <button
                key={y}
                type="button"
                onClick={() => applyChange(y, selectedMonth, selectedDay)}
                className={`px-3 py-1.5 rounded-lg text-xs font-future font-semibold transition-all shrink-0 ${
                  isY
                    ? 'gradient-primary text-white shadow-[0_0_12px_rgba(139,92,246,0.6)] scale-105'
                    : 'bg-[#090D1A] text-[#94A3B8] hover:text-white hover:bg-[#151B2E] border border-white/5'
                }`}
              >
                {y}
              </button>
            );
          })}
        </div>
      </div>

      {/* Month Matrix */}
      <div>
        <span className="text-xs font-mono text-[#94A3B8] block mb-2">SELECT MONTH</span>
        <div className="grid grid-cols-4 sm:grid-cols-6 gap-1.5">
          {MONTHS.map((m, mIdx) => {
            const isM = selectedMonth === mIdx;
            return (
              <button
                key={m}
                type="button"
                onClick={() => applyChange(selectedYear, mIdx, selectedDay)}
                className={`py-2 rounded-lg text-xs font-mono font-medium transition-all ${
                  isM
                    ? 'bg-[#22D3EE]/20 border border-[#22D3EE] text-[#22D3EE] shadow-[0_0_10px_rgba(34,211,238,0.4)]'
                    : 'bg-[#090D1A] text-[#94A3B8] hover:text-white hover:bg-[#151B2E] border border-white/5'
                }`}
              >
                {m}
              </button>
            );
          })}
        </div>
      </div>

      {/* Day Selector Matrix */}
      <div>
        <span className="text-xs font-mono text-[#94A3B8] block mb-2">SELECT DAY</span>
        <div className="grid grid-cols-7 gap-1">
          {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((d) => {
            const isD = selectedDay === d;
            return (
              <button
                key={d}
                type="button"
                onClick={() => applyChange(selectedYear, selectedMonth, d)}
                className={`h-8 rounded-lg text-xs font-mono font-medium transition-all flex items-center justify-center ${
                  isD
                    ? 'bg-[#2FFFD2] text-[#050711] font-bold shadow-[0_0_12px_rgba(47,255,210,0.7)] scale-105'
                    : 'bg-[#090D1A]/50 text-[#94A3B8] hover:text-white hover:bg-[#151B2E] border border-white/5'
                }`}
              >
                {d}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
