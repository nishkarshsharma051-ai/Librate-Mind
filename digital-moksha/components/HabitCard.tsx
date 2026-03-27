'use client';
import { useState } from 'react';
import { ArrowRight, Lightbulb } from 'lucide-react';
import { CAT_META } from '@/lib/data';

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
          <span className="text-xl">{meta.emoji}</span>
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
      <div className="neu-inset p-3.5 rounded-2xl">
        <p className="text-[11px] font-semibold text-slate uppercase tracking-wider mb-1">Detected Pattern</p>
        <p className="text-sm font-medium text-smoke">"{pattern}"</p>
        <p className="text-xs text-slate mt-1">Trigger: {trigger}</p>
      </div>

      {/* Alternative */}
      <div className="flex gap-3 items-start p-3.5 rounded-2xl" style={{ background: meta.bg }}>
        <Lightbulb size={16} className="flex-shrink-0 mt-0.5" style={{ color: meta.color }} />
        <p className="text-sm text-iron">{alternative}</p>
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
