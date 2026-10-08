import React, { useState } from 'react';
import { useFutureMail } from '../context/FutureMailContext';
import { formatTemporalDate } from '../utils/dateUtils';
import { sound } from '../utils/audio';
import { 
  Sparkles, 
  MailCheck, 
  MessageSquare, 
  Calendar, 
  Send, 
  FastForward, 
  Heart,
  Share2
} from 'lucide-react';

export const ArrivedInboxPage: React.FC = () => {
  const { messages, replyToDelivered, simulateInstantDelivery, setActiveTab } = useFutureMail();
  const [activeReplyId, setActiveReplyId] = useState<string | null>(null);
  const [replyText, setReplyText] = useState('');

  const deliveredMessages = messages.filter((m) => m.status === 'delivered');
  const scheduledMessages = messages.filter((m) => m.status === 'scheduled');

  const handleReplySubmit = (id: string, e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim()) return;
    sound.playLockChime();
    replyToDelivered(id, replyText);
    setActiveReplyId(null);
    setReplyText('');
  };

  const handleSimulateNextArrival = () => {
    if (scheduledMessages.length > 0) {
      sound.playArrivalChime();
      simulateInstantDelivery(scheduledMessages[0].id);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-16">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-mono tracking-widest text-[#2FFFD2] uppercase">
            TEMPORAL DECRYPTION COMPLETE
          </span>
          <h1 className="font-heading text-2xl sm:text-3xl font-bold text-white tracking-tight mt-1">
            Arrived from the Future
          </h1>
          <p className="text-sm text-[#94A3B8]">
            Messages that have completed their journey across time and unsealed for you.
          </p>
        </div>

        {scheduledMessages.length > 0 && (
          <button
            onClick={handleSimulateNextArrival}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#151B2E] border border-[#2FFFD2]/30 hover:border-[#2FFFD2] text-xs font-mono text-[#2FFFD2] transition-all self-start sm:self-auto shadow-md"
            title="Accelerate the next transmission for live testing"
          >
            <FastForward className="w-3.5 h-3.5" />
            <span>Simulate Arrival Now ({scheduledMessages.length} pending)</span>
          </button>
        )}
      </div>

      {deliveredMessages.length > 0 ? (
        <div className="space-y-8">
          {deliveredMessages.map((msg) => (
            <div
              key={msg.id}
              className="relative glass-panel rounded-3xl p-6 sm:p-10 border border-[#2FFFD2]/30 shadow-[0_0_30px_rgba(47,255,210,0.1)] overflow-hidden transition-all duration-300"
            >
              {/* Subtle top laser glow */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#8B5CF6] via-[#22D3EE] to-[#2FFFD2]" />

              {/* Transmission Received Header */}
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#2FFFD2] animate-pulse" />
                  <span className="font-future text-xs sm:text-sm font-bold tracking-widest text-[#2FFFD2] uppercase">
                    ✦ TRANSMISSION RECEIVED
                  </span>
                </div>

                <div className="text-right">
                  <span className="text-xs font-mono text-[#38BDF8]">
                    {formatTemporalDate(msg.scheduledFor)}
                  </span>
                  <span className="text-[10px] font-mono text-[#64748B] block">
                    Origin Year: {msg.timeCoordinates.originYear}
                  </span>
                </div>
              </div>

              {/* Subject */}
              <h2 className="font-heading text-xl sm:text-2xl font-bold text-white tracking-tight mb-6">
                "{msg.subject}"
              </h2>

              {/* Message Parchment Box */}
              <div className="p-6 sm:p-8 rounded-2xl bg-[#090D1A]/90 border border-white/5 relative mb-6">
                <p className="text-sm sm:text-base text-[#EAF2FF] whitespace-pre-wrap leading-relaxed font-sans font-light">
                  {msg.content}
                </p>

                <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-xs font-mono text-[#94A3B8]">
                  <span>— You, {msg.timeCoordinates.destinationYear - msg.timeCoordinates.originYear} years ago</span>
                  <span className="text-[#38BDF8]">{msg.timeCoordinates.stardate}</span>
                </div>
              </div>

              {/* Reflection Reply Stream */}
              <div className="pt-2">
                {msg.reflectionReply ? (
                  <div className="p-4 rounded-xl bg-[#151B2E] border border-white/5 space-y-1">
                    <span className="text-[10px] font-mono uppercase text-[#2FFFD2] block">
                      YOUR REFLECTION RECORDED UPON ARRIVAL
                    </span>
                    <p className="text-xs sm:text-sm text-[#C4B5FD] italic">
                      "{msg.reflectionReply}"
                    </p>
                    <span className="text-[10px] font-mono text-[#64748B] block pt-1">
                      Recorded: {formatTemporalDate(msg.replyDate || msg.deliveredAt || '')}
                    </span>
                  </div>
                ) : activeReplyId === msg.id ? (
                  <form onSubmit={(e) => handleReplySubmit(msg.id, e)} className="space-y-3">
                    <label className="text-xs font-mono text-[#94A3B8] block">
                      WRITE A REFLECTION BACK TO YOUR PAST SELF:
                    </label>
                    <textarea
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      rows={3}
                      placeholder="How does it feel to read this now? What answer would you give them?"
                      className="w-full bg-[#090D1A] border border-white/10 rounded-xl p-3 text-xs sm:text-sm text-white placeholder-[#64748B] focus:outline-none focus:border-[#2FFFD2]"
                    />
                    <div className="flex items-center justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => setActiveReplyId(null)}
                        className="px-3 py-1.5 text-xs text-[#94A3B8] hover:text-white"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-1.5 rounded-lg bg-[#2FFFD2] text-[#050711] font-bold text-xs font-future hover:opacity-90"
                      >
                        SEAL REFLECTION
                      </button>
                    </div>
                  </form>
                ) : (
                  <button
                    onClick={() => {
                      sound.playTick();
                      setActiveReplyId(msg.id);
                    }}
                    className="flex items-center gap-2 text-xs font-mono text-[#2FFFD2] hover:underline"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>Record a reflection reply to this milestone →</span>
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 glass-panel rounded-3xl border border-white/5 space-y-4">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-[#151B2E] border border-white/10 flex items-center justify-center">
            <MailCheck className="w-8 h-8 text-[#64748B]" />
          </div>
          <h3 className="font-heading text-lg font-bold text-white">
            No Transmissions Have Arrived Yet
          </h3>
          <p className="text-xs sm:text-sm text-[#94A3B8] max-w-md mx-auto">
            Your letters are safely travelling across future orbits. When the moment strikes, they will unlock here with full clarity.
          </p>

          {scheduledMessages.length > 0 ? (
            <button
              onClick={handleSimulateNextArrival}
              className="px-6 py-2.5 rounded-xl gradient-primary text-white text-xs font-future font-bold shadow-md hover:opacity-95 transition-all"
            >
              Simulate Arrival of Next Transmission
            </button>
          ) : (
            <button
              onClick={() => setActiveTab('compose')}
              className="px-6 py-2.5 rounded-xl gradient-primary text-white text-xs font-future font-bold shadow-md hover:opacity-95 transition-all"
            >
              Compose a Future Message
            </button>
          )}
        </div>
      )}
    </div>
  );
};
