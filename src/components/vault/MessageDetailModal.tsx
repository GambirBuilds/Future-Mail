import React, { useState } from 'react';
import { FutureMessage } from '../../types';
import { formatTemporalDate, calculateTimeRemaining, calculateJourneyProgress } from '../../utils/dateUtils';
import { sound } from '../../utils/audio';
import { 
  X, 
  Lock, 
  Unlock, 
  Clock, 
  User, 
  Send, 
  Sparkles, 
  Trash2, 
  FastForward,
  Copy,
  MessageSquare
} from 'lucide-react';

interface MessageDetailModalProps {
  message: FutureMessage | null;
  onClose: () => void;
  onDelete: (id: string) => void;
  onSimulateDelivery: (id: string) => void;
  onReply: (id: string, reply: string) => void;
}

export const MessageDetailModal: React.FC<MessageDetailModalProps> = ({
  message,
  onClose,
  onDelete,
  onSimulateDelivery,
  onReply,
}) => {
  const [replyInput, setReplyInput] = useState('');
  const [copied, setCopied] = useState(false);

  if (!message) return null;

  const timeLeft = calculateTimeRemaining(message.scheduledFor);
  const progress = calculateJourneyProgress(message.createdAt, message.scheduledFor);
  const isDelivered = message.status === 'delivered';
  const isDraft = message.status === 'draft';

  const handleCopy = () => {
    navigator.clipboard.writeText(`${message.subject}\n\n${message.content}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSendReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyInput.trim()) return;
    onReply(message.id, replyInput);
    setReplyInput('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#050711]/85 backdrop-blur-xl animate-fade-in">
      <div className="relative w-full max-w-2xl glass-panel rounded-3xl p-6 sm:p-8 border border-white/15 shadow-2xl overflow-hidden max-h-[92vh] flex flex-col">
        {/* Top Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10 shrink-0">
          <div className="flex items-center gap-2.5">
            {isDelivered ? (
              <Unlock className="w-5 h-5 text-[#2FFFD2]" />
            ) : isDraft ? (
              <Clock className="w-5 h-5 text-[#94A3B8]" />
            ) : (
              <Lock className="w-5 h-5 text-[#8B5CF6]" />
            )}
            <div>
              <span className="font-future text-xs tracking-wider text-white">
                {isDelivered ? 'TRANSMISSION UNLOCKED' : isDraft ? 'DRAFT ARCHIVE' : 'TIME-SEALED CAPSULE'}
              </span>
              <span className="text-[10px] font-mono text-[#64748B] block">
                ID: {message.id}
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#94A3B8] hover:text-white hover:bg-white/5 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="overflow-y-auto py-5 space-y-6">
          {/* Coordinates HUD */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 p-4 rounded-2xl bg-[#090D1A]/80 border border-white/5 text-xs font-mono">
            <div>
              <span className="text-[#64748B] block text-[10px] uppercase">ORIGIN</span>
              <span className="text-[#EAF2FF]">{message.timeCoordinates.originYear}</span>
            </div>
            <div>
              <span className="text-[#64748B] block text-[10px] uppercase">DESTINATION</span>
              <span className="text-[#38BDF8]">{message.timeCoordinates.destinationYear}</span>
            </div>
            <div>
              <span className="text-[#64748B] block text-[10px] uppercase">STARDATE</span>
              <span className="text-[#C4B5FD]">{message.timeCoordinates.stardate}</span>
            </div>
            <div>
              <span className="text-[#64748B] block text-[10px] uppercase">CATEGORY</span>
              <span className="text-[#2FFFD2] truncate block">{message.category}</span>
            </div>
          </div>

          {/* Subject & Metadata */}
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-[#94A3B8] mb-1">
              <span>FOR: {message.recipient.toUpperCase()}</span>
              <span>·</span>
              <span>SCHEDULED: {formatTemporalDate(message.scheduledFor)}</span>
            </div>
            <h2 className="font-heading text-xl sm:text-2xl font-bold text-white tracking-tight">
              {message.subject}
            </h2>
          </div>

          {/* Sealed Progress Meter (if still scheduled) */}
          {!isDelivered && !isDraft && (
            <div className="p-4 rounded-xl bg-[#090D1A] border border-white/5 space-y-2">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-[#94A3B8]">TIME STREAM TRAJECTORY</span>
                <span className="text-[#2FFFD2] font-semibold">{progress}% COMPLETE</span>
              </div>
              <div className="w-full h-2 rounded-full bg-[#151B2E] overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-[#8B5CF6] via-[#3B82F6] to-[#2FFFD2]"
                  style={{ width: `${Math.max(5, progress)}%` }}
                />
              </div>
              <p className="text-[11px] font-mono text-[#64748B] text-right">
                {timeLeft.days} days, {timeLeft.hours} hrs remaining
              </p>
            </div>
          )}

          {/* Message Content */}
          <div className="p-6 rounded-2xl bg-[#0B0F1D] border border-white/10 relative">
            <p className="text-sm sm:text-base text-[#EAF2FF] whitespace-pre-wrap leading-relaxed font-sans font-light">
              {message.content}
            </p>
          </div>

          {/* Delivered Reflection & Reply Section */}
          {isDelivered && (
            <div className="p-5 rounded-2xl bg-[#151B2E]/80 border border-[#2FFFD2]/30 space-y-3">
              <div className="flex items-center gap-2 text-xs font-mono text-[#2FFFD2]">
                <MessageSquare className="w-4 h-4" />
                <span>FUTURE REFLECTION LOG</span>
              </div>

              {message.reflectionReply ? (
                <div className="p-4 rounded-xl bg-[#090D1A] border border-white/5 text-xs sm:text-sm text-[#C4B5FD] italic">
                  "{message.reflectionReply}"
                  <span className="block text-[10px] font-mono text-[#64748B] mt-2 not-italic">
                    Recorded: {formatTemporalDate(message.replyDate || message.deliveredAt || '')}
                  </span>
                </div>
              ) : (
                <form onSubmit={handleSendReply} className="space-y-2">
                  <p className="text-xs text-[#94A3B8]">
                    You have unlocked this letter. Send a reply reflection back to mark this milestone:
                  </p>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={replyInput}
                      onChange={(e) => setReplyInput(e.target.value)}
                      placeholder="Write your reflection back..."
                      className="flex-1 bg-[#090D1A] border border-white/10 rounded-xl px-3 py-2 text-xs text-white placeholder-[#64748B] focus:outline-none focus:border-[#2FFFD2]"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 bg-[#2FFFD2] text-[#050711] font-bold text-xs rounded-xl hover:opacity-90 transition-all font-mono"
                    >
                      RECORD
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}
        </div>

        {/* Footer actions */}
        <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2">
            {!isDelivered && !isDraft && (
              <button
                onClick={() => {
                  sound.playTick();
                  onSimulateDelivery(message.id);
                  onClose();
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono text-[#2FFFD2] bg-[#2FFFD2]/10 hover:bg-[#2FFFD2]/20 border border-[#2FFFD2]/30 rounded-lg transition-all"
                title="Test unlock sequence immediately"
              >
                <FastForward className="w-3.5 h-3.5" />
                <span>Simulate Arrival</span>
              </button>
            )}

            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono text-[#94A3B8] hover:text-white bg-[#151B2E] rounded-lg border border-white/5 transition-all"
            >
              <Copy className="w-3.5 h-3.5" />
              <span>{copied ? 'COPIED' : 'COPY'}</span>
            </button>
          </div>

          <button
            onClick={() => {
              if (confirm('Are you certain you wish to purge this temporal transmission?')) {
                sound.playTick();
                onDelete(message.id);
                onClose();
              }
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-all"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>DELETE</span>
          </button>
        </div>
      </div>
    </div>
  );
};
