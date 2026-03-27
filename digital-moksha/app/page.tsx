'use client';
import { useState } from 'react';
import AppShell from '@/components/layout/AppShell';
import ScoreRing from '@/components/ScoreRing';
import HabitCard from '@/components/HabitCard';
import DynamicIcon from '@/components/DynamicIcon';
import { MOCK_USER, HABIT_PATTERNS, DAILY_CHALLENGES } from '@/lib/data';

export default function DashboardPage() {
  const [habitIdx, setHabitIdx] = useState(0);

  return (
    <AppShell>
      <div className="max-w-6xl mx-auto space-y-20 py-12 px-6">
        {/* Hero Section: Addiction Score */}
        <section className="flex flex-col items-center text-center space-y-10">
          <header className="space-y-4">
            <h1 className="text-5xl md:text-7xl font-black tracking-tight text-iron gradient-text">Moksha</h1>
            <p className="text-zinc-400 font-medium text-lg uppercase tracking-[0.3em]">Digital Equilibrium</p>
          </header>
          
          <div className="w-full max-w-xl glass-card p-12 flex flex-col items-center border-white/60">
            <ScoreRing score={MOCK_USER.score} />
            <div className="w-full h-px bg-white/20 my-10" />
            <p className="text-zinc-400 text-sm max-w-sm leading-relaxed italic">
              "The first step towards freedom is awareness."
            </p>
          </div>
        </section>

        {/* Secondary Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="glass-card p-10 space-y-8">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-black text-iron flex items-center gap-4">
                <DynamicIcon name="Clock" size={24} />
                Screen Time
              </h2>
              <span className="text-[10px] font-black px-4 py-1.5 rounded-full border border-iron/10 text-iron/40 uppercase tracking-[0.2em] bg-white/50">Realtime</span>
            </div>
            
            <div className="space-y-6">
              <div className="flex justify-between items-end">
                <span className="hero-number text-6xl">5h 42m</span>
                <span className="text-orange-500 text-xs font-black flex items-center gap-1 mb-3">
                  <DynamicIcon name="TrendingUp" size={14} />
                  12% today
                </span>
              </div>
              <div className="h-3 w-full bg-mist/50 rounded-full overflow-hidden p-0.5">
                <div className="h-full bg-iron w-[72%] rounded-full shadow-[0_0_15px_rgba(138,138,138,0.4)]" />
              </div>
            </div>
          </div>

          <div className="glass-card p-10 space-y-8">
             <div className="flex items-center justify-between">
              <h2 className="text-2xl font-black text-iron flex items-center gap-4">
                <DynamicIcon name="Brain" size={24} />
                Habit Rewiring
              </h2>
            </div>
            
            <div className="space-y-6">
              <div className="p-6 bg-white/40 rounded-[2rem] border border-white/60 shadow-inner-sm">
                <p className="text-[10px] uppercase font-black text-iron/30 mb-2 tracking-[0.2em]">Pattern Detected</p>
                <p className="text-sm font-bold text-zinc-800 leading-relaxed">
                   Compulsive checking of <span className="text-iron">Social Media</span> at 8:15 AM.
                </p>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <p className="text-[10px] items-center gap-1 flex uppercase font-black text-green-600/60 mb-1 tracking-widest">
                    <DynamicIcon name="Sparkles" size={10} />
                    Recommended Alternative
                  </p>
                  <p className="text-xs font-bold text-zinc-600">Morning Box Breathing (2m)</p>
                </div>
                <button className="neu-btn px-8 py-5 text-xs font-black text-iron uppercase tracking-widest">
                  Try this
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Tertiary Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-10">
            <div className="flex items-center justify-between">
              <h3 className="text-3xl font-black text-iron">Quests</h3>
              <button className="text-xs font-black text-zinc-400 hover:text-iron transition-colors uppercase tracking-widest">Expand</button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {DAILY_CHALLENGES.slice(0, 4).map((c, i) => (
                <div key={i} className="glass-card p-8 flex items-start gap-6 group cursor-pointer hover:bg-white/90 transition-all border-white/40">
                  <div className="bg-white/80 p-4 rounded-2xl shadow-neu-sm group-hover:shadow-neu-inset transition-all ring-1 ring-white/50">
                    <DynamicIcon name="Trophy" size={22} />
                  </div>
                  <div>
                    <h4 className="text-base font-black text-zinc-800 mb-1">{c.title}</h4>
                    <p className="text-xs text-zinc-400 leading-relaxed line-clamp-2">{c.desc}</p>
                    <div className="flex items-center gap-3 mt-4">
                      <span className="text-[9px] font-black text-iron/60 bg-white/60 px-3 py-1 rounded-full border border-iron/10 uppercase tracking-widest">+{c.points} XP</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-10">
            <h3 className="text-3xl font-black text-iron">Coach Insights</h3>
            <div className="glass-card p-10 bg-gradient-to-br from-white/80 to-transparent border-white/60">
              <div className="flex flex-col gap-10">
                 <div className="flex items-start gap-5">
                  <div className="p-2.5 rounded-xl bg-zinc-900 text-white shadow-xl shadow-zinc-900/20">
                    <DynamicIcon name="Sparkle" size={16} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-iron/40 mb-2 uppercase tracking-widest">Direct Insight</p>
                    <p className="text-sm font-bold text-zinc-800 leading-relaxed italic">
                      "Your notification response time is 12s. Try intentional checks every 2 hours."
                    </p>
                  </div>
                </div>
                <button className="w-full neu-btn py-5 text-[10px] font-black text-iron uppercase tracking-[0.2em]">
                  Start Personalized Plan
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
