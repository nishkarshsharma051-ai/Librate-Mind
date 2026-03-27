/* ════════════════════════════════════════════════════════════
   js/data.js — Mock data layer using localStorage
═══════════════════════════════════════════════════════════ */

const DB_KEY = 'moksha_db';

const SEED_POSTS = [
  {
    id: 'p1', category: 'phone-addiction',
    title: 'I unlock my phone 200+ times a day and I can\'t stop',
    body: 'I literally set a screen timer, watched myself hit 200 unlocks by 3pm, and still couldn\'t stop. It\'s like muscle memory now. Anyone else feel like their thumb has its own brain?',
    author: 'Anonymous Peer', avatar: '🦋', anon: true,
    reactions: 47, reacted: false, ts: Date.now() - 3600000 * 2
  },
  {
    id: 'p2', category: 'social-media-anxiety',
    title: 'Deleted Instagram for a week and the withdrawal was real',
    body: 'Day 1–2: actual anxiety. Day 3: weirdly calm. Day 5: realized I\'d been comparing myself to curated highlight reels for 4 years straight. Day 7: didn\'t reinstall it. Still scared to.',
    author: 'SilentScroller', avatar: '🌙', anon: false,
    reactions: 83, reacted: false, ts: Date.now() - 3600000 * 5
  },
  {
    id: 'p3', category: 'notification-fatigue',
    title: 'I have 47 apps sending me notifications. I feel nothing.',
    body: 'My brain no longer registers the dopamine hit. I just swipe away endlessly. Tried going to 0 notifications for a day — had a full-on panic attack thinking I was missing something. That scared me.',
    author: 'Anonymous Peer', avatar: '🔕', anon: true,
    reactions: 61, reacted: false, ts: Date.now() - 3600000 * 8
  },
  {
    id: 'p4', category: 'burnout',
    title: 'My brain is fried from 14h on screens every day',
    body: 'Between classes on a laptop, studying on tablet, relaxing with YouTube, and doom-scrolling before bed — I haven\'t had a single offline hour in weeks. I can\'t read a paragraph without zoning out anymore.',
    author: 'EmptyCursor', avatar: '🪫', anon: false,
    reactions: 92, reacted: false, ts: Date.now() - 3600000 * 12
  },
  {
    id: 'p5', category: 'phone-addiction',
    title: 'Tried putting my phone in another room while sleeping',
    body: 'Night 1: lay awake for 2 hours feeling something was wrong. Night 3: slept 8 hours straight. Night 7: dreamed without my phone for the first time in years. Sharing this because it actually helped.',
    author: 'NightDetoxer', avatar: '🌿', anon: false,
    reactions: 134, reacted: false, ts: Date.now() - 3600000 * 20
  },
  {
    id: 'p6', category: 'social-media-anxiety',
    title: 'The "seen" tick is destroying my mental health',
    body: 'Someone reads my message and doesn\'t reply for 4 hours and I spiral. Why do we have this technology? Why do I care this much? I know it\'s irrational. I can\'t make myself stop feeling it.',
    author: 'Anonymous Peer', avatar: '👁️', anon: true,
    reactions: 71, reacted: false, ts: Date.now() - 3600000 * 24
  }
];

const SEED_RESOURCES = [
  {
    id: 'r1', icon: '📴', tag: 'Digital Detox',
    title: 'The Phone-Free Morning Protocol',
    desc: 'Spending your first 30 minutes screen-free rewires your morning cortisol response. Learn the 3-step ritual that 94% of participants called life-changing.',
    actions: [{ label: 'Read Guide', url: 'https://www.screentime.org', primary: false }]
  },
  {
    id: 'r2', icon: '🧘', tag: 'Mindfulness',
    title: '4-7-8 Breathing for Notification Anxiety',
    desc: 'When the urge to check your phone is overwhelming, this breathing pattern can interrupt the dopamine loop in under 60 seconds.',
    actions: [{ label: '🌬 Start Breathing', breath: true, primary: true }, { label: 'Learn More', url: 'https://www.healthline.com/health/4-7-8-breathing', primary: false }]
  },
  {
    id: 'r3', icon: '📱', tag: 'Phone Addiction',
    title: 'Understanding Phantom Vibration Syndrome',
    desc: 'Feeling your phone buzz when it didn\'t? That\'s phantom vibration — a sign of tech dependency. Here\'s the neuroscience and what to do about it.',
    actions: [{ label: 'Read Research', url: 'https://www.bbc.com/future/article/20190930-phantom-phone-notifications', primary: false }]
  },
  {
    id: 'r4', icon: '🌐', tag: 'Social Media',
    title: 'The Hidden Cost of Doomscrolling',
    desc: 'Research shows 2+ hours of passive social media use daily increases anxiety by 66%. This guide shows the difference between active vs. passive use.',
    actions: [{ label: 'Read Study', url: 'https://www.apa.org', primary: false }]
  },
  {
    id: 'r5', icon: '🔔', tag: 'Notifications',
    title: 'The 5-App Notification Audit',
    desc: 'A 10-minute process that helps you identify which apps trigger your anxiety most — and a step-by-step guide to reclaiming your attention.',
    actions: [{ label: 'Start Audit', url: 'https://www.digitalwellnessinstitute.com/', primary: true }]
  },
  {
    id: 'r6', icon: '💤', tag: 'Sleep Hygiene',
    title: 'Why Your Phone is Stealing Your Sleep',
    desc: 'Blue light, social comparison before bed, FoMO — the three-pronged way your phone is sabotaging your rest and your mental health.',
    actions: [{ label: 'Read Guide', url: 'https://www.sleepfoundation.org/sleep-hygiene/technology-and-sleep', primary: false }]
  },
  {
    id: 'r7', icon: '🗑️', tag: 'Social Detox',
    title: 'The 7-Day Social Media Break Protocol',
    desc: 'A structured, day-by-day guide used by 12,000+ students to safely reduce social media use without cold-turkey withdrawal anxiety.',
    actions: [{ label: 'Get Protocol', url: 'https://www.digitalwellnessinstitute.com/', primary: true }]
  },
  {
    id: 'r8', icon: '🧠', tag: 'Neuroscience',
    title: 'How Apps Are Engineered to Addict You',
    desc: 'Variable reward schedules, infinite scroll, and red notification badges — understanding the design patterns helps you resist them.',
    actions: [{ label: 'Watch Documentary', url: 'https://www.thesocialdilemma.com/', primary: true }]
  }
];

