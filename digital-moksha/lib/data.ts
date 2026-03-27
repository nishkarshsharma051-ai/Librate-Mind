'use client';

export const MOCK_USER = {
  name: 'Nishkarsh',
  streak: 7,
  score: 68,
  joinDate: '2026-01-14',
};

export const HABIT_PATTERNS = [
  {
    pattern: 'You check Instagram within 10 minutes of waking up',
    trigger: 'Morning boredom / habit loop',
    alternative: 'Try 5 deep breaths before reaching for your phone',
    category: 'social-media-anxiety' as const,
    severity: 'medium' as const,
  },
  {
    pattern: '47 phone unlocks before noon',
    trigger: 'Phantom vibration / anxiety',
    alternative: 'Place phone face-down for 30 minutes',
    category: 'phone-addiction' as const,
    severity: 'high' as const,
  },
  {
    pattern: 'Notifications triggering every 3 minutes',
    trigger: 'Constant context switching',
    alternative: 'Enable Focus Mode — silence all non-essential alerts',
    category: 'notification-fatigue' as const,
    severity: 'high' as const,
  },
  {
    pattern: '6.5h screen time yesterday',
    trigger: 'Evening doomscroll loop',
    alternative: 'Set a soft app limit — try 4h today',
    category: 'burnout' as const,
    severity: 'medium' as const,
  },
  {
    pattern: 'TikTok opened 28 times today',
    trigger: 'Short-form dopamine loop',
    alternative: 'Replace 3 sessions with a 5-minute walk',
    category: 'phone-addiction' as const,
    severity: 'high' as const,
  },
];

export const DAILY_CHALLENGES = [
  { id: 'c1', title: 'Phone-Free Morning', desc: 'No phone for the first 30 minutes after waking up', duration: '30 min', points: 20 },
  { id: 'c2', title: 'Notification Audit', desc: 'Disable notifications from 3 apps you don\'t truly need', duration: '5 min', points: 15 },
  { id: 'c3', title: 'Mindful Afternoon', desc: 'Take a 15-minute break from all screens', duration: '15 min', points: 25 },
  { id: 'c4', title: 'Social Scroll Limit', desc: 'Social media for max 20 minutes total today', duration: 'All day', points: 30 },
];

export const COMMUNITY_POSTS = [
  {
    id: 'post1',
    title: '7 days without TikTok — here\'s what changed',
    body: 'I had genuine free time for the first time in years. The first 3 days were rough — I kept reaching for my phone out of pure habit. By day 5, I started reading again.',
    category: 'phone-addiction' as const,
    avatar: '🌿',
    author: 'Anonymous',
    reactions: 83,
    comments: 14,
    ts: Date.now() - 3600000 * 4,
    reacted: false,
  },
  {
    id: 'post2',
    title: 'How I stopped letting Instagram decide my mood',
    body: 'Unfollowed everyone who made me feel inadequate. Even people I admire. It felt rude at first, then liberating. My anxiety dropped noticeably within a week.',
    category: 'social-media-anxiety' as const,
    avatar: '🌸',
    author: 'SilentPixel',
    reactions: 127,
    comments: 31,
    ts: Date.now() - 3600000 * 9,
    reacted: false,
  },
  {
    id: 'post3',
    title: 'I turned off ALL notifications for 2 weeks',
    body: 'Nothing bad happened. I didn\'t miss anything important. What I gained: I could finish one thought without interruption for the first time in years.',
    category: 'notification-fatigue' as const,
    avatar: '🔕',
    author: 'Anonymous',
    reactions: 204,
    comments: 47,
    ts: Date.now() - 3600000 * 18,
    reacted: false,
  },
  {
    id: 'post4',
    title: 'My screen time was 11 hours. I cried.',
    body: 'When I actually looked at the numbers, I realised I spent more time on my phone than sleeping. This app helped me bring it down to 4.5h in 3 weeks. Slow but real.',
    category: 'burnout' as const,
    avatar: '🪫',
    author: 'EmptyCharge',
    reactions: 318,
    comments: 62,
    ts: Date.now() - 3600000 * 28,
    reacted: false,
  },
];

export const USAGE_DATA = [
  { day: 'Mon', hours: 7.5, label: '7.5h' },
  { day: 'Tue', hours: 8.2, label: '8.2h' },
  { day: 'Wed', hours: 6.8, label: '6.8h' },
  { day: 'Thu', hours: 5.4, label: '5.4h' },
  { day: 'Fri', hours: 9.1, label: '9.1h' },
  { day: 'Sat', hours: 4.2, label: '4.2h' },
  { day: 'Sun', hours: 3.9, label: '3.9h' },
];

export const APP_BREAKDOWN = [
  { name: 'Social Media', pct: 38, color: '#FF7CB0' },
  { name: 'Video / Short-form', pct: 27, color: '#7C7CFF' },
  { name: 'Messaging', pct: 18, color: '#FFBC7C' },
  { name: 'Browsing', pct: 11, color: '#C0C0C0' },
  { name: 'Other', pct: 6, color: '#E0E0E0' },
];

export const CAT_META = {
  'phone-addiction':      { label: 'Phone Addiction',      emoji: '📱', color: '#7C7CFF', bg: '#F0F0FF' },
  'social-media-anxiety': { label: 'Social Media Anxiety', emoji: '😰', color: '#FF7CB0', bg: '#FFF0F7' },
  'notification-fatigue': { label: 'Notification Fatigue', emoji: '🔔', color: '#D4A000', bg: '#FFFBF0' },
  'burnout':              { label: 'Digital Burnout',       emoji: '🔥', color: '#FF7C7C', bg: '#FFF0F0' },
};

export const COACH_SYSTEM_PROMPT = `You are the AI Detox Coach for Digital Moksha, a premium digital wellness platform.
Your role: Help users overcome digital addiction (phone overuse, social media anxiety, notification fatigue).
Tone: Warm, calm, non-judgmental. Concise — 2-4 sentences max per response.
Focus: Practical, evidence-based alternatives to addictive digital behaviors.
Never discuss general mental health crises. Stay focused on digital wellness.`;

export const AI_MOCK_RESPONSES = [
  "That's a really common pattern. Try putting your phone in a different room during the first 30 minutes of your morning — physical distance is surprisingly effective.",
  "Awareness is the first step. The fact that you noticed means you're already rewiring. What's one small thing you could replace that scroll session with?",
  "Notification anxiety is real and valid. Start with silencing just one app — the one that bothers you most. See how 24 hours feels.",
  "The doomscroll loop is designed to be hard to break. A simple rule: when you catch yourself scrolling, set a 3-minute timer. Conscious engagement beats mindless consumption.",
  "You're doing better than you think. Progress isn't always linear. What's one habit this week that's actually changed?",
  "The urge to check your phone is often just boredom in disguise. Next time you feel it, pause and ask: what am I actually looking for right now?",
];

export function timeAgo(ts: number): string {
  const diff = Date.now() - ts;
  const mins = Math.floor(diff / 60000);
  if (mins < 2) return 'just now';
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}

export function getGreeting(): string {
  const h = new Date().getHours();
  if (h < 12) return 'Good morning';
  if (h < 17) return 'Good afternoon';
  return 'Good evening';
}
