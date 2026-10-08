import React from 'react';
import { formatTemporalDate, generateStardate } from '../../utils/dateUtils';
import { X, Lock, ShieldCheck, Calendar, User, Sparkles } from 'lucide-react';

interface CapsulePreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  subject: string;
  recipient: string;
  content: string;
  category: string;
  scheduledFor: string;
}

export const CapsulePreviewModal: React.FC<CapsulePreviewModalProps> = ({
  isOpen,
  onClose,
  subject,
  recipient,
  content,
  category,
  scheduledFor,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#050711]/85 backdrop-blur-xl animate-fade-in">
      <div className="relative w-full max-w-2xl glass-panel rounded-3xl p-6 sm:p-8 border border-white/15 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        {/* Holographic Header Bar */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10 shrink-0">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#2FFFD2] animate-pulse" />
            <span className="font-future text-xs tracking-wider text-[#2FFFD2]">
              HOLOGRAPHIC CAPSULE PREVIEW
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#94A3B8] hover:text-white hover:bg-white/5 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Capsule Visual Details */}
        <div className="overflow-y-auto py-6 space-y-6">
          {/* Coordinates ribbon */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-2xl bg-[#090D1A]/80 border border-white/5 text-xs font-mono">
            <div>
              <span className="text-[#64748B] block text-[10px] uppercase">ORIGIN</span>
              <span className="text-[#EAF2FF]">{new Date().getFullYear()}</span>
            </div>
            <div>
              <span className="text-[#64748B] block text-[10px] uppercase">DESTINATION</span>
              <span className="text-[#38BDF8]">{new Date(scheduledFor).getFullYear()}</span>
            </div>
            <div>
              <span className="text-[#64748B] block text-[10px] uppercase">CATEGORY</span>
              <span className="text-[#C4B5FD] truncate block">{category}</span>
            </div>
            <div>
              <span className="text-[#64748B] block text-[10px] uppercase">ENCRYPTION</span>
              <span className="text-[#2FFFD2]">QUANTUM-256</span>
            </div>
          </div>

          {/* Letter parchment presentation inside glass */}
          <div className="p-6 sm:p-8 rounded-2xl bg-[#0B0F1D] border border-[#8B5CF6]/20 relative">
            {/* Watermark seal */}
            <div className="absolute top-4 right-4 opacity-20">
              <Sparkles className="w-16 h-16 text-[#8B5CF6]" />
            </div>

            <div className="mb-4">
              <span className="text-xs font-mono text-[#94A3B8] block mb-1">
                FOR: {recipient.toUpperCase()}
              </span>
              <h2 className="font-heading text-xl sm:text-2xl font-bold text-white tracking-tight">
                {subject || 'Untitled Transmission'}
              </h2>
              <span className="text-xs font-mono text-[#38BDF8] block mt-1">
                Scheduled Delivery: {formatTemporalDate(scheduledFor)}
              </span>
            </div>

            <div className="border-t border-white/5 pt-4">
              <p className="text-sm sm:text-base text-[#EAF2FF]/90 whitespace-pre-wrap leading-relaxed font-sans font-light">
                {content || '(No message content written yet)'}
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-white/10 flex items-center justify-between shrink-0">
          <span className="text-xs font-mono text-[#64748B]">
            SIMULATION VERIFIED · READY TO SEAL
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 text-xs font-future font-semibold text-white gradient-primary rounded-xl hover:opacity-90 transition-all"
          >
            RETURN TO EDITOR
          </button>
        </div>
      </div>
    </div>
  );
};
