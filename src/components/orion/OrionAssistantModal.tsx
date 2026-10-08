import React, { useState } from 'react';
import { useFutureMail } from '../../context/FutureMailContext';
import { sound } from '../../utils/audio';
import { Bot, Sparkles, Send, Copy, ArrowDownToLine, X, RefreshCw } from 'lucide-react';

interface OrionAssistantModalProps {
  onInsertToEditor?: (text: string, subject?: string) => void;
  currentMessageText?: string;
}

const STARTER_PROMPTS = [
  'Help me write a letter to my future self.',
  'Make this message more emotional & vulnerable.',
  'Help me write a graduation / milestone message.',
  'Give me deep questions to answer for my future self.',
  'Create a 5-year reflection letter.',
];

const GENERATED_RESPONSES: Record<string, { subject: string; content: string }> = {
  'Help me write a letter to my future self.': {
    subject: 'A Candid Transmission from the Person You Used to Be',
    content: `Dear Future Me,

I am writing to you from a Tuesday afternoon, sitting here with coffee gone lukewarm and a mind full of anticipation.

Right now, my biggest question is whether the risks I am taking will blossom or wither. I want to tell you: I took them with an open heart. I didn't stay in the harbor out of fear of rough seas.

Tell me:
- Did you finally learn that peace is better than being right?
- Are you still laughing with your whole chest?
- What music are you listening to right now?

Whatever you do, don't look back on this version of you with embarrassment. We worked hard to give you the platform you are standing on today.

Be proud of us.`,
  },
  'Make this message more emotional & vulnerable.': {
    subject: 'Raw Truths Kept Safe for You',
    content: `I am dropping the armor for a moment.

If I am honest with myself today, I am terrified of running out of time before I figure out who I really am. I put on a steady face for the world, but inside, I am navigating the dark with only a match.

I am sending you this because I want to give you permission to feel everything you've been holding back. You don't have to be invincible. You just have to be here, breathing, and willing to love again.`,
  },
  'Help me write a graduation / milestone message.': {
    subject: 'Coordinates of a Turning Point: The Capstone Letter',
    content: `To Me at the Next Summit:

Today a door closed and an entire continent opened in front of us.

The diploma / milestone is in hand, but what matters isn't the paper—it was the quiet nights when nobody was watching, when quitting would have been easy, and we stayed anyway.

Carry this momentum forward. Never let success make you complacent, and never let failure convince you that you are small.`,
  },
  'Give me deep questions to answer for my future self.': {
    subject: 'The 7 Inquiries of the Soul',
    content: `Answer these without flinching when this capsule opens:

1. What is the biggest truth you stopped avoiding?
2. Who was the most important person to walk into your life since this was sealed?
3. Did you ever forgive the person you swore you never would?
4. What does your morning routine look like when nobody is expecting anything from you?
5. What was the best mistake you made in the last three years?
6. Are your hands still creating things?
7. If younger me walked into the room right now, would you hug me or lecture me?`,
  },
  'Create a 5-year reflection letter.': {
    subject: 'Five Years in the Temporal Drift',
    content: `Dear Future Me,

Half a decade. That is 1,825 sunrises.

In five years, technology has transformed, neighborhoods have changed names, and perhaps you are living under completely different stars.

Here is the compass I am setting for you:
- Protect your attention like sacred ground.
- Invest in friendships that nourish your soul.
- Never forget that curiosity is the cure for cynicism.

See you in 2031.`,
  },
};

