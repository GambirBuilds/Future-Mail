import { FutureMessage, UserProfile, Achievement } from '../types';

export const INITIAL_USER: UserProfile = {
  id: 'usr_fm_9921',
  callsign: 'ALEX VANCE',
  fullName: 'Alex Vance',
  email: 'alex.vance@futuremail.orbit',
  avatarSeed: 'cosmic-traveler',
  originYear: 2026,
  timeZone: 'UTC-07:00 (Pacific Time)',
  writingStreakDays: 18,
  lastActiveDate: new Date().toISOString(),
};

export const INITIAL_MESSAGES: FutureMessage[] = [
  // 1. LIFE & SELF
  {
    id: 'msg_transmission_life_01',
    subject: 'Dear Future Me — Remember the promises we made under the midnight sky',
    recipient: 'My Future Self',
    recipientRelationship: 'self',
    recipientEmail: 'alex.vance@futuremail.orbit',
    content: `Dear Future Me,

If you are reading this transmission, December 31, 2027 has arrived. Two full years have elapsed since I sat in the dim glow of my screen, listening to the rain, wondering what life would look like on the other side of this transition.

Are you still taking early morning walks before the world awakens? Did you finish the book you were too afraid to start? Did you learn to be gentler with yourself when plans disintegrated?

I want to remind you of who we were in 2026: eager, a little anxious, but deeply in love with the possibility of what comes next. Don't let comfort make you cynical. Take a breath and look out the window right now. Whatever happened between then and now, you made it through.

With love and curiosity,
Your Past Self`,
    category: 'Life & Self',
    createdAt: '2026-01-01T08:00:00.000Z',
    scheduledFor: '2027-12-31T23:59:59.000Z',
    status: 'scheduled',
    timeCoordinates: {
      originYear: 2026,
      destinationYear: 2027,
      stardate: 'FM-2026.002',
      temporalVariance: '+729.6d',
    },
    sealed: true,
    isFavorite: true,
    tags: ['life', 'self-reflection', 'milestone', '2027'],
  },
  {
    id: 'msg_transmission_life_02',
    subject: 'Letter to My 40-Year-Old Self: Quiet Mornings & Forgiveness',
    recipient: 'My 40-Year-Old Self',
    recipientRelationship: 'self',
    content: `To Me on the other side of forty:

Did you finally learn to stop rushing through the moments that matter? Did you forgive yourself for the detours, the missed opportunities, and the people you couldn't save?

Remember what you valued most at thirty: deep focus, unhurried dinners, laughter that makes your ribs ache, and the scent of damp earth after rain.

Never trade inner serenity for external validation. You don't owe the world your peace.`,
    category: 'Life & Self',
    createdAt: '2026-05-12T10:00:00.000Z',
    scheduledFor: '2034-08-18T08:00:00.000Z',
    status: 'scheduled',
    timeCoordinates: {
      originYear: 2026,
      destinationYear: 2034,
      stardate: 'FM-2026.365',
      temporalVariance: '+2867d',
    },
    sealed: true,
    tags: ['life', 'forty', 'peace', 'wisdom'],
  },

  // 2. FRIENDSHIP
  {
    id: 'msg_transmission_friend_01',
    subject: 'For Maya on Her 30th Birthday: A Memory Sealed in Amber',
    recipient: 'Maya Lin',
    recipientRelationship: 'friend',
    recipientEmail: 'maya.lin@constellation.net',
    content: `Happy 30th Birthday Maya!

I am writing this on a Tuesday afternoon three years before you unlock it. You were sitting on the couch complaining about how quickly time slips away, and I promised you that time could be captured.

Here is proof. I remember every laugh, every cup of burnt coffee, and every dream we spoke aloud. May your thirties be filled with unapologetic joy and wild creativity.`,
    category: 'Friendship & Bonds',
    createdAt: '2026-06-01T10:00:00.000Z',
    scheduledFor: '2029-08-15T09:00:00.000Z',
    status: 'scheduled',
    timeCoordinates: {
      originYear: 2026,
      destinationYear: 2029,
      stardate: 'FM-2026.418',
      temporalVariance: '+1170.0d',
    },
    sealed: true,
    isFavorite: true,
    tags: ['friendship', 'birthday', 'maya'],
  },
  {
    id: 'msg_transmission_friend_02',
    subject: 'The 10-Year Reunion Pact: To the Midnight Crew',
    recipient: 'Julian, Maya, & Leo',
    recipientRelationship: 'friend',
    recipientEmail: 'midnight.crew@orbit.net',
    content: `To the crew:

We swore around the campfire at Lake Tahoe that no matter where the currents of adult life carried us—across continents, marriages, careers, and timezones—we would never let our brotherhood dissolve into LinkedIn updates.

If you are reading this in the summer of 2032: drop whatever meeting you are in. Book the flight. We are meeting in Lisbon, sitting outside until 3 AM, and remembering how we started.

Time cannot erase what was forged in fire.`,
    category: 'Friendship & Bonds',
    createdAt: '2026-07-20T22:00:00.000Z',
    scheduledFor: '2032-06-25T18:00:00.000Z',
    status: 'scheduled',
    timeCoordinates: {
      originYear: 2026,
      destinationYear: 2032,
      stardate: 'FM-2026.552',
      temporalVariance: '+2166d',
    },
    sealed: true,
    tags: ['friendship', 'pact', 'reunion', '2032'],
  },

  // 3. FAMILY & HERITAGE
  {
    id: 'msg_transmission_family_01',
    subject: 'For When You Turn 18: Words Kept Safe for You Across Time',
    recipient: 'Sophia (My Daughter)',
    recipientRelationship: 'child',
    recipientEmail: 'sophia.vance@futuremail.orbit',
    content: `My Dearest Sophia,

Right now, as I write these words in 2026, you are two years old and asleep on my shoulder. Your hand is small enough to wrap around a single finger. You just learned the word "starlight."

I am locking this letter away until your 18th birthday in 2036. When you open this:
1. Know that you were loved before you even knew how to speak.
2. The world will rush you; remember that your pace is sacred.
3. Always trust your own kindness—it is your greatest superpower.

I cannot wait to see the woman you have become, even though part of my heart will always carry the baby asleep in my arms today.`,
    category: 'Family & Heritage',
    createdAt: '2026-03-14T20:30:00.000Z',
    scheduledFor: '2036-03-14T08:00:00.000Z',
    status: 'scheduled',
    timeCoordinates: {
      originYear: 2026,
      destinationYear: 2036,
      stardate: 'FM-2026.201',
      temporalVariance: '+3652d',
    },
    sealed: true,
    isFavorite: true,
    tags: ['family', 'daughter', '18th-birthday', 'legacy'],
  },
  {
    id: 'msg_transmission_family_02',
    subject: 'Silver Anniversary Letter to Mom & Dad: A Decade of Gratitude',
    recipient: 'Mom & Dad',
    recipientRelationship: 'loved-one',
    content: `To Mom and Dad:

This letter is timed to arrive on your 35th wedding anniversary.

Growing up, I didn't understand the sacrifices you made behind closed doors. Now that I am navigating the world myself, I see the quiet heroics: the long commutes, the steady hands, the way you held our family together during storms.

Thank you for giving us roots and wings. May this day be filled with celebration and pride.`,
    category: 'Family & Heritage',
    createdAt: '2026-08-01T11:00:00.000Z',
    scheduledFor: '2028-09-12T10:00:00.000Z',
    status: 'scheduled',
    timeCoordinates: {
      originYear: 2026,
      destinationYear: 2028,
      stardate: 'FM-2026.584',
      temporalVariance: '+773d',
    },
    sealed: true,
    tags: ['family', 'parents', 'anniversary', 'gratitude'],
  },

  // 4. CAREER & AMBITION
  {
    id: 'msg_transmission_career_01',
    subject: 'Founding Day Coordinates: Before the World Knew What We Were Building',
    recipient: 'Future Executive Self & Co-Founders',
    recipientRelationship: 'team',
    recipientEmail: 'alex.vance@futuremail.orbit',
    content: `Written from the kitchen table at 2:40 AM on Day 1:

Revenue is currently $0. We have 14 tabs open on architecture and three half-eaten slices of pizza. Everyone thinks we are reckless to leave comfortable jobs to build this.

When this message opens in 2030:
- Did the vision survive the compromises of scale?
- Did we treat our early team with radical generosity?
- Remember how light and daring we felt tonight.

Stay foolish. Don't turn into the suits we used to mock.`,
    category: 'Career & Ambition',
    createdAt: '2026-02-18T02:40:00.000Z',
    scheduledFor: '2030-02-18T12:00:00.000Z',
    status: 'scheduled',
    timeCoordinates: {
      originYear: 2026,
      destinationYear: 2030,
      stardate: 'FM-2026.134',
      temporalVariance: '+1461d',
    },
    sealed: true,
    isFavorite: true,
    tags: ['career', 'founding', 'startup', 'ambition'],
  },
  {
    id: 'msg_transmission_career_02',
    subject: 'Mastery Checkpoint: What Did We Create by 2035?',
    recipient: 'Alex Vance',
    recipientRelationship: 'self',
    content: `To Alex in 2035:

Nine years. A whole generation of technology and industry has rotated.

Did we master our craft? Did we build an enduring creative body of work, or did we get sidetracked by vanity metrics?

I hope you are mentoring younger engineers and artists. I hope you still get that electric chill down your spine when an elegant solution clicks into place.`,
    category: 'Career & Ambition',
    createdAt: '2026-04-10T14:30:00.000Z',
    scheduledFor: '2035-10-24T12:00:00.000Z',
    status: 'scheduled',
    timeCoordinates: {
      originYear: 2026,
      destinationYear: 2035,
      stardate: 'FM-2026.276',
      temporalVariance: '+3484d',
    },
    sealed: true,
    tags: ['career', 'mastery', 'craft', '2035'],
  },

  // DELIVERED ARCHIVE
  {
    id: 'msg_transmission_arrived_01',
    subject: '✦ Transmission Received: The Genesis Letter',
    recipient: 'Alex Vance',
    recipientRelationship: 'self',
    content: `Dear Future Me,

You made it.

If you are reading this, the time has passed and you are standing on the far shore of the future you once wondered about.

I hope you learned that the things that kept you awake at 2 AM weren't insurmountable walls—they were just weather passing over the mountain. Be proud of the courage it took to keep walking forward.

— You, from the genesis of this journey`,
    category: 'Life & Self',
    createdAt: '2024-10-01T12:00:00.000Z',
    scheduledFor: '2026-10-01T12:00:00.000Z',
    deliveredAt: '2026-10-01T12:00:00.000Z',
    status: 'delivered',
    timeCoordinates: {
      originYear: 2024,
      destinationYear: 2026,
      stardate: 'FM-2024.752',
      temporalVariance: '0.0d [ARRIVED]',
    },
    sealed: false,
    isFavorite: true,
    reflectionReply: 'I received this today. Reading this gave me chills. The things I stressed over really did dissolve into nothing. Thank you, younger me.',
    replyDate: '2026-10-02T19:40:00.000Z',
    tags: ['arrived', 'life', 'breakthrough', 'archive'],
  },
  {
    id: 'msg_draft_01',
    subject: 'Predictions for the 2035 Neural Interface Shift',
    recipient: 'The 2035 Community',
    recipientRelationship: 'team',
    content: `Draft notes on where spatial audio and haptic communications will stand by 2035. Need to complete section on neural latency and memory replay.`,
    category: 'World Predictions',
    createdAt: '2026-09-15T16:00:00.000Z',
    scheduledFor: '2035-01-01T00:00:00.000Z',
    status: 'draft',
    timeCoordinates: {
      originYear: 2026,
      destinationYear: 2035,
      stardate: 'FM-2026.707',
      temporalVariance: 'UNSEALED',
    },
    sealed: false,
    tags: ['technology', 'career', 'draft', '2035'],
  },
];

