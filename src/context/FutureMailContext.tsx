import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import { FutureMessage, UserProfile, Achievement, SkyTheme } from '../types';
import { INITIAL_MESSAGES, INITIAL_USER, INITIAL_ACHIEVEMENTS } from '../data/seedData';
import { generateStardate } from '../utils/dateUtils';
import { sound } from '../utils/audio';

interface Stats {
  totalMessages: number;
  scheduledCount: number;
  deliveredCount: number;
  draftsCount: number;
  archivedCount: number;
  futureYearsSpan: string;
  writingStreak: number;
}

interface FutureMailContextType {
  messages: FutureMessage[];
  user: UserProfile;
  achievements: Achievement[];
  soundEnabled: boolean;
  setSoundEnabled: (enabled: boolean) => void;
  skyTheme: SkyTheme;
  setSkyTheme: (theme: SkyTheme) => void;
  nextScheduledMessage: FutureMessage | null;
  stats: Stats;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  orionOpen: boolean;
  setOrionOpen: (open: boolean) => void;
  selectedTemplate: string | null;
  setSelectedTemplate: (id: string | null) => void;
  createMessage: (data: Partial<FutureMessage>) => FutureMessage;
  updateMessage: (id: string, data: Partial<FutureMessage>) => void;
  deleteMessage: (id: string) => void;
  saveDraft: (data: Partial<FutureMessage>) => string;
  simulateInstantDelivery: (id: string) => void;
  replyToDelivered: (id: string, replyText: string) => void;
  toggleFavorite: (id: string) => void;
  resetToDemoData: () => void;
  updateUser: (updates: Partial<UserProfile>) => void;
}

const FutureMailContext = createContext<FutureMailContextType | undefined>(undefined);

const STORAGE_KEYS = {
  MESSAGES: 'futuremail_messages_v1',
  USER: 'futuremail_user_v1',
  ACHIEVEMENTS: 'futuremail_achievements_v1',
  SOUND: 'futuremail_sound_enabled',
  THEME: 'futuremail_sky_theme_v1',
};

