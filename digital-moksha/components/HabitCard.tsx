import { useState } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
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
      <div className="card p-5 flex items-center gap-3 animate-fade-in">
        <div className="w-10 h-10 rounded-2xl flex items-center justify-center" style={{ background: '#F0FFF5' }}>
          <span className="text-xl">✓</span>
        </div>
        <div>
          <p className="text-sm font-semibold text-iron">Challenge accepted!</p>
          <p className="text-xs text-slate mt-0.5">Great choice. Small steps build lasting change.</p>
        </div>
      </div>
    );
  }

  const severityBadge = {
    low: { label: 'Low', bg: '#EAEAEA', text: '#8A8A8A' },
    medium: { label: 'Medium', bg: '#FFF8E6', text: '#C07A00' },
    high: { label: 'High', bg: '#FFF0F0', text: '#C03030' },
  }[severity];

  return (
    <div className="card p-5 space-y-4 animate-slide-up">
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl neu-surface-sm flex items-center justify-center">
            <DynamicIcon name={meta.icon} size={14} className="text-slate" />
          </div>
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-wider text-slate">{meta.label}</p>
          </div>
        </div>
        <span className="text-[10px] font-semibold px-2.5 py-1 rounded-full flex-shrink-0"
          style={{ background: severityBadge.bg, color: severityBadge.text }}>
          {severityBadge.label}
        </span>
      </div>

      {/* Pattern */}
      <div className="neu-inset p-3.5 rounded-2xl border border-white/50">
        <div className="flex items-center gap-2 mb-1.5">
          <Sparkles size={10} className="text-silver" />
          <p className="text-[10px] font-bold text-slate uppercase tracking-widest">A.I. Insight</p>
        </div>
        <p className="text-sm font-medium text-smoke leading-snug">"{pattern}"</p>
        <p className="text-xs text-slate mt-1.5 opacity-80">Context: {trigger}</p>
      </div>

      {/* Alternative */}
      <div className="flex gap-3 items-start p-4 rounded-2xl bg-white shadow-soft ring-1 ring-mist/30">
        <div className="mt-0.5 p-1 rounded-lg bg-mist/20">
          <DynamicIcon name="Target" size={14} className="text-iron" />
        </div>
        <p className="text-sm text-iron leading-relaxed">{alternative}</p>
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        <button
          onClick={() => setAccepted(true)}
          className="neu-btn flex-1 flex items-center justify-center gap-2 py-2.5 px-4 text-sm font-semibold text-iron"
        >
          Try this <ArrowRight size={14} />
        </button>
        <button
          onClick={onDismiss}
          className="px-4 py-2.5 rounded-full text-sm text-slate hover:text-iron transition-colors"
        >
          Skip
        </button>
      </div>
    </div>
  );
}
