'use client';
import { useState, useEffect, useRef } from 'react';
import AppShell from '@/components/layout/AppShell';
import NeuToggle from '@/components/NeuToggle';
import DynamicIcon from '@/components/DynamicIcon';
import { Play, Pause, RotateCcw, Bell, BellOff, Info } from 'lucide-react';

const PRESETS = [
  { label: '15 min', seconds: 900 },
  { label: '25 min', seconds: 1500 },
  { label: '45 min', seconds: 2700 },
  { label: '60 min', seconds: 3600 },
];

const APP_NOTIFICATIONS = [
  { id: 'social', label: 'Social Media', icon: 'Share2', defaultOn: false },
  { id: 'messages', label: 'Direct Messages', icon: 'MessageCircle', defaultOn: true },
  { id: 'news', label: 'News & Media', icon: 'Newspaper', defaultOn: false },
  { id: 'shopping', label: 'Retail & Shopping', icon: 'ShoppingBag', defaultOn: false },
  { id: 'games', label: 'Entertainment & Games', icon: 'Gamepad2', defaultOn: false },
  { id: 'calls', label: 'Emergency Calls', icon: 'Phone', defaultOn: true },
];

function formatTime(s: number) {
  const m = Math.floor(s / 60).toString().padStart(2, '0');
  const sec = (s % 60).toString().padStart(2, '0');
  return `${m}:${sec}`;
}

export default function FocusPage() {
  const [preset, setPreset] = useState(PRESETS[1]);
  const [remaining, setRemaining] = useState(preset.seconds);
  const [running, setRunning] = useState(false);
  const [completed, setCompleted] = useState(0);
  const [notifToggles, setNotifToggles] = useState<Record<string, boolean>>(
    Object.fromEntries(APP_NOTIFICATIONS.map(a => [a.id, a.defaultOn]))
  );
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const progress = ((preset.seconds - remaining) / preset.seconds) * 100;

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => {
        setRemaining(r => {
          if (r <= 1) {
            setRunning(false);
            setCompleted(c => c + 1);
            return preset.seconds;
          }
          return r - 1;
        });
      }, 1000);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [running, preset.seconds]);

  const reset = () => { setRunning(false); setRemaining(preset.seconds); };

  const size = 240;
  const r = 100;
  const circ = 2 * Math.PI * r;
  const offset = circ - (progress / 100) * circ;

  return (
    <AppShell>
      <div className="max-w-2xl mx-auto px-5 py-8 space-y-8 page-enter">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-black text-primary tracking-tight">Focus Mode</h1>
          <p className="text-sm text-muted font-medium mt-1 italic">Block distractions. Reclaim your attention.</p>
        </div>

        {/* Timer */}
        <div className="card p-8 flex flex-col items-center gap-6">
          {/* Preset pills */}
          <div className="flex gap-2">
            {PRESETS.map(p => (
              <button
                key={p.label}
                onClick={() => { setPreset(p); setRemaining(p.seconds); setRunning(false); }}
                className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${
                  preset.label === p.label ? 'neu-surface-sm text-primary' : 'text-muted hover:text-primary'
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>

          {/* Timer ring */}
          <div className="relative" style={{ width: size, height: size }}>
            <svg width={size} height={size} className="-rotate-90">
              <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="var(--mist)" strokeWidth={10} />
              <circle
                cx={size/2} cy={size/2} r={r}
                fill="none" stroke="var(--silver-start)"
                strokeWidth={10} strokeLinecap="round"
                strokeDasharray={circ}
                strokeDashoffset={offset}
                style={{ transition: running ? 'stroke-dashoffset 1s linear' : 'none' }}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-5xl font-black text-primary tracking-tight hero-number">{formatTime(remaining)}</span>
              <span className="text-[10px] font-black text-muted uppercase tracking-widest mt-1 italic">{running ? 'Focusing' : 'Ready'}</span>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-6">
            <button onClick={reset} className="neu-btn w-12 h-12 flex items-center justify-center text-muted hover:text-primary">
              <RotateCcw size={18} />
            </button>
            <button
              onClick={() => setRunning(r => !r)}
              className="w-16 h-16 rounded-full bg-primary text-background flex items-center justify-center shadow-hero-glow hover:scale-110 transition-all duration-500 active:scale-95"
            >
              {running ? <Pause size={24} /> : <Play size={24} className="ml-1" />}
            </button>
            <div className="neu-btn w-12 h-12 flex items-center justify-center text-primary font-black text-sm">
              {completed}
            </div>
          </div>
          {completed > 0 && (
            <p className="text-[10px] font-black text-muted uppercase tracking-widest">{completed} session{completed > 1 ? 's' : ''} completed today</p>
          )}
        </div>

        {/* Notification Control */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-[11px] font-black text-primary uppercase tracking-[0.2em]">Notification Control</h2>
            <div className="flex items-center gap-1.5 text-[10px] font-bold text-muted uppercase tracking-widest">
              <BellOff size={12} />
              {Object.values(notifToggles).filter(v => !v).length} blocked
            </div>
          </div>
          <div className="space-y-4">
            {APP_NOTIFICATIONS.map(app => (
              <div key={app.id} className="glass-card px-6 py-4 flex items-center gap-4 group hover:shadow-hero-glow transition-all duration-500 border-mist">
                <div className="w-10 h-10 rounded-2xl neu-surface-sm flex items-center justify-center text-muted group-hover:text-primary transition-colors">
                  <DynamicIcon name={app.icon} size={20} />
                </div>
                <span className="flex-1 text-sm font-bold text-primary tracking-tight">{app.label}</span>
                <NeuToggle
                  size="sm"
                  checked={notifToggles[app.id]}
                  onChange={v => setNotifToggles(p => ({ ...p, [app.id]: v }))}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppShell>
  );
}
