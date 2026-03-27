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
      <div className="card p-5 flex items-center gap-3 animate-fade-in border-mist">
        <div className="w-10 h-10 rounded-2xl flex items-center justify-center bg-surface border border-mist">
          <span className="text-xl text-primary">✓</span>
        </div>
        <div>
          <p className="text-sm font-semibold text-primary">Challenge accepted!</p>
          <p className="text-xs text-muted mt-0.5">Great choice. Small steps build lasting change.</p>
        </div>
      </div>
    );
  }

  const severityBadge = {
    low: { label: 'Low', bg: 'var(--surface)', text: 'var(--secondary)' },
    medium: { label: 'Medium', bg: 'var(--surface)', text: 'var(--foreground)' },
    high: { label: 'High', bg: 'var(--surface)', text: 'var(--foreground)' },
  }[severity];

  return (
    <div className="card p-5 space-y-4 animate-slide-up border-mist">
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl neu-surface-sm flex items-center justify-center">
            <DynamicIcon name={meta.icon} size={14} className="text-secondary" />
          </div>
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-wider text-muted">{meta.label}</p>
          </div>
        </div>
        <span className="text-[10px] font-semibold px-2.5 py-1 rounded-full flex-shrink-0 border border-mist/20"
          style={{ background: severityBadge.bg, color: severityBadge.text }}>
          {severityBadge.label}
        </span>
      </div>

      {/* Pattern */}
      <div className="neu-inset p-3.5 rounded-2xl border border-mist/40">
        <div className="flex items-center gap-2 mb-1.5">
          <Sparkles size={10} className="text-secondary" />
          <p className="text-[10px] font-bold text-muted uppercase tracking-widest">A.I. Insight</p>
        </div>
        <p className="text-sm font-medium text-primary leading-snug">"{pattern}"</p>
        <p className="text-xs text-muted mt-1.5 opacity-80 italic">Context: {trigger}</p>
      </div>

      {/* Alternative */}
      <div className="flex gap-3 items-start p-4 rounded-2xl bg-surface border border-mist/30">
        <div className="mt-0.5 p-1 rounded-lg bg-background/50">
          <DynamicIcon name="Target" size={14} className="text-secondary" />
        </div>
        <p className="text-sm text-primary leading-relaxed">{alternative}</p>
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        <button
          onClick={() => setAccepted(true)}
          className="neu-btn flex-1 flex items-center justify-center gap-2 py-2.5 px-4 text-sm font-semibold text-primary"
        >
          Try this <ArrowRight size={14} />
        </button>
        <button
          onClick={onDismiss}
          className="px-4 py-2.5 rounded-full text-sm text-muted hover:text-primary transition-colors"
        >
          Skip
        </button>
      </div>
    </div>
  );
}