export const OrionAssistantModal: React.FC<OrionAssistantModalProps> = ({
  onInsertToEditor,
  currentMessageText,
}) => {
  const { orionOpen, setOrionOpen, setActiveTab } = useFutureMail();
  const [inputQuery, setInputQuery] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeResult, setActiveResult] = useState<{ subject: string; content: string } | null>(null);
  const [copied, setCopied] = useState(false);

  if (!orionOpen) return null;

  const handleSelectPrompt = (prompt: string) => {
    sound.playTick();
    setInputQuery(prompt);
    generateMockResponse(prompt);
  };

  const generateMockResponse = (query: string) => {
    setIsGenerating(true);
    sound.playTick();

    setTimeout(() => {
      setIsGenerating(false);
      sound.playLockChime();

      const matched = GENERATED_RESPONSES[query];
      if (matched) {
        setActiveResult(matched);
      } else {
        // Dynamic contextual response
        setActiveResult({
          subject: `Orion Reflection: ${query.slice(0, 36)}...`,
          content: `Dear Future Traveler,

In response to your reflection ("${query}"):

Time has a way of clarifying what truly matters. As you seal this moment into the archives, remember that the future is not something you passively enter—it is something you create one intention at a time.

Take note of what you feel in your chest right now. What would happen if you trusted the journey just 10% more?

Hold fast to your values, and let the days unfold.`,
        });
      }
    }, 800);
  };

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputQuery.trim()) return;
    generateMockResponse(inputQuery);
  };

  const handleInsert = () => {
    sound.playLockChime();
    if (activeResult) {
      if (onInsertToEditor) {
        onInsertToEditor(activeResult.content, activeResult.subject);
      }
      setActiveTab('compose');
      setOrionOpen(false);
    }
  };

  const handleCopy = () => {
    if (activeResult) {
      navigator.clipboard.writeText(`${activeResult.subject}\n\n${activeResult.content}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#050711]/85 backdrop-blur-xl animate-fade-in">
      <div className="relative w-full max-w-2xl glass-panel rounded-3xl p-6 sm:p-8 border border-white/15 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        {/* Top Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#8B5CF6] to-[#22D3EE] flex items-center justify-center shadow-[0_0_15px_rgba(139,92,246,0.6)]">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-heading text-lg font-bold text-white tracking-tight">
                  ORION
                </h3>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#8B5CF6]/20 text-[#C4B5FD] border border-[#8B5CF6]/30">
                  AI FUTURE ASSISTANT
                </span>
              </div>
              <p className="text-xs text-[#94A3B8]">
                Crafting meaningful transmissions across time
              </p>
            </div>
          </div>

          <button
            onClick={() => setOrionOpen(false)}
            className="p-1.5 rounded-lg text-[#94A3B8] hover:text-white hover:bg-white/5 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="overflow-y-auto py-5 space-y-5">
          {/* Starter Prompts Grid */}
          <div>
            <span className="text-xs font-mono text-[#94A3B8] block mb-2">
              ORION GUIDANCE PROTOCOLS
            </span>
            <div className="flex flex-wrap gap-2">
              {STARTER_PROMPTS.map((prompt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSelectPrompt(prompt)}
                  className="px-3 py-1.5 rounded-xl text-xs bg-[#151B2E] hover:bg-[#1E2742] text-[#C4B5FD] hover:text-[#2FFFD2] border border-white/5 hover:border-[#2FFFD2]/30 transition-all text-left"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>

          {/* User query form */}
          <form onSubmit={handleCustomSubmit} className="flex gap-2">
            <input
              type="text"
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              placeholder="Ask Orion: e.g. 'Help me write a letter for my 30th birthday'..."
              className="flex-1 bg-[#090D1A] border border-white/10 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white placeholder-[#64748B] focus:outline-none focus:border-[#22D3EE] transition-colors"
            />
            <button
              type="submit"
              disabled={isGenerating || !inputQuery.trim()}
              className="px-4 py-2.5 bg-[#8B5CF6] hover:bg-[#7C3AED] disabled:opacity-40 text-white rounded-xl text-xs font-mono font-medium transition-all flex items-center gap-1.5"
            >
              {isGenerating ? (
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <Send className="w-3.5 h-3.5" />
              )}
              <span>SYNTHESIZE</span>
            </button>
          </form>

          {/* Generated Result Preview */}
          {activeResult && (
            <div className="p-5 rounded-2xl bg-[#090D1A] border border-[#22D3EE]/30 space-y-3 relative">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-[#2FFFD2] flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  ORION TRANSMISSION READY
                </span>
                <span className="text-xs font-mono text-[#94A3B8]">
                  Subject: {activeResult.subject}
                </span>
              </div>

              <div className="p-4 rounded-xl bg-[#050711] border border-white/5 text-xs sm:text-sm text-[#EAF2FF] whitespace-pre-wrap leading-relaxed max-h-60 overflow-y-auto">
                {activeResult.content}
              </div>

              <div className="flex items-center justify-end gap-2 pt-1">
                <button
                  type="button"
                  onClick={handleCopy}
                  className="px-3 py-1.5 text-xs font-mono text-[#94A3B8] hover:text-white bg-[#151B2E] rounded-lg border border-white/5 transition-all flex items-center gap-1.5"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>{copied ? 'COPIED!' : 'COPY'}</span>
                </button>
                <button
                  type="button"
                  onClick={handleInsert}
                  className="px-4 py-1.5 text-xs font-future font-semibold text-white gradient-primary rounded-lg transition-all flex items-center gap-1.5 shadow-md"
                >
                  <ArrowDownToLine className="w-3.5 h-3.5" />
                  <span>INSERT INTO CAPSULE</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
