import React from 'react';
import { useFutureMail } from '../context/FutureMailContext';
import { FloatingCapsule } from '../components/hero/FloatingCapsule';
import { InteractiveTimeline } from '../components/hero/InteractiveTimeline';
import { FUTURE_PROMPTS } from '../data/prompts';
import { sound } from '../utils/audio';
import { 
  Lock, 
  Compass, 
  ShieldCheck, 
  Clock, 
  Sparkles, 
  ArrowRight, 
  Send, 
  BookOpen,
  Heart,
  Bot
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const { setActiveTab, setOrionOpen } = useFutureMail();

  const handleCreate = () => {
    sound.playSealSequence();
    setActiveTab('compose');
  };

  const handleExplore = () => {
    sound.playTick();
    setActiveTab('dashboard');
  };

  const handlePromptClick = (question: string) => {
    sound.playTick();
    setActiveTab('compose');
  };

  return (
    <div className="space-y-24 pb-24">
      {/* 1. HERO SECTION */}
      <section className="relative pt-6 sm:pt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Hero Text Column */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[rgba(16,28,71,0.8)] border border-sky-400/30 text-xs font-mono text-[#38BDF8] shadow-sm">
              <span className="w-2 h-2 rounded-full bg-[#2FFFD2] animate-pulse" />
              <span>FUTUREMAIL · CELESTIAL HORIZON 2035</span>
            </div>

            <h1 className="font-heading text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.08] text-balance">
              Your words can <span className="gradient-text-future">travel through time.</span>
            </h1>

            <p className="text-base sm:text-xl text-[#93C5FD] leading-relaxed max-w-xl mx-auto lg:mx-0 font-normal">
              Write a message today across the digital sky. Choose a moment in the future. Let FutureMail deliver it when the time is right.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <button
                onClick={handleCreate}
                className="w-full sm:w-auto px-8 py-4 rounded-2xl gradient-primary text-white font-future text-sm font-bold shadow-[0_0_30px_rgba(56,189,248,0.5)] hover:opacity-95 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2 group"
              >
                <span>CREATE FUTUREMAIL</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={handleExplore}
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-[rgba(16,28,71,0.7)] hover:bg-[rgba(24,40,94,0.85)] border border-sky-400/25 hover:border-sky-400/50 text-[#F0F7FF] font-future text-sm font-semibold transition-all flex items-center justify-center gap-2"
              >
                <span>EXPLORE THE FUTURE</span>
              </button>
            </div>

            {/* Micro credibility indicator */}
            <div className="pt-4 flex items-center justify-center lg:justify-start gap-6 text-xs font-mono text-[#64748B]">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#2FFFD2]" />
                Zero-Leak Quantum Lock
              </span>
              <span>·</span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#38BDF8]" />
                Precision Chrono Engine
              </span>
            </div>
          </div>

          {/* Right Hero Visual Column: Floating Time Capsule */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            <FloatingCapsule />
          </div>
        </div>
      </section>

      {/* 2. INTERACTIVE HORIZONTAL TIMELINE SECTION */}
      <section className="relative pt-6">
        <InteractiveTimeline onSelectMilestone={() => setActiveTab('timeline')} />
      </section>

      {/* 3. FUTURE PROMPTS: WHAT WILL YOU ASK YOUR FUTURE SELF? */}
      <section className="space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-mono tracking-widest text-[#2FFFD2] uppercase">
            INTROSPECTION PROTOCOL
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white tracking-tight">
            What will you ask your future self?
          </h2>
          <p className="text-sm text-[#94A3B8]">
            Click any question to open the capsule editor with this thought inquiry pre-loaded.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {FUTURE_PROMPTS.map((pr) => (
            <div
              key={pr.id}
              onClick={() => handlePromptClick(pr.question)}
              className="glass-card glass-card-interactive p-6 rounded-2xl border border-white/10 hover:border-[#8B5CF6]/50 cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <span className="text-[10px] font-mono text-[#38BDF8] uppercase tracking-wider block mb-2">
                  {pr.category}
                </span>
                <h3 className="font-heading text-lg font-bold text-[#EAF2FF] group-hover:text-white transition-colors mb-2">
                  {pr.question}
                </h3>
                <p className="text-xs text-[#94A3B8] leading-relaxed line-clamp-3">
                  {pr.thoughtStarter}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-white/5 flex items-center justify-between text-xs font-mono text-[#2FFFD2] group-hover:translate-x-1 transition-transform">
                <span>COMPOSE WITH PROMPT</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. THE 2035 ARCHITECTURAL PILLARS */}
      <section className="glass-panel rounded-3xl p-8 sm:p-14 border border-white/10 relative overflow-hidden">
        <div className="max-w-2xl mb-12 space-y-2">
          <span className="text-xs font-mono tracking-widest text-[#8B5CF6] uppercase">
            TEMPORAL ARCHITECTURE
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Engineered for Decade-Long Journeys
          </h2>
          <p className="text-sm text-[#94A3B8]">
            Traditional messaging is ephemeral. FutureMail is built with immutable temporal persistence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#8B5CF6]/20 border border-[#8B5CF6]/40 flex items-center justify-center text-[#C4B5FD]">
              <Lock className="w-5 h-5" />
            </div>
            <h3 className="font-heading text-lg font-bold text-white">Quantum Seal Barrier</h3>
            <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed">
              Once scheduled, messages enter an inviolable sealed status. They cannot be accidentally read until the time stream reaches the destination coordinates.
            </p>
          </div>

          <div className="space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#3B82F6]/20 border border-[#3B82F6]/40 flex items-center justify-center text-[#38BDF8]">
              <Compass className="w-5 h-5" />
            </div>
            <h3 className="font-heading text-lg font-bold text-white">Precision Chrono Engine</h3>
            <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed">
              Target exact future milestones: a 30th birthday, university graduation, or a 10-year check-in. The live countdown monitors progress down to the second.
            </p>
          </div>

          <div className="space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#22D3EE]/20 border border-[#22D3EE]/40 flex items-center justify-center text-[#2FFFD2]">
              <Bot className="w-5 h-5" />
            </div>
            <h3 className="font-heading text-lg font-bold text-white">ORION AI Assistant</h3>
            <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed">
              Need words to express vulnerability, ambition, or love across decades? ORION synthesizes prompts, reflections, and deep inquiry frameworks on command.
            </p>
          </div>
        </div>
      </section>

      {/* 5. CALL TO ACTION FOOTER BANNER */}
      <section className="text-center py-12 px-6 glass-panel rounded-3xl border border-white/10 space-y-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-tr from-[#8B5CF6]/15 to-[#2FFFD2]/10 pointer-events-none" />

        <div className="relative z-10 max-w-xl mx-auto space-y-3">
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Messages from Today. Memories for Tomorrow.
          </h2>
          <p className="text-sm text-[#94A3B8]">
            Your future self is waiting for what you have to say right now. Don’t let the thought dissolve.
          </p>
        </div>

        <div className="relative z-10 pt-2">
          <button
            onClick={handleCreate}
            className="px-8 py-4 rounded-2xl gradient-primary text-white font-future text-sm font-bold shadow-[0_0_25px_rgba(139,92,246,0.5)] hover:opacity-95 transition-all inline-flex items-center gap-2"
          >
            <span>START WRITING TODAY</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>
    </div>
  );
};