export const FutureMailProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [skyTheme, setSkyThemeState] = useState<SkyTheme>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.THEME);
      if (saved && ['future-sky', 'aurora-sky', 'sunset-sky', 'starlight-sky'].includes(saved)) {
        return saved as SkyTheme;
      }
    } catch {
      // Ignore
    }
    return 'future-sky'; // Future Sky is the default!
  });

  const [messages, setMessages] = useState<FutureMessage[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.MESSAGES);
      if (saved) return JSON.parse(saved);
    } catch {
      // Ignore
    }
    return INITIAL_MESSAGES;
  });

  const [user, setUser] = useState<UserProfile>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.USER);
      if (saved) return JSON.parse(saved);
    } catch {
      // Ignore
    }
    return INITIAL_USER;
  });

  const [achievements, setAchievements] = useState<Achievement[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.ACHIEVEMENTS);
      if (saved) return JSON.parse(saved);
    } catch {
      // Ignore
    }
    return INITIAL_ACHIEVEMENTS;
  });

  const [soundEnabled, setSoundEnabledState] = useState<boolean>(() => {
    return !sound.getMuted();
  });

  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [orionOpen, setOrionOpen] = useState<boolean>(false);
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);

  // Sync state to local storage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.MESSAGES, JSON.stringify(messages));
    } catch {
      // storage full or disabled
    }
  }, [messages]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
    } catch {
      // Ignore
    }
  }, [user]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.ACHIEVEMENTS, JSON.stringify(achievements));
    } catch {
      // Ignore
    }
  }, [achievements]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.THEME, skyTheme);
      document.documentElement.setAttribute('data-theme', skyTheme);
    } catch {
      // Ignore
    }
  }, [skyTheme]);

  const setSkyTheme = (theme: SkyTheme) => {
    setSkyThemeState(theme);
  };

  const setSoundEnabled = (enabled: boolean) => {
    setSoundEnabledState(enabled);
    sound.setMuted(!enabled);
  };

  // Check achievements after message operations
  const evaluateAchievements = useCallback((currentMessages: FutureMessage[]) => {
    setAchievements((prev) =>
      prev.map((ach) => {
        if (ach.unlockedAt) return ach; // Already unlocked

        if (ach.id === 'ach_first_transmission') {
          const hasScheduled = currentMessages.some((m) => m.status === 'scheduled');
          if (hasScheduled) {
            return { ...ach, unlockedAt: new Date().toISOString(), progress: 100 };
          }
        }

        if (ach.id === 'ach_time_traveler') {
          const hasOver1Year = currentMessages.some((m) => {
            const diffDays = (new Date(m.scheduledFor).getTime() - new Date(m.createdAt).getTime()) / (1000 * 86400);
            return diffDays > 365;
          });
          if (hasOver1Year) {
            return { ...ach, unlockedAt: new Date().toISOString(), progress: 100 };
          }
        }

        if (ach.id === 'ach_long_distance') {
          const hasOver5Years = currentMessages.some((m) => {
            const diffDays = (new Date(m.scheduledFor).getTime() - new Date(m.createdAt).getTime()) / (1000 * 86400);
            return diffDays >= 1825;
          });
          if (hasOver5Years) {
            return { ...ach, unlockedAt: new Date().toISOString(), progress: 100 };
          }
        }

        if (ach.id === 'ach_chronicler') {
          const count = currentMessages.length;
          const progress = Math.min(100, Math.round((count / 25) * 100));
          return {
            ...ach,
            progress,
            unlockedAt: count >= 25 ? new Date().toISOString() : null,
          };
        }

        if (ach.id === 'ach_from_the_future') {
          const hasDelivered = currentMessages.some((m) => m.status === 'delivered');
          if (hasDelivered) {
            return { ...ach, unlockedAt: new Date().toISOString(), progress: 100 };
          }
        }

        if (ach.id === 'ach_time_architect') {
          const years = new Set(currentMessages.map((m) => new Date(m.scheduledFor).getFullYear()));
          if (years.size >= 3) {
            return { ...ach, unlockedAt: new Date().toISOString(), progress: 100 };
          }
        }

        return ach;
      })
    );
  }, []);

  const createMessage = (data: Partial<FutureMessage>): FutureMessage => {
    const now = new Date();
    const destDate = data.scheduledFor ? new Date(data.scheduledFor) : new Date(now.getFullYear() + 1, now.getMonth(), now.getDate());
    const originYear = now.getFullYear();
    const destinationYear = destDate.getFullYear();
    const diffDays = Math.max(0, Math.round((destDate.getTime() - now.getTime()) / (1000 * 86400)));

    const newMessage: FutureMessage = {
      id: `msg_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      subject: data.subject?.trim() || 'Untitled Temporal Transmission',
      recipient: data.recipient?.trim() || 'My Future Self',
      recipientEmail: data.recipientEmail || user.email,
      recipientRelationship: data.recipientRelationship || 'self',
      content: data.content || '',
      category: data.category || 'Personal Reflection',
      createdAt: now.toISOString(),
      scheduledFor: destDate.toISOString(),
      status: data.status || 'scheduled',
      timeCoordinates: {
        originYear,
        destinationYear,
        stardate: generateStardate(now),
        temporalVariance: `+${diffDays}d`,
      },
      sealed: data.status !== 'draft',
      isFavorite: false,
      tags: data.tags || ['futuremail'],
    };

    setMessages((prev) => {
      const updated = [newMessage, ...prev];
      evaluateAchievements(updated);
      return updated;
    });

    return newMessage;
  };

  const updateMessage = (id: string, data: Partial<FutureMessage>) => {
    setMessages((prev) => {
      const updated = prev.map((msg) => (msg.id === id ? { ...msg, ...data } : msg));
      evaluateAchievements(updated);
      return updated;
    });
  };

  const deleteMessage = (id: string) => {
    setMessages((prev) => prev.filter((msg) => msg.id !== id));
  };

  const saveDraft = (data: Partial<FutureMessage>): string => {
    if (data.id) {
      updateMessage(data.id, { ...data, status: 'draft', sealed: false });
      return data.id;
    } else {
      const created = createMessage({ ...data, status: 'draft' });
      return created.id;
    }
  };

  const toggleFavorite = (id: string) => {
    setMessages((prev) =>
      prev.map((m) => (m.id === id ? { ...m, isFavorite: !m.isFavorite } : m))
    );
  };

  // Instant simulation of message arrival for demo and testing
  const simulateInstantDelivery = (id: string) => {
    sound.playArrivalChime();
    setMessages((prev) =>
      prev.map((msg) => {
        if (msg.id === id) {
          return {
            ...msg,
            status: 'delivered',
            deliveredAt: new Date().toISOString(),
            sealed: false,
          };
        }
        return msg;
      })
    );
  };

  const replyToDelivered = (id: string, replyText: string) => {
    sound.playLockChime();
    setMessages((prev) =>
      prev.map((msg) => {
        if (msg.id === id) {
          return {
            ...msg,
            reflectionReply: replyText,
            replyDate: new Date().toISOString(),
          };
        }
        return msg;
      })
    );
  };

  const resetToDemoData = () => {
    localStorage.removeItem(STORAGE_KEYS.MESSAGES);
    localStorage.removeItem(STORAGE_KEYS.USER);
    localStorage.removeItem(STORAGE_KEYS.ACHIEVEMENTS);
    setMessages(INITIAL_MESSAGES);
    setUser(INITIAL_USER);
    setAchievements(INITIAL_ACHIEVEMENTS);
  };

  const updateUser = (updates: Partial<UserProfile>) => {
    setUser((prev) => ({ ...prev, ...updates }));
  };

  // Compute next scheduled message
  const nextScheduledMessage = useMemo(() => {
    const scheduled = messages.filter((m) => m.status === 'scheduled');
    if (scheduled.length === 0) return null;

    return [...scheduled].sort(
      (a, b) => new Date(a.scheduledFor).getTime() - new Date(b.scheduledFor).getTime()
    )[0];
  }, [messages]);

  // Compute stats
  const stats = useMemo((): Stats => {
    const scheduled = messages.filter((m) => m.status === 'scheduled');
    const delivered = messages.filter((m) => m.status === 'delivered');
    const drafts = messages.filter((m) => m.status === 'draft');
    const archived = messages.filter((m) => m.status === 'archived');

    const years = messages
      .filter((m) => m.scheduledFor)
      .map((m) => new Date(m.scheduledFor).getFullYear())
      .filter((y) => !isNaN(y));

    const minYear = years.length ? Math.min(...years, 2026) : 2026;
    const maxYear = years.length ? Math.max(...years, 2035) : 2035;

    return {
      totalMessages: messages.length,
      scheduledCount: scheduled.length,
      deliveredCount: delivered.length,
      draftsCount: drafts.length,
      archivedCount: archived.length,
      futureYearsSpan: `${minYear} → ${maxYear}`,
      writingStreak: user.writingStreakDays,
    };
  }, [messages, user.writingStreakDays]);

  return (
    <FutureMailContext.Provider
      value={{
        messages,
        user,
        achievements,
        soundEnabled,
        setSoundEnabled,
        skyTheme,
        setSkyTheme,
        nextScheduledMessage,
        stats,
        activeTab,
        setActiveTab,
        orionOpen,
        setOrionOpen,
        selectedTemplate,
        setSelectedTemplate,
        createMessage,
        updateMessage,
        deleteMessage,
        saveDraft,
        simulateInstantDelivery,
        replyToDelivered,
        toggleFavorite,
        resetToDemoData,
        updateUser,
      }}
    >
      {children}
    </FutureMailContext.Provider>
  );
};

export const useFutureMail = () => {
  const context = useContext(FutureMailContext);
  if (!context) {
    throw new Error('useFutureMail must be used within a FutureMailProvider');
  }
  return context;
};
