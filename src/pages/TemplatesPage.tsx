import React from 'react';
import { useFutureMail } from '../context/FutureMailContext';
import { FUTURE_PROMPTS } from '../data/prompts';
import { CAPSULE_TEMPLATES } from '../data/templates';
import { sound } from '../utils/audio';
import { Sparkles, Compass, HelpCircle, ArrowRight, BookOpen, Clock } from 'lucide-react';

export const TemplatesPage: React.FC = () => {
  const { setActiveTab, setSelectedTemplate } = useFutureMail();

  const handleUsePrompt = (question: string, thoughtStarter: string) => {
    sound.playLockChime();
    // Navigate to compose and pass prompt
    setActiveTab('compose');
  };

  const handleUseTemplate = (templateId: string) => {
    sound.playSealSequence();
    setSelectedTemplate(templateId);
    setActiveTab('compose');
  };

  return (
    <div className="max-w-5xl mx-auto space-y-12 pb-16">
      {/* Top Header */}
      <div>
        <span className="text-xs font-mono tracking-widest text-[#8B5CF6] uppercase">
          TEMPORAL PROMPT ARCHIVES
        </span>
        <h1 className="font-heading text-2xl sm:text-3xl font-bold text-white tracking-tight mt-1">
          Templates & Future Prompts
        </h1>
        <p className="text-sm text-[#94A3B8]">
          Curated frameworks and profound inquiries designed to echo with clarity across decades.
        </p>
      </div>

      {/* Section 1: What will you ask your future self? */}
      <section className="space-y-6">
        <div className="flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-[#2FFFD2]" />
          <h2 className="font-heading text-xl font-bold text-white tracking-tight">
            WHAT WILL YOU ASK YOUR FUTURE SELF?
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {FUTURE_PROMPTS.map((item) => (
            <div
              key={item.id}
              onClick={() => handleUsePrompt(item.question, item.thoughtStarter)}
              className="glass-panel p-6 rounded-2xl border border-white/5 hover:border-[#2FFFD2]/40 transition-all duration-300 cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <span className="text-[10px] font-mono tracking-wider text-[#38BDF8] uppercase block mb-2">
                  {item.category}
                </span>
                <h3 className="font-heading text-lg font-bold text-[#EAF2FF] group-hover:text-white transition-colors mb-3">
                  {item.question}
                </h3>
                <p className="text-xs text-[#94A3B8] leading-relaxed line-clamp-3">
                  {item.thoughtStarter}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-white/5 flex items-center justify-between text-xs font-mono text-[#2FFFD2] group-hover:translate-x-1 transition-transform">
                <span>INSERT IN CAPSULE</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Section 2: Complete Time Capsule Frameworks */}
      <section className="space-y-6">
        <div className="flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-[#8B5CF6]" />
          <h2 className="font-heading text-xl font-bold text-white tracking-tight">
            COMPLETE TIME CAPSULE BLUEPRINTS
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {CAPSULE_TEMPLATES.map((tmpl) => (
            <div
              key={tmpl.id}
              className="glass-panel p-6 rounded-3xl border border-white/10 hover:border-[#8B5CF6]/50 transition-all duration-300 space-y-4 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-xs font-mono text-[#C4B5FD]">
                    {tmpl.category}
                  </span>
                  <span className="text-xs font-mono text-[#2FFFD2] px-2 py-0.5 rounded bg-[#090D1A] border border-[#2FFFD2]/20">
                    {tmpl.targetHorizon}
                  </span>
                </div>

                <h3 className="font-heading text-xl font-bold text-white mb-2">
                  {tmpl.title}
                </h3>

                <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed mb-4">
                  {tmpl.description}
                </p>

                <div className="p-4 rounded-xl bg-[#090D1A] border border-white/5 text-xs text-[#94A3B8] font-mono italic line-clamp-3">
                  "{tmpl.promptContent}"
                </div>
              </div>

              <div className="pt-3 border-t border-white/5 flex items-center justify-between">
                <span className="text-xs font-mono text-[#64748B]">
                  For: {tmpl.defaultRecipient}
                </span>

                <button
                  onClick={() => handleUseTemplate(tmpl.id)}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl gradient-primary text-white text-xs font-future font-bold shadow-md hover:opacity-95 transition-all"
                >
                  <span>LOAD BLUEPRINT</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
