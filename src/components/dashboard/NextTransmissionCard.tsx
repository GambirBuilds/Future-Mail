import React from 'react';
import { useFutureMail } from '../../context/FutureMailContext';
import { formatTemporalDate, calculateJourneyProgress } from '../../utils/dateUtils';
import { ArrowUpRight, Compass, ShieldCheck } from 'lucide-react';
import { sound } from '../../utils/audio';

interface NextTransmissionCardProps {
  onOpenDetails: (id: string) => void;
}

export const NextTransmissionCard: React.FC<NextTransmissionCardProps> = ({ onOpenDetails }) => {
  const { nextScheduledMessage, setActiveTab } = useFutureMail();

  if (!nextScheduledMessage) {
    return null;
  }

  const progress = calculateJourneyProgress(
    nextScheduledMessage.createdAt,
    nextScheduledMessage.scheduledFor
  );

  const handleOpen = () => {
    sound.playTick();
    onOpenDetails(nextScheduledMessage.id);
  };

  return (
    <div className="relative glass-panel rounded-3xl p-6 sm:p-8 border border-sky-400/20 overflow-hidden shadow-2xl group transition-all duration-300 hover:border-sky-400/50">
      {/* Animated subtle scanning laser beam */}
      <div className="absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#38BDF8] to-transparent animate-scanline pointer-events-none" />

      {/* Top Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#2FFFD2] opacity-75" />
            <span className="relative inline-flex rounded-full h-3 w-3 bg-[#2FFFD2]" />
          </span>
          <span className="font-future text-xs font-semibold tracking-wider text-[#2FFFD2] uppercase">
            TRANSMISSION SCHEDULED
          </span>
        </div>

        <div className="flex items-center gap-1.5 text-xs font-mono text-[#93C5FD]">
          <ShieldCheck className="w-3.5 h-3.5 text-[#38BDF8]" />
          <span>QUANTUM SEALED</span>
        </div>
      </div>

      {/* Subject Line */}
      <div className="mb-6">
        <h3 className="font-heading text-xl sm:text-2xl font-bold text-[#F0F7FF] tracking-tight group-hover:text-white transition-colors line-clamp-2">
          "{nextScheduledMessage.subject}"
        </h3>
        <p className="text-xs font-mono text-[#93C5FD] mt-2 flex items-center gap-2">
          <span>RECIPIENT: {nextScheduledMessage.recipient.toUpperCase()}</span>
          <span>·</span>
          <span>ORIGIN: {nextScheduledMessage.timeCoordinates.originYear}</span>
        </p>
      </div>

      {/* Destination Date */}
      <div className="mb-6 bg-[rgba(10,19,51,0.85)] rounded-2xl p-4 border border-sky-400/20 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <span className="text-[11px] font-mono uppercase text-[#93C5FD] block tracking-wider">
            DESTINATION
          </span>
          <span className="font-future text-base sm:text-lg font-bold text-[#38BDF8]">
            {formatTemporalDate(nextScheduledMessage.scheduledFor)}
          </span>
        </div>
        <div className="text-right sm:text-right">
          <span className="text-[11px] font-mono uppercase text-[#93C5FD] block tracking-wider">
            STARDATE
          </span>
          <span className="font-mono text-xs text-[#C4B5FD]">
            {nextScheduledMessage.timeCoordinates.stardate}
          </span>
        </div>
      </div>

      {/* Journey Progress Bar */}
      <div className="mb-6">
        <div className="flex items-center justify-between text-xs font-mono mb-2">
          <span className="text-[#93C5FD] uppercase">TEMPORAL TRAJECTORY</span>
          <span className="text-[#2FFFD2] font-semibold">{progress}% OF THE JOURNEY COMPLETE</span>
        </div>
        <div className="w-full h-2 rounded-full bg-[rgba(10,19,51,0.9)] overflow-hidden p-0.5 border border-sky-400/20">
          <div 
            className="h-full rounded-full bg-gradient-to-r from-[#818CF8] via-[#38BDF8] to-[#2FFFD2] transition-all duration-1000 shadow-[0_0_10px_rgba(47,255,210,0.5)]"
            style={{ width: `${Math.max(5, progress)}%` }}
          />
        </div>
      </div>

      {/* Action Footer */}
      <div className="flex items-center justify-between pt-2">
        <div className="text-xs text-[#93C5FD] font-mono flex items-center gap-1.5">
          <Compass className="w-3.5 h-3.5 text-[#818CF8]" />
          <span>Vector: {nextScheduledMessage.timeCoordinates.temporalVariance || 'LOCKED'}</span>
        </div>

        <button
          onClick={handleOpen}
          className="flex items-center gap-2 px-5 py-2.5 text-xs font-mono uppercase tracking-wider font-semibold text-[#F0F7FF] bg-[rgba(16,28,71,0.8)] hover:bg-[rgba(24,40,94,0.9)] hover:text-[#2FFFD2] border border-sky-400/25 hover:border-[#2FFFD2]/40 rounded-xl transition-all shadow-md group/btn"
        >
          <span>OPEN DETAILS</span>
          <ArrowUpRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
        </button>
      </div>
    </div>
  );
};
