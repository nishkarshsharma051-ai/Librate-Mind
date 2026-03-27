'use client';
import { useState } from 'react';
import { clsx } from 'clsx';

interface NeuToggleProps {
  checked?: boolean;
  onChange?: (v: boolean) => void;
  label?: string;
  size?: 'sm' | 'md';
}

export default function NeuToggle({ checked: controlledChecked, onChange, label, size = 'md' }: NeuToggleProps) {
  const [internal, setInternal] = useState(false);
  const checked = controlledChecked !== undefined ? controlledChecked : internal;

  const toggle = () => {
    const next = !checked;
    setInternal(next);
    onChange?.(next);
  };

  const w = size === 'sm' ? 40 : 52;
  const h = size === 'sm' ? 24 : 30;
  const thumb = size === 'sm' ? 18 : 24;
  const travel = w - h;

  return (
    <label className="flex items-center gap-3 cursor-pointer select-none" onClick={toggle}>
      <div
        className="neu-toggle-track transition-all duration-500 flex-shrink-0 rounded-full"
        style={{ width: w, height: h, padding: (h - thumb) / 2 }}
      >
        <div
          className="neu-toggle-thumb rounded-full transition-all duration-500 shadow-sm"
          style={{
            width: thumb,
            height: thumb,
            transform: checked ? `translateX(${travel}px)` : 'translateX(0)',
            background: checked
              ? 'linear-gradient(135deg, var(--silver-start), var(--silver-end))'
              : 'var(--background)',
          }}
        />
      </div>
      {label && <span className="text-sm font-medium text-primary">{label}</span>}
    </label>
  );
}