const DB = {
  init() {
    if (!localStorage.getItem(DB_KEY)) {
      this.save({ posts: SEED_POSTS, checkins: [], chatMessages: {} });
    }
  },

  load() {
    try {
      return JSON.parse(localStorage.getItem(DB_KEY)) || { posts: [], checkins: [], chatMessages: {} };
    } catch { return { posts: [], checkins: [], chatMessages: {} }; }
  },

  save(data) {
    localStorage.setItem(DB_KEY, JSON.stringify(data));
  },

  getPosts() { return this.load().posts; },

  addPost(post) {
    const data = this.load();
    data.posts.unshift(post);
    this.save(data);
  },

  reactPost(id) {
    const data = this.load();
    const post = data.posts.find(p => p.id === id);
    if (post) {
      if (post.reacted) { post.reactions--; post.reacted = false; }
      else { post.reactions++; post.reacted = true; }
    }
    this.save(data);
    return post;
  },

  getCheckins() { return this.load().checkins; },

  addCheckin(ci) {
    const data = this.load();
    if (!data.checkins) data.checkins = [];
    data.checkins.push(ci);
    this.save(data);
  },

  getChatMessages(room) {
    const data = this.load();
    if (!data.chatMessages) data.chatMessages = {};
    return data.chatMessages[room] || [];
  },

  addChatMessage(room, msg) {
    const data = this.load();
    if (!data.chatMessages) data.chatMessages = {};
    if (!data.chatMessages[room]) data.chatMessages[room] = [];
    data.chatMessages[room].push(msg);
    // Keep only last 100 per room
    if (data.chatMessages[room].length > 100) {
      data.chatMessages[room] = data.chatMessages[room].slice(-100);
    }
    this.save(data);
  },

  getResources() { return SEED_RESOURCES; }
};

DB.init();

// Utility: format relative time
function timeAgo(ts) {
  const diff = Date.now() - ts;
  const mins = Math.floor(diff / 60000);
  if (mins < 2) return 'just now';
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  return `${days}d ago`;
}

// Utility: show toast
function showToast(msg) {
  let toast = document.getElementById('toast-el');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast-el';
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.classList.add('show');
  clearTimeout(toast._t);
  toast._t = setTimeout(() => toast.classList.remove('show'), 3000);
}

// Category metadata
const CAT_META = {
  'phone-addiction':      { label: 'Phone Addiction',      emoji: '📱' },
  'social-media-anxiety': { label: 'Social Media Anxiety', emoji: '😰' },
  'notification-fatigue': { label: 'Notification Fatigue', emoji: '🔔' },
  'burnout':              { label: 'Digital Burnout',       emoji: '🔥' }
};

const PEER_AVATARS = ['🦋','🌙','🌿','🪐','🌊','🔕','🍃','🪴','🌸','🦚','🌺','🐚','🎐','🌾','⛰️'];
const PEER_NAMES = ['Silent Traveler','NightOwl','PixelBreaker','LogOff','ScreamQuiet','DigitalNomad','SerenePeer','OfflineFirst','MindfulDrift','QuietScreen','BreathFree','GlowDown','SteadyHands','ClearHead','StillPoint'];

function randomPeerName() { return PEER_NAMES[Math.floor(Math.random() * PEER_NAMES.length)]; }
function randomAvatar() { return PEER_AVATARS[Math.floor(Math.random() * PEER_AVATARS.length)]; }
