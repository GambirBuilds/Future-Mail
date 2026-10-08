export type TimelineTrack = 'all' | 'friendship' | 'life' | 'family' | 'career';

export type MessageCategory = 
  | 'Friendship & Bonds'
  | 'Life & Self'
  | 'Family & Heritage'
  | 'Career & Ambition'
  | 'Personal Reflection'
  | 'Milestones & Goals'
  | 'Wisdom & Advice'
  | 'Love & Gratitude'
  | 'World Predictions'
  | 'Letters to Children';

export type MessageStatus = 'scheduled' | 'delivered' | 'draft' | 'archived';

export type SkyTheme = 'future-sky' | 'aurora-sky' | 'sunset-sky' | 'starlight-sky';

export interface FutureMessage {
  id: string;
  subject: string;
  recipient: string; // e.g., 'My Future Self', 'Sophia (My Daughter)', 'Alex'
  recipientEmail?: string;
  recipientRelationship: 'self' | 'loved-one' | 'child' | 'friend' | 'team';
  content: string;
  category: MessageCategory;
  createdAt: string; // ISO string
  scheduledFor: string; // ISO string
  deliveredAt?: string; // ISO string
  status: MessageStatus;
  timeCoordinates: {
    originYear: number;
    destinationYear: number;
    stardate: string;
    temporalVariance?: string;
  };
  sealed: boolean;
  isFavorite?: boolean;
  tags?: string[];
  audioNote?: string;
  reflectionReply?: string; // Reply from the future self once delivered
  replyDate?: string;
}

export interface UserProfile {
  id: string;
  callsign: string;
  fullName: string;
  email: string;
  avatarSeed: string;
  originYear: number;
  timeZone: string;
  writingStreakDays: number;
  lastActiveDate: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  iconName: string;
  unlockedAt: string | null;
  progress: number; // 0 to 100
  rarity: 'Common' | 'Rare' | 'Legendary' | 'Quantum';
}

export interface FuturePrompt {
  id: string;
  category: string;
  question: string;
  thoughtStarter: string;
}

export interface CapsuleTemplate {
  id: string;
  title: string;
  category: MessageCategory;
  targetHorizon: string; // e.g. "+5 Years", "+1 Year", "Next Decade"
  description: string;
  defaultSubject: string;
  defaultRecipient: string;
  promptContent: string;
}
