import React, { useState } from 'react';
import { useFutureMail } from '../context/FutureMailContext';
import { CountdownHero } from '../components/dashboard/CountdownHero';
import { NextTransmissionCard } from '../components/dashboard/NextTransmissionCard';
import { TelemetryWidgets } from '../components/dashboard/TelemetryWidgets';
import { MessageDetailModal } from '../components/vault/MessageDetailModal';
import { InteractiveTimeline } from '../components/hero/InteractiveTimeline';
import { sound } from '../utils/audio';
import { PenTool, Archive, MailCheck, Bot, Sparkles, ArrowRight } from 'lucide-react';

export const DashboardPage: React.FC = () => {
  const { 
    messages, 
    deleteMessage, 
    simulateInstantDelivery, 
    replyToDelivered, 
    setActiveTab,
    setOrionOpen 
  } = useFutureMail();

  const [detailModalId, setDetailModalId] = useState<string | null>(null);

  const selectedMessage = messages.find((m) => m.id === detailModalId) || null;

  return (
    <div className="space-y-8 pb-16">
      {/* 1. Countdown Hero Centerpiece */}
      <CountdownHero />

      {/* 2. Primary Action Bar & Quick Hub */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 glass-panel rounded-2xl border border-white/5">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#2FFFD2] animate-pulse" />
          <span className="text-xs font-mono text-[#94A3B8]">
            TEMPORAL NETWORK: NOMINAL · REPOSITORY SYNCHRONIZED
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => { sound.playTick(); setOrionOpen(true); }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#151B2E] hover:bg-[#1E2742] text-xs font-mono text-[#C4B5FD] border border-[#8B5CF6]/30 transition-all"
          >
            <Bot className="w-3.5 h-3.5 text-[#8B5CF6]" />
            <span>Consult ORION</span>
          </button>

          <button
            onClick={() => { sound.playTick(); setActiveTab('compose'); }}
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-xl gradient-primary text-white text-xs font-future font-bold shadow-md hover:opacity-95 transition-all"
          >
            <PenTool className="w-3.5 h-3.5" />
            <span>New FutureMail</span>
          </button>
        </div>
      </div>

      {/* 3. Side-by-Side: Your Next Transmission & Telemetry Hub */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Next Transmission Card */}
        <div className="lg:col-span-5">
          <NextTransmissionCard onOpenDetails={(id) => setDetailModalId(id)} />
        </div>

        {/* Telemetry Widgets */}
        <div className="lg:col-span-7">
          <TelemetryWidgets />
        </div>
      </div>

      {/* 4. Interactive Timeline Section */}
      <div className="pt-4">
        <InteractiveTimeline onSelectMilestone={() => setActiveTab('timeline')} />
      </div>

      {/* Message Inspection Modal */}
      <MessageDetailModal
        message={selectedMessage}
        onClose={() => setDetailModalId(null)}
        onDelete={deleteMessage}
        onSimulateDelivery={simulateInstantDelivery}
        onReply={replyToDelivered}
      />
    </div>
  );
};
