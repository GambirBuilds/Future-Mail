import React, { useState, useEffect } from 'react';
import { useFutureMail } from '../../context/FutureMailContext';
import { calculateTimeRemaining, TimeRemaining, formatTemporalDate } from '../../utils/dateUtils';
import { Clock, Sparkles } from 'lucide-react';

export const CountdownHero: React.FC = () => {
  const { user, nextScheduledMessage, setActiveTab } = useFutureMail();
  const [timeLeft, setTimeLeft] = useState<TimeRemaining>({
    totalSeconds: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isPast: true,
  });

  useEffect(() => {
    if (!nextScheduledMessage) return;

    const updateTimer = () => {
      setTimeLeft(calculateTimeRemaining(nextScheduledMessage.scheduledFor));
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [nextScheduledMessage]);

  const firstName = user.callsign.split(' ')[0].toUpperCase();

  return (
    <div className="relative glass-panel rounded-3xl p-6 sm:p-10 border border-sky-400/20 overflow-hidden shadow-2xl">
      {/* Background ambient radial glow */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#38BDF8]/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-[#2FFFD2]/15 rounded-full blur-3xl pointer-events-none" />

      {/* Greeting line */}
      <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
        <div>
          <span className="text-xs font-mono tracking-widest text-[#2FFFD2] uppercase">
            CHRONO-STATION // FUTURE SKY ACTIVE
          </span>
          <h2 className="font-heading text-2xl sm:text-3xl font-bold text-[#F0F7FF] tracking-tight mt-1">
            GOOD MORNING, {firstName}
          </h2>
        </div>

        {nextScheduledMessage && (
          <div className="flex items-center gap-2 text-xs font-mono text-[#93C5FD] px-3 py-1.5 rounded-lg bg-[rgba(10,19,51,0.8)] border border-sky-400/20">
            <Clock className="w-3.5 h-3.5 text-[#38BDF8]" />
            <span>Target: {formatTemporalDate(nextScheduledMessage.scheduledFor)}</span>
          </div>
        )}
      </div>

      {nextScheduledMessage ? (
        <div className="relative z-10 text-center py-6 sm:py-10">
          <p className="text-sm sm:text-base font-mono tracking-wider text-[#94A3B8] mb-4 uppercase">
            Your next message arrives in...
          </p>

          {/* Giant Countdown Display with soft glow */}
          <div className="flex flex-col items-center justify-center">
            {/* Days Banner */}
            <div className="mb-4 sm:mb-6">
              <span className="font-future text-6xl sm:text-8xl md:text-9xl font-extrabold tracking-tight text-white drop-shadow-[0_0_35px_rgba(47,255,210,0.35)] tabular-nums">
                {String(timeLeft.days).padStart(3, '0')}
              </span>
              <span className="block text-sm sm:text-base font-future tracking-widest text-[#2FFFD2] uppercase mt-1 font-semibold">
                DAYS
              </span>
            </div>

            {/* Hours, Minutes, Seconds */}
            <div className="flex items-center justify-center gap-4 sm:gap-10 pt-2 border-t border-white/10 max-w-lg mx-auto w-full">
              <div className="text-center">
                <span className="font-future text-2xl sm:text-4xl md:text-5xl font-bold text-[#EAF2FF] drop-shadow-[0_0_15px_rgba(139,92,246,0.3)] tabular-nums">
                  {String(timeLeft.hours).padStart(2, '0')}
                </span>
                <span className="block text-[10px] sm:text-xs font-mono tracking-wider text-[#94A3B8] uppercase mt-1">
                  HOURS
                </span>
              </div>

              <span className="font-future text-2xl sm:text-3xl text-[#38BDF8] opacity-60">:</span>

              <div className="text-center">
                <span className="font-future text-2xl sm:text-4xl md:text-5xl font-bold text-[#EAF2FF] drop-shadow-[0_0_15px_rgba(59,130,246,0.3)] tabular-nums">
                  {String(timeLeft.minutes).padStart(2, '0')}
                </span>
                <span className="block text-[10px] sm:text-xs font-mono tracking-wider text-[#94A3B8] uppercase mt-1">
                  MINUTES
                </span>
              </div>

              <span className="font-future text-2xl sm:text-3xl text-[#38BDF8] opacity-60">:</span>

              <div className="text-center">
                <span className="font-future text-2xl sm:text-4xl md:text-5xl font-bold text-[#22D3EE] drop-shadow-[0_0_15px_rgba(34,211,238,0.4)] tabular-nums">
                  {String(timeLeft.seconds).padStart(2, '0')}
                </span>
                <span className="block text-[10px] sm:text-xs font-mono tracking-wider text-[#22D3EE] uppercase mt-1">
                  SECONDS
                </span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="relative z-10 py-12 text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-[#151B2E] border border-white/10 flex items-center justify-center">
            <Sparkles className="w-8 h-8 text-[#2FFFD2]" />
          </div>
          <h3 className="font-heading text-lg font-bold text-white mb-2">No Active Transmissions in Flight</h3>
          <p className="text-sm text-[#94A3B8] max-w-md mx-auto mb-6">
            The timeline is silent. Choose a moment in the future and send your first words forward.
          </p>
          <button
            onClick={() => setActiveTab('compose')}
            className="px-6 py-2.5 text-sm font-medium text-white gradient-primary rounded-xl hover:opacity-95 shadow-lg transition-all"
          >
            Launch First Transmission
          </button>
        </div>
      )}
    </div>
  );
};
