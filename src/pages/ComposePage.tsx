import React, { useState, useEffect } from 'react';
import { useFutureMail } from '../context/FutureMailContext';
import { MessageCategory } from '../types';
import { FuturisticDatePicker } from '../components/compose/FuturisticDatePicker';
import { ScheduleSequenceModal } from '../components/compose/ScheduleSequenceModal';
import { CapsulePreviewModal } from '../components/compose/CapsulePreviewModal';
import { OrionAssistantModal } from '../components/orion/OrionAssistantModal';
import { FUTURE_PROMPTS } from '../data/prompts';
import { CAPSULE_TEMPLATES } from '../data/templates';
import { sound } from '../utils/audio';
import { 
  Sparkles, 
  Lock, 
  Save, 
  Eye, 
  Send, 
  Clock, 
  Bot, 
  HelpCircle,
  FileText
} from 'lucide-react';

const CATEGORIES: MessageCategory[] = [
  'Friendship & Bonds',
  'Life & Self',
  'Family & Heritage',
  'Career & Ambition',
  'Personal Reflection',
  'Milestones & Goals',
  'Wisdom & Advice',
  'Love & Gratitude',
];

const RECIPIENT_OPTIONS = [
  { value: 'self', label: 'My Future Self' },
  { value: 'loved-one', label: 'A Loved One / Partner' },
  { value: 'child', label: 'My Child' },
  { value: 'friend', label: 'A Cherished Friend' },
  { value: 'team', label: 'My Team / Organization' },
];

