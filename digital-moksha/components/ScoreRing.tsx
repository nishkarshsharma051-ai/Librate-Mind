'use client';
import { useEffect, useRef } from 'react';

interface ScoreRingProps {
  score: number;
  size?: number;
  strokeWidth?: number;
  label?: string;
}

export default function ScoreRing({ score, size = 160, strokeWidth = 10, label = 'Addiction Score' }: ScoreRingProps) {
  const r = (size - strokeWidth * 2) / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ - (score / 100) * circ;

  const ringRef = useRef<SVGCircleElement>(null);

  useEffect(() => {
    if (!ringRef.current) return;
    ringRef.current.style.strokeDashoffset = String(circ);
    const raf = requestAnimationFrame(() => {
      if (ringRef.current) {
        ringRef.current.style.transition = 'stroke-dashoffset 1.2s cubic-bezier(0.4,0,0.2,1)';
        ringRef.current.style.strokeDashoffset = String(offset);
      }
    });
    return () => cancelAnimationFrame(raf);
  }, [score, circ, offset]);

  const getColor = (s: number) => {
    if (s >= 75) return '#FF7C7C';
    if (s >= 50) return '#FFBC7C';
    if (s >= 25) return '#C0C0C0';
    return '#6ABF8E';
  };

  const getLabel = (s: number) => {
    if (s >= 75) return 'Critical';
    if (s >= 50) return 'Struggling';
    if (s >= 25) return 'Improving';
    return 'Thriving';
  };

  const color = getColor(score);
  const cx = size / 2;
  const cy = size / 2;

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="rotate-[-90deg]">
          {/* Track */}
          <circle cx={cx} cy={cy} r={r} fill="none" stroke="#EAEAEA" strokeWidth={strokeWidth} />
          {/* Fill */}
          <circle
            ref={ringRef}
            cx={cx} cy={cy} r={r}
            fill="none"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circ}
            strokeDashoffset={circ}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center" style={{ transform: 'none' }}>
          <span className="text-4xl font-bold text-smoke">{score}</span>
          <span className="text-xs text-slate mt-0.5">{getLabel(score)}</span>
        </div>
      </div>
      <p className="text-sm text-slate font-medium">{label}</p>
    </div>
  );
}
