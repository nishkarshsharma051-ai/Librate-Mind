import { useState } from 'react';
import { Flame } from 'lucide-react';
import { CAT_META } from '@/lib/data';
import DynamicIcon from './DynamicIcon';

interface HabitCardProps {
  pattern: string;
  trigger: string;
  alternative: string;
  category: keyof typeof CAT_META;
  severity: 'low' | 'medium' | 'high';
  onDismiss?: () => void;
}

export default function HabitCard({ pattern, trigger, alternative, category, severity, onDismiss }: HabitCardProps) {
  const [accepted, setAccepted] = useState(false);
  const meta = CAT_META[category];

  if (accepted) {
    return (
      <div className="glass-card p-6 flex items-center gap-4 animate-fade-in border-white/5">
        <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-white/5 border border-white/10">
          <DynamicIcon name="Check" size={20} className="text-zinc-200" />
        </div>
        <div>
          <p className="text-sm font-black text-primary tracking-tight">Challenge accepted</p>
          <p className="text-xs text-muted mt-1 leading-relaxed italic">"Small steps build lasting change."</p>
        </div>
      </div>
    );
  }

  const severityBadge = {
    low: { label: 'Subtle', bg: 'rgba(255,255,255,0.03)', text: '#A0A0A0' },
    medium: { label: 'Moderate', bg: 'rgba(255,255,255,0.05)', text: '#C0C0C0' },
    high: { label: 'Significant', bg: 'rgba(255,255,255,0.08)', text: '#EDEDED' },
  }[severity];

  return (
    <div className="glass-card p-8 ml-0 space-y-8 animate-slide-up border-white/5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="p-2.5 bg-white/5 rounded-xl border border-white/5">
            <DynamicIcon name={meta.icon} size={16} className="text-muted" />
          </div>
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted">{meta.label}</p>
        </div>
        <span className="text-[9px] font-bold px-3 py-1 rounded-full uppercase tracking-widest border border-white/5"
          style={{ background: severityBadge.bg, color: severityBadge.text }}>
          {severityBadge.label}
        </span>
      </div>

      {/* Pattern */}
      <div className="bg-white/5 p-6 rounded-[2rem] border border-white/5 space-y-4">
        <div className="flex items-center gap-3">
          <Flame size={12} className="text-muted/40" />
          <p className="text-[10px] font-black text-muted/60 uppercase tracking-widest">Observation</p>
        </div>
        <p className="text-lg font-black text-primary leading-snug">"{pattern}"</p>
        <p className="text-[11px] text-muted font-medium italic opacity-80">Context: {trigger}</p>
      </div>

      {/* Alternative */}
      <div className="flex gap-4 items-center p-6 rounded-[2rem] bg-white/[0.02] border border-white/5">
        <div className="p-2 bg-white/5 rounded-lg border border-white/5">
          <DynamicIcon name="Target" size={16} className="text-muted" />
        </div>
        <p className="text-sm text-primary font-bold leading-relaxed">{alternative}</p>
      </div>

      {/* Actions */}
      <div className="flex gap-4">
        <button
          onClick={() => setAccepted(true)}
          className="neu-btn flex-1 py-5 text-[10px] font-black text-muted uppercase tracking-[0.2em]"
        >
          Try this
        </button>
        <button
          onClick={onDismiss}
          className="px-8 py-5 text-[10px] font-black text-muted/40 uppercase tracking-widest hover:text-muted transition-colors"
        >
          Skip
        </button>
      </div>
    </div>
  );
}