export const ComposePage: React.FC = () => {
  const { 
    createMessage, 
    user, 
    setActiveTab, 
    orionOpen, 
    setOrionOpen,
    selectedTemplate,
    setSelectedTemplate
  } = useFutureMail();

  // Form states
  const [recipientRelation, setRecipientRelation] = useState<'self' | 'loved-one' | 'child' | 'friend' | 'team'>('self');
  const [recipientName, setRecipientName] = useState('My Future Self');
  const [recipientEmail, setRecipientEmail] = useState(user.email);
  const [subject, setSubject] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState<MessageCategory>('Personal Reflection');
  
  // Future arrival date: default 1 year ahead
  const defaultDate = new Date();
  defaultDate.setFullYear(defaultDate.getFullYear() + 1);
  const [scheduledFor, setScheduledFor] = useState<string>(defaultDate.toISOString());

  // UI States
  const [autosaveStatus, setAutosaveStatus] = useState<'saved' | 'saving'>('saved');
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isScheduleSequenceOpen, setIsScheduleSequenceOpen] = useState(false);
  const [draftSavedAlert, setDraftSavedAlert] = useState(false);

  // If a template was selected from the templates page, load it!
  useEffect(() => {
    if (selectedTemplate) {
      const tmpl = CAPSULE_TEMPLATES.find((t) => t.id === selectedTemplate);
      if (tmpl) {
        setSubject(tmpl.defaultSubject);
        setContent(tmpl.promptContent);
        setCategory(tmpl.category);
        setRecipientName(tmpl.defaultRecipient);
      }
      setSelectedTemplate(null);
    }
  }, [selectedTemplate, setSelectedTemplate]);

  // Simulate subtle autosave effect on typing
  useEffect(() => {
    if (!content && !subject) return;
    setAutosaveStatus('saving');
    const timer = setTimeout(() => {
      setAutosaveStatus('saved');
    }, 800);
    return () => clearTimeout(timer);
  }, [content, subject, recipientName, category]);

  // Word & character calculations
  const charCount = content.length;
  const wordCount = content.trim() ? content.trim().split(/\s+/).length : 0;
  const readingTimeMinutes = Math.max(1, Math.ceil(wordCount / 200));

  const handleRelationChange = (val: typeof recipientRelation) => {
    sound.playTick();
    setRecipientRelation(val);
    if (val === 'self') setRecipientName('My Future Self');
    if (val === 'loved-one') setRecipientName('Beloved Partner');
    if (val === 'child') setRecipientName('My Child');
    if (val === 'friend') setRecipientName('Dear Friend');
    if (val === 'team') setRecipientName('Future Team');
  };

  const handleInjectPrompt = (question: string, starter: string) => {
    sound.playTick();
    const addition = `\n\n[PROMPT: ${question}]\n${starter}\n`;
    setContent((prev) => (prev ? prev + addition : `${question}\n\n${starter}\n`));
  };

  const handleSaveDraft = () => {
    sound.playLockChime();
    createMessage({
      subject: subject || 'Untitled Temporal Draft',
      recipient: recipientName,
      recipientEmail,
      recipientRelationship: recipientRelation,
      content,
      category,
      scheduledFor,
      status: 'draft',
    });
    setDraftSavedAlert(true);
    setTimeout(() => setDraftSavedAlert(false), 3000);
  };

  const handleScheduleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) {
      alert('Please write words into the temporal capsule before sealing.');
      return;
    }
    // Launch schedule sequence modal
    sound.playSealSequence();
    setIsScheduleSequenceOpen(true);
  };

  const handleScheduleComplete = () => {
    createMessage({
      subject: subject || 'Untitled Transmission',
      recipient: recipientName,
      recipientEmail,
      recipientRelationship: recipientRelation,
      content,
      category,
      scheduledFor,
      status: 'scheduled',
    });
    setIsScheduleSequenceOpen(false);
    setActiveTab('vault');
  };

  const handleInsertOrionText = (text: string, newSubject?: string) => {
    if (newSubject && !subject) setSubject(newSubject);
    setContent((prev) => (prev ? `${prev}\n\n${text}` : text));
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-16">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-mono tracking-widest text-[#2FFFD2] uppercase">
            CHRONO-CONTAINER ARCHITECTURE
          </span>
          <h1 className="font-heading text-2xl sm:text-3xl font-bold text-white tracking-tight mt-1">
            CREATE A MESSAGE FOR THE FUTURE
          </h1>
          <p className="text-sm text-[#94A3B8]">
            Your words will be cryo-sealed in quantum storage until the exact arrival moment.
          </p>
        </div>

        <button
          type="button"
          onClick={() => { sound.playTick(); setOrionOpen(true); }}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#151B2E] border border-[#8B5CF6]/40 hover:border-[#8B5CF6] text-xs font-medium text-[#C4B5FD] transition-all self-start sm:self-auto shadow-md group"
        >
          <Bot className="w-4 h-4 text-[#8B5CF6] group-hover:rotate-12 transition-transform" />
          <span>Need Inspiration? Ask ORION</span>
        </button>
      </div>

      {draftSavedAlert && (
        <div className="p-3 rounded-xl bg-[#151B2E] border border-[#2FFFD2]/40 text-[#2FFFD2] text-xs font-mono flex items-center justify-between animate-fade-in">
          <span>✓ DRAFT PRESERVED IN LOCAL TEMPORAL REPOSITORY</span>
          <button onClick={() => setDraftSavedAlert(false)} className="text-[#94A3B8] hover:text-white">✕</button>
        </div>
      )}

      {/* Main Capsule Editor Form */}
      <form onSubmit={handleScheduleSubmit} className="space-y-6">
        {/* Recipient & Category Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Who is this for? */}
          <div className="glass-panel p-5 rounded-2xl border border-white/5 space-y-3">
            <label className="block text-xs font-mono uppercase tracking-wider text-[#94A3B8]">
              WHO IS THIS FOR?
            </label>
            <div className="flex flex-wrap gap-1.5">
              {RECIPIENT_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => handleRelationChange(opt.value as typeof recipientRelation)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    recipientRelation === opt.value
                      ? 'bg-[#3B82F6]/20 border border-[#3B82F6] text-[#38BDF8]'
                      : 'bg-[#090D1A] border border-white/5 text-[#94A3B8] hover:text-white'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>

            <div className="pt-2">
              <input
                type="text"
                value={recipientName}
                onChange={(e) => setRecipientName(e.target.value)}
                placeholder="Recipient name or callsign"
                className="w-full bg-[#090D1A] border border-white/10 rounded-xl px-3.5 py-2 text-xs sm:text-sm text-white placeholder-[#64748B] focus:outline-none focus:border-[#2FFFD2]"
              />
            </div>
          </div>

          {/* Category Selector */}
          <div className="glass-panel p-5 rounded-2xl border border-white/5 space-y-3">
            <label className="block text-xs font-mono uppercase tracking-wider text-[#94A3B8]">
              TRANSMISSION CATEGORY
            </label>
            <div className="grid grid-cols-2 gap-1.5">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => { sound.playTick(); setCategory(cat); }}
                  className={`px-3 py-2 rounded-lg text-xs font-medium text-left truncate transition-all ${
                    category === cat
                      ? 'bg-[#8B5CF6]/20 border border-[#8B5CF6] text-[#C4B5FD]'
                      : 'bg-[#090D1A] border border-white/5 text-[#94A3B8] hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Subject Header */}
        <div className="glass-panel p-5 rounded-2xl border border-white/5 space-y-2">
          <label className="block text-xs font-mono uppercase tracking-wider text-[#94A3B8]">
            TRANSMISSION SUBJECT
          </label>
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="e.g. 'Dear Future Me — Remember the promises we made under the midnight sky'"
            className="w-full bg-[#090D1A] border border-white/10 rounded-xl px-4 py-3 text-sm sm:text-base font-heading font-medium text-white placeholder-[#64748B] focus:outline-none focus:border-[#22D3EE] transition-colors"
          />
        </div>

        {/* Digital Journal Body */}
        <div className="glass-panel p-6 rounded-3xl border border-white/10 space-y-4 relative">
          <div className="flex items-center justify-between">
            <label className="text-xs font-mono uppercase tracking-wider text-[#94A3B8] flex items-center gap-2">
              <FileText className="w-3.5 h-3.5 text-[#38BDF8]" />
              <span>YOUR MESSAGE (DIGITAL JOURNAL)</span>
            </label>
            <div className="text-xs font-mono text-[#64748B] flex items-center gap-3">
              <span>{wordCount} words</span>
              <span>·</span>
              <span>{charCount} chars</span>
              <span>·</span>
              <span>~{readingTimeMinutes} min read</span>
            </div>
          </div>

          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={12}
            placeholder="Write as if they are standing in front of you. What do they need to hear? What do you want them never to forget?&#10;&#10;Pour your present into this capsule..."
            className="w-full bg-[#090D1A]/90 border border-white/10 rounded-2xl p-5 text-sm sm:text-base leading-relaxed text-[#EAF2FF] placeholder-[#64748B] focus:outline-none focus:border-[#2FFFD2] font-sans resize-y transition-colors"
          />

          {/* Quick Deep Prompts Toolbar */}
          <div className="pt-2 border-t border-white/5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-mono text-[#94A3B8] flex items-center gap-1.5">
                <Sparkles className="w-3 h-3 text-[#2FFFD2]" />
                QUICK THOUGHT STARTERS (CLICK TO INJECT)
              </span>
              <button
                type="button"
                onClick={() => { sound.playTick(); setActiveTab('templates'); }}
                className="text-[11px] font-mono text-[#38BDF8] hover:underline"
              >
                Browse All Prompts →
              </button>
            </div>
            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
              {FUTURE_PROMPTS.slice(0, 4).map((pr) => (
                <button
                  key={pr.id}
                  type="button"
                  onClick={() => handleInjectPrompt(pr.question, pr.thoughtStarter)}
                  className="px-3 py-1.5 rounded-xl bg-[#151B2E] hover:bg-[#1E2742] text-[#C4B5FD] hover:text-[#2FFFD2] text-xs font-normal border border-white/5 whitespace-nowrap transition-all"
                >
                  {pr.question}
                </button>
              ))}
            </div>
          </div>

          {/* Autosave badge */}
          <div className="flex items-center justify-between pt-2 text-[11px] font-mono text-[#64748B]">
            <span className="flex items-center gap-1.5">
              <span className={`w-1.5 h-1.5 rounded-full ${autosaveStatus === 'saved' ? 'bg-[#2FFFD2]' : 'bg-[#38BDF8] animate-ping'}`} />
              <span>{autosaveStatus === 'saved' ? 'Autosaved · Quantum Cache Active' : 'Preserving buffer...'}</span>
            </span>
            <span>Origin Epoch: {new Date().getFullYear()}</span>
          </div>
        </div>

        {/* When Should It Arrive? (Futuristic Date Picker) */}
        <div>
          <label className="block text-xs font-mono uppercase tracking-wider text-[#94A3B8] mb-2">
            WHEN SHOULD IT ARRIVE?
          </label>
          <FuturisticDatePicker
            value={scheduledFor}
            onChange={(newDate) => setScheduledFor(newDate)}
          />
        </div>

        {/* Action Controls Bar */}
        <div className="glass-panel p-5 rounded-2xl border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              type="button"
              onClick={handleSaveDraft}
              className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#151B2E] hover:bg-[#1E2742] text-xs font-mono font-medium text-[#94A3B8] hover:text-white border border-white/10 transition-all"
            >
              <Save className="w-3.5 h-3.5" />
              <span>SAVE DRAFT</span>
            </button>

            <button
              type="button"
              onClick={() => { sound.playTick(); setIsPreviewOpen(true); }}
              className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#151B2E] hover:bg-[#1E2742] text-xs font-mono font-medium text-[#C4B5FD] hover:text-white border border-white/10 transition-all"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>PREVIEW CAPSULE</span>
            </button>
          </div>

          <button
            type="submit"
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3 rounded-xl gradient-primary text-white text-xs sm:text-sm font-future font-bold shadow-[0_0_25px_rgba(139,92,246,0.5)] hover:opacity-95 hover:scale-[1.02] active:scale-95 transition-all"
          >
            <Lock className="w-4 h-4" />
            <span>SCHEDULE & SEAL MESSAGE</span>
          </button>
        </div>
      </form>

      {/* Holographic Preview Modal */}
      <CapsulePreviewModal
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
        subject={subject}
        recipient={recipientName}
        content={content}
        category={category}
        scheduledFor={scheduledFor}
      />

      {/* 4-Stage Schedule Animation Modal */}
      <ScheduleSequenceModal
        isOpen={isScheduleSequenceOpen}
        onComplete={handleScheduleComplete}
        messageSubject={subject}
        arrivalDate={scheduledFor}
      />

      {/* Orion AI Assistant Modal */}
      <OrionAssistantModal
        onInsertToEditor={handleInsertOrionText}
        currentMessageText={content}
      />
    </div>
  );
};
