import React, { useState } from 'react';
import { formatTemporalDate } from '../../utils/dateUtils';
import { sound } from '../../utils/audio';
import { TimelineTrack } from '../../types';
import { 
  Users, 
  Heart, 
  Home, 
  Briefcase, 
  Layers, 
  ArrowRight,
  PenTool,
  Clock,
  Sparkles
} from 'lucide-react';
import { useFutureMail } from '../../context/FutureMailContext';

interface TimelineNode {
  track: 'friendship' | 'life' | 'family' | 'career';
  year: number;
  label: string;
  sublabel: string;
  exactDate: string;
  preview: string;
  countdown: string;
  tag: string;
  glowColor: string;
  suggestedPrompt: string;
}

const TRACK_NODES: Record<TimelineTrack, TimelineNode[]> = {
  all: [
    {
      track: 'life',
      year: 2026,
      label: 'Genesis Today',
      sublabel: 'Life & Self',
      exactDate: '2026-10-07T00:00:00.000Z',
      preview: 'Where you stand today: the questions, inner hopes, and quiet promises captured in this exact moment.',
      countdown: 'ORIGIN EPOCH',
      tag: 'LIFE TRACK',
      glowColor: '#38BDF8',
      suggestedPrompt: 'What would you tell your younger self?',
    },
    {
      track: 'friendship',
      year: 2029,
      label: "Maya's 30th",
      sublabel: 'Friendship',
      exactDate: '2029-08-15T09:00:00.000Z',
      preview: '"A memory sealed in amber. Proof that time cannot erase what was forged in joy and wild creativity."',
      countdown: '1,042 DAYS REMAINING',
      tag: 'FRIENDSHIP TRACK',
      glowColor: '#2FFFD2',
      suggestedPrompt: 'Who is still beside you?',
    },
    {
      track: 'career',
      year: 2030,
      label: 'Founding Scale',
      sublabel: 'Career',
      exactDate: '2030-02-18T12:00:00.000Z',
      preview: '"Written at 2:40 AM on Day 1: Did the vision survive the compromises of scale? Remember how daring we were."',
      countdown: '1,228 DAYS REMAINING',
      tag: 'CAREER TRACK',
      glowColor: '#818CF8',
      suggestedPrompt: 'Did you achieve your biggest goal?',
    },
    {
      track: 'family',
      year: 2036,
      label: "Sophia's 18th",
      sublabel: 'Family & Heritage',
      exactDate: '2036-03-14T08:00:00.000Z',
      preview: '"You are two years old and asleep on my shoulder. When you unlock this at 18: know that you were loved before you could speak."',
      countdown: '3,444 DAYS REMAINING',
      tag: 'FAMILY TRACK',
      glowColor: '#F43F5E',
      suggestedPrompt: 'Words kept safe for you across time',
    },
  ],
  friendship: [
    {
      track: 'friendship',
      year: 2026,
      label: 'Bonds Today',
      sublabel: 'Friendship Genesis',
      exactDate: '2026-10-07T00:00:00.000Z',
      preview: 'The people you break bread with this week. What memories are you currently creating together that you want to preserve forever?',
      countdown: 'ORIGIN EPOCH',
      tag: 'UNBROKEN BONDS',
      glowColor: '#2FFFD2',
      suggestedPrompt: 'Who is still beside you?',
    },
    {
      track: 'friendship',
      year: 2029,
      label: "Maya's Milestone",
      sublabel: 'Birthday Capsule',
      exactDate: '2029-08-15T09:00:00.000Z',
      preview: '"I remember every laugh, every cup of burnt coffee, and every dream we spoke aloud under the stars."',
      countdown: '1,042 DAYS REMAINING',
      tag: 'BIRTHDAY VAULT',
      glowColor: '#38BDF8',
      suggestedPrompt: 'A memory sealed in amber for a friend',
    },
    {
      track: 'friendship',
      year: 2032,
      label: 'Midnight Reunion',
      sublabel: '10-Year Lisbon Pact',
      exactDate: '2032-06-25T18:00:00.000Z',
      preview: '"We swore around the campfire that we would never let our brotherhood dissolve. Drop your meeting. Book the flight."',
      countdown: '2,088 DAYS REMAINING',
      tag: 'PACT COORDINATES',
      glowColor: '#818CF8',
      suggestedPrompt: 'The 10-Year reunion pact letter',
    },
    {
      track: 'friendship',
      year: 2036,
      label: 'A Decade of Trust',
      sublabel: 'Deep Friendship',
      exactDate: '2036-10-10T12:00:00.000Z',
      preview: 'Ten years of life changes, moves, and seasons. Reaffirming gratitude for the friends who never walked away.',
      countdown: '3,655 DAYS REMAINING',
      tag: 'LIFELONG CIRCLE',
      glowColor: '#C4B5FD',
      suggestedPrompt: 'To the friends who stayed through the storm',
    },
  ],
  life: [
    {
      track: 'life',
      year: 2026,
      label: 'Self Compassion',
      sublabel: 'Life Genesis',
      exactDate: '2026-10-07T00:00:00.000Z',
      preview: 'Who you are in 2026: eager, a little anxious, but learning to breathe through the uncertainty.',
      countdown: 'ORIGIN EPOCH',
      tag: 'INNER MIRROR',
      glowColor: '#38BDF8',
      suggestedPrompt: 'What are you afraid of today?',
    },
    {
      track: 'life',
      year: 2027,
      label: 'Promises Kept',
      sublabel: 'Year-One Reflection',
      exactDate: '2027-12-31T23:59:59.000Z',
      preview: '"Are you still taking early morning walks? Did you learn to be gentler with yourself when plans disintegrated?"',
      countdown: '450 DAYS REMAINING',
      tag: 'SELF REFLECTION',
      glowColor: '#2FFFD2',
      suggestedPrompt: 'Did you become the person you wanted to be?',
    },
    {
      track: 'life',
      year: 2030,
      label: 'Kyoto & Peace',
      sublabel: 'Five-Year Horizon',
      exactDate: '2030-10-24T12:00:00.000Z',
      preview: '"What is the one thing you worried about in 2026 that turned out not to matter at all? Cherish the quiet evenings."',
      countdown: '1,478 DAYS REMAINING',
      tag: 'INNER FREEDOM',
      glowColor: '#818CF8',
      suggestedPrompt: 'Five years in the temporal drift',
    },
    {
      track: 'life',
      year: 2034,
      label: 'Letter at Forty',
      sublabel: 'Decade Wisdom',
      exactDate: '2034-08-18T08:00:00.000Z',
      preview: '"Never trade inner serenity for external applause. You don’t owe the world your peace."',
      countdown: '2,872 DAYS REMAINING',
      tag: 'SERENITY HORIZON',
      glowColor: '#F59E0B',
      suggestedPrompt: 'Letter on a difficult day / inner anchor',
    },
  ],
  family: [
    {
      track: 'family',
      year: 2026,
      label: 'Little Steps',
      sublabel: 'Family Genesis',
      exactDate: '2026-10-07T00:00:00.000Z',
      preview: 'The quiet mornings around the family table. Capturing the voices, recipes, and hugs of today before time blurs them.',
      countdown: 'ORIGIN EPOCH',
      tag: 'ROOTS & SEEDS',
      glowColor: '#FB7185',
      suggestedPrompt: 'What memory from today do you never want to forget?',
    },
    {
      track: 'family',
      year: 2028,
      label: 'Parents 35th',
      sublabel: 'Silver Tribute',
      exactDate: '2028-09-12T10:00:00.000Z',
      preview: '"Thank you for the quiet heroics: the long commutes, the steady hands, and holding our family together during storms."',
      countdown: '705 DAYS REMAINING',
      tag: 'HERITAGE GRATITUDE',
      glowColor: '#F43F5E',
      suggestedPrompt: 'Tribute to parents and ancestors',
    },
    {
      track: 'family',
      year: 2033,
      label: 'Family Table',
      sublabel: 'Decade Reunion',
      exactDate: '2033-12-25T14:00:00.000Z',
      preview: 'A holiday letter sealed to be read aloud around the dinner table seven years into the future.',
      countdown: '2,635 DAYS REMAINING',
      tag: 'TABLE MEMORY',
      glowColor: '#FB923C',
      suggestedPrompt: 'Letter to be read at future holiday dinner',
    },
    {
      track: 'family',
      year: 2036,
      label: "Sophia's 18th",
      sublabel: 'Childhood Capstone',
      exactDate: '2036-03-14T08:00:00.000Z',
      preview: '"When you open this on your 18th birthday: always trust your own kindness. It is your greatest superpower."',
      countdown: '3,444 DAYS REMAINING',
      tag: 'COMING OF AGE',
      glowColor: '#E11D48',
      suggestedPrompt: 'For when my child turns 18',
    },
  ],
  career: [
    {
      track: 'career',
      year: 2026,
      label: 'Day 1 Floor',
      sublabel: 'Career Genesis',
      exactDate: '2026-10-07T00:00:00.000Z',
      preview: 'The early drafts, the late-night hunger, the conviction before anyone else believed. Locking in the origin spark.',
      countdown: 'ORIGIN EPOCH',
      tag: 'FOUNDING FIRE',
      glowColor: '#38BDF8',
      suggestedPrompt: 'The promises made at the very start',
    },
    {
      track: 'career',
      year: 2028,
      label: 'First Scale',
      sublabel: 'Impact Check',
      exactDate: '2028-06-15T10:00:00.000Z',
      preview: 'Evaluating whether the products and creations you launched actually solved genuine human problems.',
      countdown: '616 DAYS REMAINING',
      tag: 'IMPACT VECTOR',
      glowColor: '#818CF8',
      suggestedPrompt: 'Did we stay true to the craft?',
    },
    {
      track: 'career',
      year: 2030,
      label: 'Founding Horizon',
      sublabel: 'Company Milestone',
      exactDate: '2030-02-18T12:00:00.000Z',
      preview: '"Stay foolish. Did we treat our early team with radical generosity? Remember how light and daring we felt."',
      countdown: '1,228 DAYS REMAINING',
      tag: 'VISION AUDIT',
      glowColor: '#2FFFD2',
      suggestedPrompt: 'Did you achieve your biggest goal?',
    },
    {
      track: 'career',
      year: 2035,
      label: 'Mastery & Legacy',
      sublabel: 'Decade Mastery',
      exactDate: '2035-10-24T12:00:00.000Z',
      preview: '"A whole generation of tech has rotated. Did we build an enduring creative body of work? Keep mentoring the young."',
      countdown: '3,292 DAYS REMAINING',
      tag: 'CRAFT MASTER',
      glowColor: '#A78BFA',
      suggestedPrompt: 'What did we create by 2035?',
    },
  ],
};

