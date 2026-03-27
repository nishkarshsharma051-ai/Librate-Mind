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
      <div className="max-w-[1100px] mx-auto py-10 px-8 space-y-16 page-enter">
        {/* Header Section */}
        <header className="flex justify-between items-start">
          <div className="space-y-2">
            <h1 className="text-4xl font-black text-primary tracking-tight">Good morning, Nishkarsh</h1>
            <p className="text-muted font-medium italic text-sm">
              Developing your personal equilibrium. 7 days consistent.
            </p>
          </div>
          <div className="glass-card px-6 py-4 flex items-center gap-4 border-white/5 shadow-hero-glow">
             <div className="p-2 bg-white/5 rounded-lg border border-white/5">
                <DynamicIcon name="Clock" size={16} className="text-muted" />
             </div>
             <div className="text-left">
                <p className="text-[10px] font-black text-muted uppercase tracking-widest">Late usage</p>
                <p className="text-xs font-bold text-primary">36m <span className="text-muted font-normal">nightly</span></p>
             </div>
          </div>
        </header>

        {/* Top Hero Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          <div className="lg:col-span-3 glass-card p-12 flex flex-col items-center justify-center border-white/5">
            <ScoreRing score={MOCK_USER.score} status="Optimal" />
          </div>
          
          <div className="lg:col-span-2 glass-card p-12 space-y-10 flex flex-col justify-center border-white/5">
            <header className="space-y-2">
              <p className="text-[10px] font-black text-muted uppercase tracking-[0.2em]">Screen Time</p>
              <h2 className="text-6xl font-black text-primary hero-number">4.5h</h2>
              <p className="text-xs text-muted font-medium">Daily Goal: 6h</p>
            </header>
            
            <div className="space-y-6">
               <div className="h-2 w-full bg-white/5 rounded-full relative">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: '75%' }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="h-full bg-zinc-400 rounded-full shadow-[0_0_15px_rgba(255,255,255,0.1)]"
                  />
               </div>
               <div className="flex justify-between text-[10px] font-black text-muted uppercase tracking-widest opacity-60">
                  <span>Usage Cycle</span>
                  <span>92% Clean</span>
               </div>
            </div>

            <div className="flex items-center gap-2 text-xs font-bold text-zinc-500">
               <DynamicIcon name="Zap" size={14} className="text-muted/60" />
               <span>Refining stability...</span>
            </div>
          </div>
        </div>

        {/* Focused Analytics Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 pb-16">
           {/* Weekly Chart */}
           <div className="glass-card p-12 space-y-10 border-white/5">
              <header className="flex items-center justify-between">
                 <h4 className="text-[10px] font-black text-muted uppercase tracking-[0.2em] flex items-center gap-2">
                    Weekly Equilibrium <DynamicIcon name="Info" size={12} className="text-muted/40" />
                 </h4>
              </header>
              <div className="space-y-8">
                 <div className="flex items-end justify-between h-40 gap-4 px-2">
                    {[4, 6, 5, 7, 9, 8, 6].map((val, i) => (
                      <div key={i} className="flex flex-col items-center gap-4 flex-1">
                        <motion.div 
                          initial={{ height: 0 }}
                          animate={{ height: `${val * 10}%` }}
                          transition={{ delay: i * 0.1, duration: 1, ease: "easeOut" }}
                          className={`w-full max-w-[8px] rounded-full ${i === 4 ? 'bg-zinc-100' : 'bg-white/10'} transition-colors hover:bg-zinc-200`}
                        />
                        <span className="text-[10px] font-black text-muted/60 uppercase tracking-widest">
                          {['S', 'M', 'T', 'W', 'T', 'F', 'S'][i]}
                        </span>
                      </div>
                    ))}
                 </div>
              </div>
           </div>

           {/* Insights */}
           <div className="glass-card p-12 flex flex-col justify-between border-white/5">
              <header className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="p-2.5 bg-white/5 rounded-xl border border-white/5">
                    <DynamicIcon name="History" size={16} className="text-muted" />
                  </div>
                  <h4 className="text-[10px] font-black text-muted uppercase tracking-[0.2em]">Pattern Insight</h4>
                </div>
              </header>

              <div className="py-8 space-y-4">
                 <p className="text-xl font-black text-primary leading-snug">
                   Your focus peaks in the evening hours.
                 </p>
                 <p className="text-sm text-muted font-medium leading-relaxed italic">
                    Consider shifting creative sessions to after 7 PM for maximum cognitive clarity.
                 </p>
              </div>

              <div className="flex gap-6">
                 <button className="flex-1 neu-btn py-5 text-[10px] font-black text-muted uppercase tracking-[0.2em]">
                    Personalize Focus
                 </button>
              </div>
           </div>
        </div>

        {/* FAB */}
        <div className="fixed bottom-12 right-12 z-50">
           <button className="w-16 h-16 rounded-full bg-[#1A1A1A] border border-white/5 shadow-2xl flex items-center justify-center text-muted hover:scale-110 hover:text-primary transition-all active:scale-95 shadow-[#000000]">
              <DynamicIcon name="Plus" size={32} />
           </button>
        </div>
      </div>
    </AppShell>
  );
}
