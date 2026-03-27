'use client';
import { useState } from 'react';
import AppShell from '@/components/layout/AppShell';
import ScoreRing from '@/components/ScoreRing';
import DynamicIcon from '@/components/DynamicIcon';
import { MOCK_USER } from '@/lib/data';
import { motion } from 'framer-motion';

export default function DashboardPage() {
  return (
    <AppShell>
      <div className="max-w-[1100px] mx-auto py-10 px-8 space-y-12 page-enter">
        {/* Header Section */}
        <header className="flex justify-between items-start">
          <div className="space-y-1">
            <h1 className="text-4xl font-black text-primary tracking-tight">Good morning, Nishkarsh</h1>
            <p className="text-muted font-medium flex items-center gap-2">
              7-day streak — you're building momentum.
            </p>
          </div>
          <div className="glass-card px-6 py-3 flex items-center gap-4 border-mist shadow-sm transition-all duration-300">
             <div className="p-2 bg-surface rounded-lg">
                <DynamicIcon name="Clock" size={16} className="text-secondary" />
             </div>
             <div className="text-left">
                <p className="text-[10px] font-black text-muted uppercase tracking-widest">11PM Peak Usage</p>
                <p className="text-xs font-bold text-primary">36m <span className="text-muted font-normal">screen time</span></p>
             </div>
             <div className="w-8 h-1 bg-surface rounded-full relative">
                <div className="absolute left-0 top-0 h-full w-[60%] bg-muted/30 rounded-full" />
             </div>
          </div>
        </header>

        {/* Top Hero Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-3 glass-card p-10 flex flex-col items-center justify-center border-mist">
            <ScoreRing score={MOCK_USER.score} status="Struggling" />
          </div>
          
          <div className="lg:col-span-2 glass-card p-10 space-y-8 flex flex-col justify-center border-mist">
            <header className="space-y-1">
              <p className="text-[10px] font-black text-muted uppercase tracking-widest">Screen Time Today</p>
              <h2 className="text-5xl font-black text-primary hero-number">4.5h</h2>
              <p className="text-xs text-muted font-medium">Goal: 6h</p>
            </header>
            
            <div className="space-y-4">
               <div className="h-3 w-full bg-surface rounded-full relative p-0.5">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: '75%' }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="h-full bg-gradient-to-r from-zinc-300 to-zinc-500 rounded-full shadow-[0_0_10px_rgba(0,0,0,0.1)]"
                  />
               </div>
               <div className="flex justify-between text-[10px] font-black text-muted uppercase tracking-widest opacity-60">
                  <span>Usage Cycle</span>
                  <span>92% Clean</span>
               </div>
            </div>

            <div className="flex items-center gap-2 text-xs font-bold text-secondary">
               <DynamicIcon name="Zap" size={14} className="text-secondary/60" />
               <span>Refining stability...</span>
            </div>
          </div>
        </div>

        {/* Habit Rewiring Section (Restored Structure) */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <DynamicIcon name="Zap" size={18} className="text-muted" />
              <h3 className="text-xs font-black text-primary uppercase tracking-[0.2em]">Habit Rewiring</h3>
            </div>
            <span className="text-[10px] font-black text-muted uppercase tracking-widest">1 / 5</span>
          </div>

          <div className="glass-card p-4 border-mist">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {/* Left Insight Card */}
              <div className="bg-surface/50 border border-mist rounded-[2.5rem] p-8 space-y-8">
                <header className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-background/60 rounded-xl shadow-sm">
                      <DynamicIcon name="Brain" size={16} className="text-muted" />
                    </div>
                    <p className="text-[10px] font-black text-muted uppercase tracking-widest">A.I. Insight</p>
                  </div>
                  <span className="text-[10px] font-black text-secondary bg-surface px-3 py-1 rounded-full uppercase tracking-widest">Important</span>
                </header>

                <div className="space-y-2">
                  <h4 className="text-lg font-black text-primary">"You use your phone most around 11 PM"</h4>
                  <p className="text-xs text-muted italic font-medium">Context: Nighttime scrolling / habit loop</p>
                </div>

                <div className="bg-background/60 p-5 rounded-3xl border border-mist flex items-center gap-4">
                   <div className="p-2.5 bg-surface rounded-xl">
                      <DynamicIcon name="BookOpen" size={16} className="text-muted" />
                   </div>
                   <p className="text-sm font-bold text-primary">Try reading for 10 minutes instead</p>
                </div>

                <div className="flex items-center gap-4 pt-4">
                   <button className="flex-1 bg-background border border-mist py-5 rounded-[1.5rem] text-sm font-black text-primary flex items-center justify-center gap-2 shadow-sm hover:shadow-md transition-all active:scale-[0.98]">
                      Try this <DynamicIcon name="ArrowRight" size={14} />
                   </button>
                   <button className="px-8 py-5 text-sm font-bold text-muted uppercase tracking-widest hover:text-primary transition-colors">
                      Skip
                   </button>
                </div>
              </div>

              {/* Right Insight Card */}
              <div className="bg-surface/50 border border-mist rounded-[2.5rem] p-8 space-y-8 flex flex-col justify-between">
                 <header className="flex items-center gap-3">
                    <div className="p-2 bg-background/60 rounded-xl shadow-sm">
                      <DynamicIcon name="History" size={16} className="text-muted" />
                    </div>
                    <p className="text-[10px] font-black text-muted uppercase tracking-widest">Light Trend</p>
                 </header>

                 <div className="space-y-4">
                    <h4 className="text-2xl font-black text-primary leading-snug">
                       Try reading for <br />
                       <span className="hero-number text-4xl">12 minutes</span> instead
                    </h4>
                 </div>

                 <div className="space-y-1">
                    <p className="text-sm font-bold text-muted flex items-center gap-2">
                       <DynamicIcon name="TrendingDown" size={16} />
                       -26% <span className="text-muted font-medium text-xs uppercase tracking-widest ml-1">more than last week</span>
                    </p>
                 </div>

                 <div className="self-end">
                    <div className="w-14 h-14 rounded-full neu-btn flex items-center justify-center">
                       <div className="w-6 h-6 bg-muted/20 rounded opacity-50 rotate-45" />
                    </div>
                 </div>
              </div>
            </div>
          </div>
        </section>

        {/* Analytics Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pb-16">
           {/* Weekly Chart */}
           <div className="glass-card p-10 space-y-8 border-mist">
              <header className="flex items-center justify-between">
                 <h4 className="text-sm font-black text-primary flex items-center gap-2">
                    Weekly Screen Time <DynamicIcon name="Info" size={12} className="text-muted/40" />
                 </h4>
              </header>
              <div className="space-y-6">
                 <div>
                    <h3 className="text-4xl font-black text-primary">31.5h</h3>
                    <p className="text-xs font-bold text-muted flex items-center gap-1 mt-1">
                       <DynamicIcon name="TrendingUp" size={14} className="rotate-180 opacity-50" />
                       6h <span className="text-muted/60 font-medium ml-1 uppercase tracking-widest text-[9px]">vs last week</span>
                    </p>
                 </div>
                 <div className="flex items-end justify-between h-32 gap-3 px-2">
                    {[3, 5, 4, 6, 8, 10, 7].map((val, i) => (
                      <div key={i} className="flex flex-col items-center gap-3 flex-1">
                        <motion.div 
                          initial={{ height: 0 }}
                          animate={{ height: `${val * 10}%` }}
                          transition={{ delay: i * 0.1, duration: 1, ease: "easeOut" }}
                          className={`w-full max-w-[12px] rounded-full ${i === 4 ? 'bg-secondary' : 'bg-surface'} transition-colors hover:bg-muted/40`}
                        />
                        <span className="text-[10px] font-black text-muted/60 uppercase tracking-widest">
                          {['Su', 'Tu', 'We', 'Th', 'Fr', 'Sat', 'Sa'][i]}
                        </span>
                      </div>
                    ))}
                 </div>
              </div>
           </div>

           {/* Focus Insight */}
           <div className="glass-card p-10 flex flex-col justify-between border-mist">
              <header className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-background/60 rounded-xl border border-mist/40 shadow-sm">
                    <DynamicIcon name="Crown" size={16} className="text-muted" />
                  </div>
                  <h4 className="text-sm font-black text-primary">Focus Insight</h4>
                </div>
              </header>

              <div className="py-8 space-y-4">
                 <p className="text-lg font-black text-primary italic leading-snug">"You reach focus best in evening hours..."</p>
                 <p className="text-xs text-muted font-medium leading-relaxed italic">Better timing ensures consistent results and lower dopamine fatigue.</p>
              </div>

              <div className="flex gap-4 pt-4">
                 <button className="neu-btn flex-1 py-4 text-[10px] font-black text-muted uppercase tracking-[0.2em]">
                   Refine Strategy
                 </button>
              </div>
           </div>
        </div>

        {/* FAB */}
        <div className="fixed bottom-12 right-12 z-50">
           <button className="w-16 h-16 rounded-[2rem] bg-card border border-mist shadow-2xl flex items-center justify-center text-muted hover:scale-110 hover:text-primary transition-all active:scale-95 group">
              <DynamicIcon name="Plus" size={32} className="group-hover:text-primary transition-colors" />
           </button>
        </div>
      </div>
    </AppShell>
  );
}
