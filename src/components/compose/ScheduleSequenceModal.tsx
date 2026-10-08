import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { sound } from '../../utils/audio';
import { ShieldCheck, Lock, Compass, CheckCircle2, ArrowRight } from 'lucide-react';

interface ScheduleSequenceModalProps {
  isOpen: boolean;
  onComplete: () => void;
  messageSubject: string;
  arrivalDate: string;
}

const STAGES = [
  { label: 'MESSAGE SEALED', sub: 'Cryptographic quantum hashing applied', icon: ShieldCheck, color: '#38BDF8' },
  { label: 'CAPSULE LOCKED', sub: 'Time-release physical barrier engaged', icon: Lock, color: '#8B5CF6' },
  { label: 'TIME COORDINATES SET', sub: 'Temporal destination vector verified', icon: Compass, color: '#22D3EE' },
  { label: 'TRANSMISSION SCHEDULED', sub: 'Inserted into future time stream', icon: CheckCircle2, color: '#2FFFD2' },
];

export const ScheduleSequenceModal: React.FC<ScheduleSequenceModalProps> = ({
  isOpen,
  onComplete,
  messageSubject,
  arrivalDate,
}) => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [isFinished, setIsFinished] = useState<boolean>(false);

  useEffect(() => {
    if (!isOpen) {
      setCurrentStep(0);
      setIsFinished(false);
      return;
    }

    // Trigger step progression
    sound.playSealSequence();

    const timer1 = setTimeout(() => {
      setCurrentStep(1);
      sound.playLockChime();
    }, 700);

    const timer2 = setTimeout(() => {
      setCurrentStep(2);
      sound.playTick();
    }, 1400);

    const timer3 = setTimeout(() => {
      setCurrentStep(3);
      sound.playLockChime();
    }, 2100);

    const timer4 = setTimeout(() => {
      setIsFinished(true);
      sound.playArrivalChime();
      try {
        confetti({
          particleCount: 50,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#8B5CF6', '#22D3EE', '#2FFFD2', '#EAF2FF'],
        });
      } catch {
        // Ignore
      }
    }, 2800);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#050711]/85 backdrop-blur-xl animate-fade-in">
      <div className="relative w-full max-w-lg glass-panel rounded-3xl p-8 border border-white/15 shadow-2xl text-center overflow-hidden">
        {/* Glow ambient background */}
        <div className="absolute -top-20 -left-20 w-60 h-60 bg-[#8B5CF6]/30 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -right-20 w-60 h-60 bg-[#2FFFD2]/20 rounded-full blur-3xl" />

        {/* Central Animated Capsule Ring */}
        <div className="relative w-24 h-24 mx-auto mb-6 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full border-2 border-dashed border-[#22D3EE]/40 animate-[spin_10s_linear_infinite]" />
          <div className="absolute inset-2 rounded-full border border-[#8B5CF6]/60 animate-[spin_6s_linear_infinite_reverse]" />
          <div className="w-14 h-14 rounded-full gradient-primary flex items-center justify-center shadow-[0_0_25px_rgba(139,92,246,0.8)]">
            {React.createElement(STAGES[currentStep].icon, {
              className: 'w-7 h-7 text-white transition-all transform duration-300',
            })}
          </div>
        </div>

        {/* Stage List */}
        <div className="space-y-3 mb-8">
          {STAGES.map((stg, idx) => {
            const isPassed = currentStep > idx || isFinished;
            const isCurrent = currentStep === idx && !isFinished;

            return (
              <div
                key={idx}
                className={`flex items-center justify-between px-4 py-2.5 rounded-xl border transition-all duration-300 ${
                  isCurrent
                    ? 'bg-[#151B2E] border-[#2FFFD2]/40 shadow-[0_0_15px_rgba(47,255,210,0.2)]'
                    : isPassed
                    ? 'bg-[#090D1A]/60 border-white/10 opacity-70'
                    : 'bg-transparent border-transparent opacity-30'
                }`}
              >
                <div className="flex items-center gap-3 text-left">
                  <div
                    className={`w-2 h-2 rounded-full ${
                      isPassed ? 'bg-[#2FFFD2]' : isCurrent ? 'bg-[#22D3EE] animate-ping' : 'bg-slate-600'
                    }`}
                  />
                  <div>
                    <span className="font-future text-xs tracking-wider text-[#EAF2FF] block">
                      {stg.label}
                    </span>
                    <span className="text-[10px] font-mono text-[#94A3B8]">
                      {stg.sub}
                    </span>
                  </div>
                </div>

                <span className="font-mono text-xs text-[#2FFFD2]">
                  {isPassed ? 'VERIFIED ✓' : isCurrent ? 'LOCKING...' : 'QUEUED'}
                </span>
              </div>
            );
          })}
        </div>

        {/* Success Conclusion */}
        {isFinished ? (
          <div className="animate-fade-in space-y-4">
            <h3 className="font-heading text-xl sm:text-2xl font-bold text-white tracking-tight">
              Your message has been sent into the future.
            </h3>
            <p className="text-xs sm:text-sm text-[#C4B5FD] max-w-sm mx-auto">
              Sealed in quantum temporal storage. It will remain untouched until its destination moment.
            </p>
            <button
              onClick={onComplete}
              className="mt-4 px-8 py-3 text-sm font-future font-bold text-white gradient-primary rounded-xl shadow-[0_0_20px_rgba(139,92,246,0.6)] hover:opacity-95 transition-all flex items-center gap-2 mx-auto"
            >
              <span>ENTER VAULT</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <div className="text-xs font-mono text-[#38BDF8] animate-pulse">
            TRANSMITTING TEMPORAL COORDINATES...
          </div>
        )}
      </div>
    </div>
  );
};
