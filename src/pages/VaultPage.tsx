import React, { useState, useMemo } from 'react';
import { useFutureMail } from '../context/FutureMailContext';
import { MessageStatus, MessageCategory, FutureMessage } from '../types';
import { CapsuleCard } from '../components/vault/CapsuleCard';
import { MessageDetailModal } from '../components/vault/MessageDetailModal';
import { sound } from '../utils/audio';
import { 
  Search, 
  Filter, 
  Archive, 
  PenTool, 
  Layers, 
  SlidersHorizontal 
} from 'lucide-react';

const CATEGORIES: ('All' | MessageCategory)[] = [
  'All',
  'Friendship & Bonds',
  'Life & Self',
  'Family & Heritage',
  'Career & Ambition',
  'Personal Reflection',
  'Milestones & Goals',
  'Wisdom & Advice',
  'Love & Gratitude',
];

export const VaultPage: React.FC = () => {
  const { 
    messages, 
    deleteMessage, 
    simulateInstantDelivery, 
    replyToDelivered, 
    toggleFavorite,
    setActiveTab 
  } = useFutureMail();

  const [activeSection, setActiveSection] = useState<'all' | 'scheduled' | 'delivered' | 'draft' | 'archived'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'All' | MessageCategory>('All');
  const [selectedMessageId, setSelectedMessageId] = useState<string | null>(null);

  // Filter messages
  const filteredMessages = useMemo(() => {
    return messages.filter((msg) => {
      // Status filter
      if (activeSection !== 'all') {
        if (msg.status !== activeSection) return false;
      }

      // Category filter
      if (selectedCategory !== 'All' && msg.category !== selectedCategory) {
        return false;
      }

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesSubject = msg.subject.toLowerCase().includes(q);
        const matchesContent = msg.content.toLowerCase().includes(q);
        const matchesRecipient = msg.recipient.toLowerCase().includes(q);
        if (!matchesSubject && !matchesContent && !matchesRecipient) {
          return false;
        }
      }

      return true;
    });
  }, [messages, activeSection, selectedCategory, searchQuery]);

  const activeMessage = useMemo(() => {
    return messages.find((m) => m.id === selectedMessageId) || null;
  }, [messages, selectedMessageId]);

  const sections: { id: typeof activeSection; label: string; count: number }[] = [
    { id: 'all', label: 'ALL', count: messages.length },
    { id: 'scheduled', label: 'SCHEDULED', count: messages.filter((m) => m.status === 'scheduled').length },
    { id: 'delivered', label: 'DELIVERED', count: messages.filter((m) => m.status === 'delivered').length },
    { id: 'draft', label: 'DRAFTS', count: messages.filter((m) => m.status === 'draft').length },
    { id: 'archived', label: 'ARCHIVED', count: messages.filter((m) => m.status === 'archived').length },
  ];

  return (
    <div className="space-y-8 pb-16">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-mono tracking-widest text-[#38BDF8] uppercase">
            CHRONOLOGICAL VAULT ARCHIVE
          </span>
          <h1 className="font-heading text-2xl sm:text-3xl font-bold text-white tracking-tight mt-1">
            Future Vault
          </h1>
          <p className="text-sm text-[#94A3B8]">
            Encrypted temporal repository storing messages traversing the time stream.
          </p>
        </div>

        <button
          onClick={() => { sound.playTick(); setActiveTab('compose'); }}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl gradient-primary text-white text-xs sm:text-sm font-future font-bold shadow-lg hover:opacity-95 transition-all self-start sm:self-auto"
        >
          <PenTool className="w-3.5 h-3.5" />
          <span>New Transmission</span>
        </button>
      </div>

      {/* Filter and Search Controls */}
      <div className="space-y-4">
        {/* Segmented Section Tabs */}
        <div className="flex items-center gap-1.5 p-1.5 bg-[#090D1A] rounded-2xl border border-white/5 overflow-x-auto scrollbar-none">
          {sections.map((sec) => {
            const isActive = activeSection === sec.id;
            return (
              <button
                key={sec.id}
                onClick={() => { sound.playTick(); setActiveSection(sec.id); }}
                className={`px-4 py-2 rounded-xl text-xs font-future font-medium whitespace-nowrap transition-all flex items-center gap-2 ${
                  isActive
                    ? 'bg-[#151B2E] text-[#2FFFD2] border border-[#2FFFD2]/30 shadow-[0_0_12px_rgba(47,255,210,0.2)]'
                    : 'text-[#94A3B8] hover:text-white hover:bg-white/5 border border-transparent'
                }`}
              >
                <span>{sec.label}</span>
                <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full ${
                  isActive ? 'bg-[#2FFFD2]/20 text-[#2FFFD2]' : 'bg-white/5 text-[#64748B]'
                }`}>
                  {sec.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Search Bar & Category Filter */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-[#64748B] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search messages by subject, recipient, or text..."
              className="w-full bg-[#090D1A] border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-white placeholder-[#64748B] focus:outline-none focus:border-[#22D3EE] transition-colors"
            />
          </div>

          <div className="flex items-center gap-2">
            <select
              value={selectedCategory}
              onChange={(e) => { sound.playTick(); setSelectedCategory(e.target.value as any); }}
              className="bg-[#090D1A] border border-white/10 rounded-xl px-3 py-2.5 text-xs font-mono text-[#94A3B8] focus:outline-none focus:border-[#22D3EE]"
            >
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat === 'All' ? 'All Categories' : cat}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Grid of Message Capsules */}
      {filteredMessages.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredMessages.map((msg) => (
            <CapsuleCard
              key={msg.id}
              message={msg}
              onOpen={(id) => setSelectedMessageId(id)}
              onSimulateDelivery={simulateInstantDelivery}
              onToggleFavorite={toggleFavorite}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 glass-panel rounded-3xl border border-white/5">
          <div className="w-14 h-14 mx-auto mb-3 rounded-2xl bg-[#151B2E] border border-white/10 flex items-center justify-center">
            <Archive className="w-7 h-7 text-[#64748B]" />
          </div>
          <h3 className="font-heading text-base font-bold text-white mb-1">
            No Transmissions Located
          </h3>
          <p className="text-xs text-[#94A3B8] max-w-sm mx-auto mb-4">
            No temporal messages match the selected filter parameters.
          </p>
          <button
            onClick={() => { sound.playTick(); setSearchQuery(''); setSelectedCategory('All'); setActiveSection('all'); }}
            className="px-4 py-2 text-xs font-mono text-[#2FFFD2] hover:underline"
          >
            Clear Filters
          </button>
        </div>
      )}

      {/* Message Inspection Modal */}
      <MessageDetailModal
        message={activeMessage}
        onClose={() => setSelectedMessageId(null)}
        onDelete={deleteMessage}
        onSimulateDelivery={simulateInstantDelivery}
        onReply={replyToDelivered}
      />
    </div>
  );
};
