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
  { id: 'c1', title: 'Grey Mornings', desc: 'No screen for the first 30 mins after waking.', points: 50, duration: '30m', icon: 'Sunrise' },
  { id: 'c2', title: 'The Deep Work Box', desc: 'Place your phone in another room for 1 hour.', points: 80, duration: '1h', icon: 'Box' },
  { id: 'c3', title: 'Walk without Audio', desc: '15 min walk with no music or podcasts.', points: 40, duration: '15m', icon: 'Footprints' },
  { id: 'c4', title: 'Social Scroll Limit', desc: 'Social media for max 20 minutes total today', duration: 'All day', points: 30 },
];

export interface Post {
  id: string;
  title: string;
  body: string;
  category: keyof typeof CAT_META;
  avatarIcon: string;
  author: string;
  reactions: number;
  comments: number;
  ts: number;
  reacted?: boolean;
}

export const COMMUNITY_POSTS: Post[] = [
  {
    id: '1',
    title: 'Three days without infinite scroll',
    body: 'I deleted my most addictive social apps on Monday. The first 24 hours were tough—I kept reaching for my phone every few minutes. But today, I actually finished a book for the first time in months. The mental clarity is returning.',
    category: 'phone-addiction',
    avatarIcon: 'User',
    author: 'Anonymous Seeker',
    reactions: 24,
    comments: 5,
    ts: Date.now() - 1000 * 60 * 60 * 3, // 3h ago
  },
  {
    id: '2',
    title: 'Notification silence is a superpower',
    body: 'Turning off all non-human notifications changed my life. No more red dots, no more "Special Offer" pings. I only see my phone when I choose to, not when it demands my attention.',
    category: 'notification-fatigue',
    avatarIcon: 'Shield',
    author: 'QuietMind',
    reactions: 42,
    comments: 12,
    ts: Date.now() - 1000 * 60 * 60 * 12, // 12h ago
  },
  {
    id: '3',
    title: 'Focus Mode saved my final project',
    body: 'I used to get distracted by notifications every 5 minutes. Locking my phone for 2-hour sprints helped me finish a month\'s worth of work in a week.',
    category: 'notification-fatigue',
    avatarIcon: 'Zap',
    author: 'DeepWorker',
    reactions: 56,
    comments: 9,
    ts: Date.now() - 3600000 * 25,
    reacted: false,
  },
  {
    id: '4',
    title: 'The "No Screens in Bedroom" rule',
    body: 'Best decision ever. I sleep better, wake up feeling rested, and don\'t start my day with someone else\'s highlight reel. Highly recommend trying it for a week.',
    category: 'burnout',
    avatarIcon: 'Moon',
    author: 'RestfulSoul',
    reactions: 192,
    comments: 44,
    ts: Date.now() - 3600000 * 48,
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
  'phone-addiction': {
    label: 'Digital Detox',
    icon: 'Smartphone',
    color: 'var(--iron)',
    bg: 'var(--surface)'
  },
  'social-media-anxiety': {
    label: 'Mindful Social',
    icon: 'Share2',
    color: 'var(--iron)',
    bg: 'var(--surface)'
  },
  'notification-fatigue': {
    label: 'Focus Flow',
    icon: 'BellOff',
    color: 'var(--iron)',
    bg: 'var(--surface)'
  },
  'burnout': {
    label: 'Deep Rest',
    icon: 'Wind',
    color: 'var(--iron)',
    bg: 'var(--surface)'
  },
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
