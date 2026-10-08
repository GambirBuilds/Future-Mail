import React from 'react';
import { FutureMessage } from '../../types';
import { formatTemporalDate, calculateTimeRemaining, calculateJourneyProgress } from '../../utils/dateUtils';
import { sound } from '../../utils/audio';
import { 
  Lock, 
  Unlock, 
  Clock, 
  Sparkles, 
  User, 
  ArrowUpRight, 
  FastForward,
  Star
} from 'lucide-react';

interface CapsuleCardProps {
  message: FutureMessage;
  onOpen: (id: string) => void;
  onSimulateDelivery: (id: string) => void;
  onToggleFavorite?: (id: string) => void;
}

export const CapsuleCard: React.FC<CapsuleCardProps> = ({
  message,
  onOpen,
  onSimulateDelivery,
  onToggleFavorite,
}) => {
  const timeLeft = calculateTimeRemaining(message.scheduledFor);
  const progress = calculateJourneyProgress(message.createdAt, message.scheduledFor);
  const isDelivered = message.status === 'delivered';
  const isDraft = message.status === 'draft';

  const handleCardClick = () => {
    sound.playTick();
    onOpen(message.id);
  };

  return (
    <div 
      onClick={handleCardClick}
      className="glass-card glass-card-interactive rounded-2xl p-5 border border-white/10 hover:border-[#8B5CF6]/50 flex flex-col justify-between cursor-pointer group relative overflow-hidden"
    >
      {/* Top Status & Category Row */}
      <div>
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <span 
              className={`w-2 h-2 rounded-full ${
                isDelivered 
                  ? 'bg-[#2FFFD2]' 
                  : isDraft 
                  ? 'bg-amber-400' 
                  : 'bg-[#8B5CF6] animate-pulse'
              }`} 
            />
            <span className="text-xs font-mono tracking-wider text-[#94A3B8] uppercase">
              {isDelivered ? 'ARRIVED' : isDraft ? 'DRAFT' : 'SCHEDULED'}
            </span>
            <span className="text-slate-600">·</span>
            <span className="text-xs font-mono text-[#38BDF8] truncate max-w-[140px]">
              {message.category}
            </span>
          </div>

          {onToggleFavorite && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                sound.playTick();
                onToggleFavorite(message.id);
              }}
              className="text-[#64748B] hover:text-amber-400 p-1"
            >
              <Star className={`w-3.5 h-3.5 ${message.isFavorite ? 'text-amber-400 fill-amber-400' : ''}`} />
            </button>
          )}
        </div>

        {/* Subject */}
        <h3 className="font-heading text-base font-bold text-[#EAF2FF] group-hover:text-white transition-colors line-clamp-2 mb-2">
          {message.subject}
        </h3>

        {/* Recipient unboxed text */}
        <p className="text-xs font-mono text-[#94A3B8] flex items-center gap-1.5 mb-4">
          <User className="w-3 h-3 text-[#64748B]" />
          <span>For: {message.recipient}</span>
        </p>

        {/* Content snippet */}
        <p className="text-xs text-[#94A3B8] line-clamp-2 mb-4 leading-relaxed font-sans">
          {message.content}
        </p>
      </div>

      {/* Card Footer: Date, Countdown, & Progress */}
      <div className="pt-3 border-t border-white/5 space-y-2">
        <div className="flex items-center justify-between text-xs font-mono">
          <span className="text-[#64748B]">
            {isDelivered ? 'Delivered:' : 'Target:'} {formatTemporalDate(message.scheduledFor)}
          </span>
          <span className="text-[#2FFFD2] font-semibold">
            {isDelivered 
              ? 'READABLE' 
              : isDraft 
              ? 'UNSEALED' 
              : `${timeLeft.days}d left`}
          </span>
        </div>

        {/* Progress rail */}
        {!isDelivered && !isDraft && (
          <div className="w-full h-1.5 rounded-full bg-[#090D1A] overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-[#8B5CF6] to-[#2FFFD2]"
              style={{ width: `${Math.max(5, progress)}%` }}
            />
          </div>
        )}

        {/* Micro actions */}
        <div className="flex items-center justify-between pt-1">
          <span className="text-[10px] font-mono text-[#64748B]">
            {message.timeCoordinates.stardate}
          </span>

          <div className="flex items-center gap-2">
            {!isDelivered && !isDraft && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  sound.playTick();
                  onSimulateDelivery(message.id);
                }}
                className="text-[10px] font-mono text-[#38BDF8] hover:text-[#2FFFD2] flex items-center gap-1 px-1.5 py-0.5 rounded bg-white/5 hover:bg-white/10"
                title="Simulate immediate arrival"
              >
                <FastForward className="w-2.5 h-2.5" />
                <span>Test Unlock</span>
              </button>
            )}

            <span className="text-xs text-[#38BDF8] group-hover:translate-x-0.5 transition-transform flex items-center gap-0.5 font-mono">
              OPEN <ArrowUpRight className="w-3 h-3" />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
