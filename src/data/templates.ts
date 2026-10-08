import { CapsuleTemplate } from '../types';

export const CAPSULE_TEMPLATES: CapsuleTemplate[] = [
  {
    id: 'tmpl_friendship_pact',
    title: 'The Unspoken Friendship Pact',
    category: 'Friendship & Bonds',
    targetHorizon: '+5 Years',
    description: 'Lock in gratitude, inside jokes, and a reunion pact with a cherished friend or crew.',
    defaultSubject: 'Friendship Coordinates: When We Meet in 2031',
    defaultRecipient: 'My Best Friend',
    promptContent: `To My Dear Friend:

We are sitting together in this season of our lives, laughing at things nobody else understands.

I am locking this letter into the future sky so we don't let time steal our closeness:
1. What I appreciate about you most right now: [Write from the heart]
2. The funniest memory we shared recently: [Capture the moment]
3. Our pact: When this opens in 5 years, we are taking a trip together, no excuses.

Thank you for being in my corner.`,
  },
  {
    id: 'tmpl_career_founding',
    title: 'Career Leap & Ambition Manifesto',
    category: 'Career & Ambition',
    targetHorizon: '+4 Years',
    description: 'Document your professional ambitions, risks taken, and standards of craft.',
    defaultSubject: 'Day 1 Ambition Manifesto: What We Promised to Build',
    defaultRecipient: 'Future Executive & Creative Self',
    promptContent: `To Me on the other side of this career chapter:

I am taking a leap right now. The outcome is unwritten, but my conviction is clear.

When this capsule opens:
- The standard of excellence I held: [Your core values]
- The risks I took that scared me: [What you dared to do]
- Did you stay generous with mentors and teammates?

Remember: building things that matter takes patience and guts. Don't lose your hunger.`,
  },
  {
    id: 'tmpl_letter_to_child',
    title: 'Letter for My Child’s 18th Birthday',
    category: 'Family & Heritage',
    targetHorizon: '+10 Years',
    description: 'An emotional message sealed for your child to open when they step into adulthood.',
    defaultSubject: 'For When You Turn 18: Words Kept Safe for You Across Time',
    defaultRecipient: 'My Child',
    promptContent: `My Dearest,

Right now, as I write these words, you are still small enough to fit your hand entirely inside mine. You just fell asleep after asking me ten questions about why the moon follows us in the car.

I am locking this letter away until your 18th birthday. When you open this:
- Know that you were loved before you even knew how to speak.
- The world will tell you to hurry; remember that you have time.
- Always trust your own kindness.

I cannot wait to meet the adult you will become, even though part of me will always miss the child you are today.`,
  },
  {
    id: 'tmpl_family_heritage',
    title: 'Family Roots & Heritage Archive',
    category: 'Family & Heritage',
    targetHorizon: '+5 Years',
    description: 'Preserve family values, traditions, and tributes for the next generation.',
    defaultSubject: 'Family Heritage Capsule: Wisdom from Our Roots',
    defaultRecipient: 'Our Family',
    promptContent: `To Our Family in the Future:

Here are the truths that kept our family steady through every winter:
1. The tradition we cherish most: [Holiday or weekend ritual]
2. What I learned from our parents / elders: [Their wisdom]
3. A memory of us laughing together: [The scene]

May our home always be filled with warmth, honest conversations, and open doors.`,
  },
  {
    id: 'tmpl_5_year_reflection',
    title: 'The 5-Year Life & Self Horizon',
    category: 'Life & Self',
    targetHorizon: '+5 Years',
    description: 'A deep personal check-in across relationships, inner peace, and personal growth.',
    defaultSubject: 'Five Years in Flight: A Check-In with My Future Self',
    defaultRecipient: 'My Future Self',
    promptContent: `Dear Future Me,

Five years from today, when this capsule unseals, life will have rearranged itself in ways I can scarcely imagine.

Here is the snapshot of where I stand right now:
- The daily rhythm: [How your days start, how you spend evenings]
- The big question mark in my life: [What you are actively deciding]
- My deepest hope for who you are: [Who you want to have become]

Promise me you haven't forgotten the lessons we learned the hard way. Stay humble, stay curious, and take time to look at the stars.`,
  },
  {
    id: 'tmpl_hard_day',
    title: 'Emergency Anchor for a Difficult Day',
    category: 'Life & Self',
    targetHorizon: '+1 Year',
    description: 'A comforting anchor to be delivered when you need grounding and perspective.',
    defaultSubject: 'Open When Everything Feels Overwhelming',
    defaultRecipient: 'My Future Self',
    promptContent: `Dear You,

If you are opening this, chances are you are having a difficult day. Maybe something didn't work out. Maybe you feel exhausted and alone.

Stop what you are doing. Breathe in for four seconds. Hold for four. Breathe out for six.

Remember:
- You have survived 100% of your worst days so far.
- This feeling is chemistry and fatigue, not destiny.
- What seems like a catastrophe today will be a quiet footnote five years from now.

I love you. Keep going.`,
  },
];
