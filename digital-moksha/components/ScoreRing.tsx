'use client';
import { motion } from 'framer-motion';

interface ScoreRingProps {
  score: number;
  label?: string;
  status?: string;
}

export default function ScoreRing({ score, label = 'Addiction Score', status = 'Equilibrium' }: ScoreRingProps) {
  return (
    <div className="flex flex-col items-center">
      <div className="relative flex items-center justify-center p-4">
        <svg className="transform -rotate-90 w-[240px] h-[240px]" viewBox="0 0 100 100">
          {/* Background track */}
          <circle 
            cx="50" cy="50" r="44" 
            stroke="var(--border)" 
            strokeWidth="8" 
            fill="transparent"
            strokeLinecap="round"
          />
          {/* Progress ring */}
          <motion.circle
            cx="50" cy="50" r="44"
            stroke="url(#silverGradient)"
            strokeWidth="8"
            fill="transparent"
            strokeDasharray={276}
            initial={{ strokeDashoffset: 276 }}
            animate={{ strokeDashoffset: 276 - (276 * score) / 100 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            strokeLinecap="round"
            className="drop-shadow-[0_0_15px_rgba(255,255,255,0.05)]"
          />
          
          <defs>
            <linearGradient id="silverGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" style={{ stopColor: 'var(--silver-start)' }} />
              <stop offset="100%" style={{ stopColor: 'var(--silver-end)' }} />
            </linearGradient>
          </defs>
        </svg>
        
        <div className="absolute inset-0 flex flex-col items-center justify-center pt-2">
          <span className="hero-number text-7xl text-primary">{score}</span>
          <span className="text-[10px] font-bold text-muted uppercase tracking-[0.3em] -mt-1">{status}</span>
        </div>
      </div>
      <p className="text-[10px] font-black text-muted uppercase tracking-[0.4em] mt-3">{label}</p>
    </div>
  );
}
