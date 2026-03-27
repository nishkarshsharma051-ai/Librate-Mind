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
          <h1 className="text-2xl font-bold text-smoke">Focus Mode</h1>
          <p className="text-sm text-slate mt-1">Block distractions. Reclaim your attention.</p>
        </div>

        {/* Timer */}
        <div className="card p-8 flex flex-col items-center gap-6">
          {/* Preset pills */}
          <div className="flex gap-2">
            {PRESETS.map(p => (
              <button
                key={p.label}
                onClick={() => { setPreset(p); setRemaining(p.seconds); setRunning(false); }}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  preset.label === p.label ? 'neu-surface-sm text-iron' : 'text-slate hover:text-iron'
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>

          {/* Timer ring */}
          <div className="relative" style={{ width: size, height: size }}>
            <svg width={size} height={size} className="-rotate-90">
              <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="#EAEAEA" strokeWidth={10} />
              <circle
                cx={size/2} cy={size/2} r={r}
                fill="none" stroke={running ? '#8A8A8A' : '#C0C0C0'}
                strokeWidth={10} strokeLinecap="round"
                strokeDasharray={circ}
                strokeDashoffset={offset}
                style={{ transition: running ? 'stroke-dashoffset 1s linear' : 'none' }}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-5xl font-light text-smoke tracking-tight font-mono">{formatTime(remaining)}</span>
              <span className="text-sm text-slate mt-1">{running ? 'Focusing...' : 'Ready'}</span>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-4">
            <button onClick={reset} className="neu-btn w-12 h-12 flex items-center justify-center text-slate">
              <RotateCcw size={18} />
            </button>
            <button
              onClick={() => setRunning(r => !r)}
              className="w-16 h-16 rounded-full bg-smoke text-fog flex items-center justify-center shadow-card hover:shadow-card-hover transition-all active:scale-95"
            >
              {running ? <Pause size={24} /> : <Play size={24} className="ml-1" />}
            </button>
            <div className="neu-btn w-12 h-12 flex items-center justify-center text-slate">
              <span className="text-sm font-bold text-iron">{completed}</span>
            </div>
          </div>
          {completed > 0 && (
            <p className="text-xs text-slate">{completed} session{completed > 1 ? 's' : ''} completed today 🎯</p>
          )}
        </div>

        {/* Notification Control */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-bold text-smoke uppercase tracking-wide">Notification Control</h2>
            <div className="flex items-center gap-1.5 text-xs text-slate">
              <BellOff size={12} />
              {Object.values(notifToggles).filter(v => !v).length} blocked
            </div>
          </div>
          <div className="space-y-3">
            {APP_NOTIFICATIONS.map(app => (
              <div key={app.id} className="card px-5 py-4 flex items-center gap-4 group hover:shadow-card-hover transition-shadow">
                <div className="w-10 h-10 rounded-2xl neu-surface-sm flex items-center justify-center text-slate group-hover:text-iron transition-colors">
                  <DynamicIcon name={app.icon} size={20} />
                </div>
                <span className="flex-1 text-sm font-semibold text-iron">{app.label}</span>
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
