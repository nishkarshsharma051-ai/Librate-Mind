'use client';
import { useState } from 'react';
import AppShell from '@/components/layout/AppShell';
import ScoreRing from '@/components/ScoreRing';
import HabitCard from '@/components/HabitCard';
import DynamicIcon from '@/components/DynamicIcon';
import { MOCK_USER, HABIT_PATTERNS, DAILY_CHALLENGES, getGreeting } from '@/lib/data';
import { CheckCircle, Focus, MessageCircle, Users, TrendingDown, Zap, BarChart3, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

export default function DashboardPage() {
  const [habitIdx, setHabitIdx] = useState(0);
  const [completedChallenges, setCompletedChallenges] = useState<string[]>([]);

  const habit = HABIT_PATTERNS[habitIdx];
  const today = new Date().toLocaleDateString('en-IN', { weekday: 'long', month: 'long', day: 'numeric' });

  const screenTimeToday = 4.5;
  const screenTimeGoal = 6;
  const pct = Math.min(100, (screenTimeToday / screenTimeGoal) * 100);

  return (
    <AppShell>
      <div className="max-w-2xl mx-auto px-5 py-8 space-y-8 page-enter">
        {/* Header */}
        <div>
          <p className="text-sm text-slate mb-1">{today}</p>
          <h1 className="text-2xl font-bold text-smoke">
            {getGreeting()}, {MOCK_USER.name}
          </h1>
          <p className="text-sm text-slate mt-1">
            {MOCK_USER.streak}-day streak 🔥 — you're building momentum.
          </p>
        </div>

        {/* Score + Screen Time */}
        <div className="grid grid-cols-2 gap-4">
          {/* Addiction Score */}
          <div className="card p-6 flex flex-col items-center gap-2">
            <ScoreRing score={MOCK_USER.score} size={130} strokeWidth={9} label="Addiction Score" />
          </div>

          {/* Screen Time */}
          <div className="card p-6 flex flex-col justify-between gap-4">
            <div>
              <p className="text-xs font-semibold text-slate uppercase tracking-wider mb-1">Screen Time Today</p>
              <p className="text-3xl font-bold text-smoke">{screenTimeToday}h</p>
              <p className="text-xs text-slate mt-0.5">Goal: {screenTimeGoal}h</p>
            </div>
            <div>
              <div className="w-full h-2.5 rounded-full neu-inset overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-1000"
                  style={{
                    width: `${pct}%`,
                    background: pct >= 90 ? '#FF7C7C' : pct >= 70 ? '#FFBC7C' : '#C0C0C0',
                  }}
                />
              </div>
              <div className="flex justify-between text-[10px] text-slate mt-1.5">
                <span>0h</span><span>{screenTimeGoal}h</span>
              </div>
            </div>
            <div className="flex items-center gap-1.5 text-xs font-medium text-success">
              <TrendingDown size={13} />
              <span>−1.2h vs yesterday</span>
            </div>
          </div>
        </div>

        {/* Habit Rewiring Engine */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Zap size={16} className="text-slate" />
              <h2 className="text-sm font-bold text-smoke uppercase tracking-wide">Habit Rewiring</h2>
            </div>
            <span className="text-xs text-slate">{habitIdx + 1} / {HABIT_PATTERNS.length}</span>
          </div>
          <HabitCard
            key={habitIdx}
            {...habit}
            onDismiss={() => setHabitIdx(i => (i + 1) % HABIT_PATTERNS.length)}
          />
        </div>

        {/* Daily Challenges */}
        <div>
          <h2 className="text-sm font-bold text-smoke uppercase tracking-wide mb-3">Today's Challenges</h2>
          <div className="space-y-2.5">
            {DAILY_CHALLENGES.map(c => {
              const done = completedChallenges.includes(c.id);
              return (
                <button
                  key={c.id}
                  onClick={() => setCompletedChallenges(p => done ? p.filter(x => x !== c.id) : [...p, c.id])}
                  className={`w-full card px-4 py-3.5 flex items-center gap-4 text-left transition-all group ${done ? 'opacity-60' : ''}`}
                >
                  <div className={`w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0 transition-all ${done ? 'bg-green-50' : 'neu-surface-sm group-hover:shadow-card-hover'}`}>
                    {done ? <CheckCircle size={18} className="text-green-500" /> : <DynamicIcon name={c.icon || 'Zap'} size={18} className="text-slate" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm font-bold ${done ? 'line-through text-slate' : 'text-iron'}`}>{c.title}</p>
                    <p className="text-xs text-slate mt-0.5">{c.desc}</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-xs font-bold text-iron/70">+{c.points}p</p>
                    <p className="text-[10px] text-slate mt-0.5">{c.duration}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Quick Actions */}
        <div>
          <h2 className="text-sm font-bold text-smoke uppercase tracking-wide mb-3">Quick Actions</h2>
          <div className="grid grid-cols-3 gap-3">
            {[
              { href: '/focus', icon: Focus, label: 'Start Focus', color: '#7C7CFF' },
              { href: '/coach', icon: MessageCircle, label: 'Ask Coach', color: '#6ABF8E' },
              { href: '/community', icon: Users, label: 'Community', color: '#FF7CB0' },
            ].map(({ href, icon: Icon, label, color }) => (
              <Link
                key={href}
                href={href}
                className="card p-4 flex flex-col items-center gap-2 hover:scale-[1.02] transition-transform"
              >
                <div className="w-10 h-10 rounded-2xl neu-surface-sm flex items-center justify-center">
                  <Icon size={18} style={{ color }} />
                </div>
                <span className="text-xs font-medium text-iron text-center">{label}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </AppShell>
  );
}