export const INITIAL_ACHIEVEMENTS: Achievement[] = [
  {
    id: 'ach_first_transmission',
    title: 'FIRST TRANSMISSION',
    description: 'Created your first FutureMail and sealed it into the time stream.',
    iconName: 'Send',
    unlockedAt: '2026-01-01T08:00:00.000Z',
    progress: 100,
    rarity: 'Common',
  },
  {
    id: 'ach_time_traveler',
    title: 'TIME TRAVELER',
    description: 'Scheduled a message more than one year into the future.',
    iconName: 'Compass',
    unlockedAt: '2026-01-01T08:00:00.000Z',
    progress: 100,
    rarity: 'Rare',
  },
  {
    id: 'ach_long_distance',
    title: 'LONG DISTANCE',
    description: 'Scheduled a transmission spanning five or more years.',
    iconName: 'Rocket',
    unlockedAt: '2026-09-15T16:00:00.000Z',
    progress: 100,
    rarity: 'Legendary',
  },
  {
    id: 'ach_chronicler',
    title: 'CHRONICLER',
    description: 'Composed 25 temporal messages across your journey.',
    iconName: 'BookOpen',
    unlockedAt: null,
    progress: 24, // 6 out of 25 = 24%
    rarity: 'Legendary',
  },
  {
    id: 'ach_from_the_future',
    title: 'FROM THE FUTURE',
    description: 'Unlocked and experienced your first delivered FutureMail transmission.',
    iconName: 'MailCheck',
    unlockedAt: '2026-10-01T12:00:00.000Z',
    progress: 100,
    rarity: 'Quantum',
  },
  {
    id: 'ach_time_architect',
    title: 'TIME ARCHITECT',
    description: 'Anchored transmissions across three distinct future calendar years.',
    iconName: 'Layers',
    unlockedAt: '2026-04-10T14:30:00.000Z',
    progress: 100,
    rarity: 'Rare',
  },
];