const TRACK_CONFIG: {
  id: TimelineTrack;
  label: string;
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  accentColor: string;
  description: string;
}[] = [
  { id: 'all', label: 'All Dimensions', icon: Layers, accentColor: '#38BDF8', description: 'Composite temporal stream across every facet of your life' },
  { id: 'friendship', label: 'Friendship', icon: Users, accentColor: '#2FFFD2', description: 'Unspoken gratitude, lifelong pacts, and memories for friends' },
  { id: 'life', label: 'Life & Self', icon: Heart, accentColor: '#818CF8', description: 'Personal reflections, mental peace, and promises to yourself' },
  { id: 'family', label: 'Family', icon: Home, accentColor: '#FB7185', description: 'Letters for children, parents’ milestones, and heritage wisdom' },
  { id: 'career', label: 'Career', icon: Briefcase, accentColor: '#38BDF8', description: 'Ambitions, founding stories, graduation, and professional craft' },
];

interface InteractiveTimelineProps {
  onSelectMilestone?: (year: number) => void;
  defaultTrack?: TimelineTrack;
}

export const InteractiveTimeline: React.FC<InteractiveTimelineProps> = ({ 
  onSelectMilestone,
  defaultTrack = 'all'
}) => {
  const { setActiveTab } = useFutureMail();
  const [selectedTrack, setSelectedTrack] = useState<TimelineTrack>(defaultTrack);
  const [activeIdx, setActiveIdx] = useState<number>(1);

  const currentNodes = TRACK_NODES[selectedTrack];
  const activeNode = currentNodes[activeIdx] || currentNodes[0];
  const currentTrackConfig = TRACK_CONFIG.find((t) => t.id === selectedTrack) || TRACK_CONFIG[0];

  const handleTrackChange = (track: TimelineTrack) => {
    sound.playTick();
    setSelectedTrack(track);
    setActiveIdx(1);
  };

  const handleSelectNode = (idx: number) => {
    sound.playTick();
    setActiveIdx(idx);
    if (onSelectMilestone) {
      onSelectMilestone(currentNodes[idx].year);
    }
  };

  const handleComposeForNode = () => {
    sound.playLockChime();
    setActiveTab('compose');
  };

  return (
    <div className="w-full py-6 space-y-6">
      {/* 1. Header with Dimension Track Switcher */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <span className="text-xs uppercase font-mono tracking-wider text-[#38BDF8]">
            CHRONOLOGICAL TRAJECTORY // MULTI-TRACK HORIZON
          </span>
          <h3 className="text-xl sm:text-2xl font-semibold text-[#F0F7FF] mt-1 flex items-center gap-2">
            <span>Transmissions Across Time</span>
            <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-sky-400/15 text-[#38BDF8] border border-sky-400/30">
              {currentTrackConfig.label}
            </span>
          </h3>
          <p className="text-xs sm:text-sm text-[#93C5FD] mt-1">
            {currentTrackConfig.description}
          </p>
        </div>

        {/* 4 Life Pillar Tabs: Friendship, Life, Family, Career, All */}
        <div className="flex items-center gap-1.5 p-1.5 rounded-2xl bg-[rgba(10,19,51,0.8)] border border-sky-400/20 overflow-x-auto scrollbar-none self-start lg:self-auto">
          {TRACK_CONFIG.map((trk) => {
            const Icon = trk.icon;
            const isSelected = selectedTrack === trk.id;

            return (
              <button
                key={trk.id}
                onClick={() => handleTrackChange(trk.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-mono font-medium transition-all flex items-center gap-1.5 whitespace-nowrap ${
                  isSelected
                    ? 'bg-[rgba(24,40,94,0.9)] text-[#F0F7FF] border border-sky-400/40 shadow-[0_0_12px_rgba(56,189,248,0.3)] font-semibold'
                    : 'text-[#93C5FD] hover:text-white hover:bg-white/5 border border-transparent'
                }`}
              >
                <Icon className="w-3.5 h-3.5" style={{ color: trk.accentColor }} />
                <span>{trk.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Timeline Track Interactive Board */}
      <div className="relative px-6 py-10 glass-panel rounded-3xl border border-sky-400/20 overflow-hidden shadow-2xl">
        {/* Background glow line */}
        <div className="absolute left-10 right-10 top-1/2 -translate-y-1/2 h-[2px] bg-gradient-to-r from-[#2FFFD2] via-[#38BDF8] to-[#818CF8] opacity-35" />
        
        {/* Active progress fill up to active node */}
        <div 
          className="absolute left-10 top-1/2 -translate-y-1/2 h-[2px] bg-gradient-to-r from-[#2FFFD2] to-[#818CF8] transition-all duration-500 shadow-[0_0_10px_rgba(56,189,248,0.5)]"
          style={{
            width: `${(activeIdx / (currentNodes.length - 1)) * 80}%`,
          }}
        />

        {/* Nodes Grid */}
        <div className="relative z-10 flex items-center justify-between">
          {currentNodes.map((node, idx) => {
            const isSelected = activeIdx === idx;
            return (
              <div 
                key={`${selectedTrack}-${node.year}-${idx}`} 
                className="flex flex-col items-center cursor-pointer group"
                onClick={() => handleSelectNode(idx)}
                onMouseEnter={() => {
                  if (activeIdx !== idx) sound.playTick();
                  setActiveIdx(idx);
                }}
              >
                {/* Year label above node */}
                <div 
                  className={`font-future text-base sm:text-lg mb-4 tracking-wider transition-all duration-300 ${
                    isSelected ? 'text-[#2FFFD2] scale-110 font-bold' : 'text-[#93C5FD] group-hover:text-[#F0F7FF]'
                  }`}
                >
                  {node.year}
                </div>

                {/* Node Orb with interactive ripple */}
                <div className="relative flex items-center justify-center">
                  {isSelected && (
                    <div 
                      className="absolute w-12 h-12 rounded-full animate-ping opacity-35 pointer-events-none"
                      style={{ backgroundColor: node.glowColor }}
                    />
                  )}
                  <div 
                    className={`w-5 h-5 rounded-full border-2 transition-all duration-300 flex items-center justify-center ${
                      isSelected 
                        ? 'border-white bg-[#060B1E] scale-125 shadow-[0_0_20px_rgba(56,189,248,0.8)]' 
                        : 'border-sky-400/40 bg-[rgba(16,28,71,0.9)] group-hover:border-[#22D3EE] group-hover:scale-110'
                    }`}
                  >
                    <div 
                      className={`w-2 h-2 rounded-full transition-transform ${
                        isSelected ? 'bg-[#2FFFD2] scale-100' : 'bg-transparent'
                      }`} 
                    />
                  </div>
                </div>

                {/* Event Name below node */}
                <div className="text-center mt-4 max-w-[90px] sm:max-w-[130px]">
                  <p className={`text-xs sm:text-sm font-medium transition-colors truncate ${
                    isSelected ? 'text-[#F0F7FF]' : 'text-[#93C5FD] group-hover:text-[#C4B5FD]'
                  }`}>
                    {node.label}
                  </p>
                  <p className="text-[11px] font-mono text-[#64748B] mt-0.5 truncate hidden sm:block">
                    {node.sublabel}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Hover / Active Detail Preview Card */}
        <div className="mt-8 pt-6 border-t border-sky-400/15 transition-all duration-300">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
            <div className="flex items-center gap-2">
              <span 
                className="w-2.5 h-2.5 rounded-full" 
                style={{ backgroundColor: activeNode.glowColor }} 
              />
              <span className="text-xs font-mono tracking-wider text-[#F0F7FF]">
                {activeNode.tag}
              </span>
              <span className="text-sky-600">·</span>
              <span className="text-xs font-mono text-[#38BDF8]">
                {formatTemporalDate(activeNode.exactDate)}
              </span>
            </div>
            <div className="text-xs font-mono text-[#2FFFD2] px-2.5 py-1 rounded bg-[rgba(10,19,51,0.8)] border border-[#2FFFD2]/30 self-start sm:self-auto">
              {activeNode.countdown}
            </div>
          </div>

          <p className="text-sm sm:text-base text-[#E0F2FE] font-normal leading-relaxed italic mb-4">
            {activeNode.preview}
          </p>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between pt-3 border-t border-white/5 gap-3">
            <span className="text-xs font-mono text-[#93C5FD]">
              Prompt Idea: <span className="text-[#F0F7FF] italic">"{activeNode.suggestedPrompt}"</span>
            </span>

            <button
              onClick={handleComposeForNode}
              className="flex items-center gap-2 px-4 py-2 text-xs font-future font-semibold text-white gradient-primary rounded-xl hover:opacity-90 transition-all self-start sm:self-auto shadow-md"
            >
              <PenTool className="w-3.5 h-3.5" />
              <span>Compose for this Milestone</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
