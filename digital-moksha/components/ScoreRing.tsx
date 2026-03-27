'use client';
import { motion } from 'framer-motion';

interface ScoreRingProps {
  score: number;
  label?: string;
  status?: string;
}

export default function ScoreRing({ score, label = 'Addiction Score', status = 'Struggling' }: ScoreRingProps) {
  return (
    <div className="flex flex-col items-center">
      <div className="relative flex items-center justify-center p-4">
        <svg className="transform -rotate-90 w-[240px] h-[240px]" viewBox="0 0 100 100">
          {/* Background track */}
          <circle 
            cx="50" cy="50" r="44" 
            stroke="currentColor" 
            strokeWidth="8" 
            fill="transparent"
            strokeLinecap="round"
            className="text-zinc-100/10 dark:text-white/5"
          />
          {/* Progress ring */}
          <motion.circle
            cx="50" cy="50" r="44"
            stroke="url(#scoreGradient)"
            strokeWidth="8"
            fill="transparent"
            strokeDasharray={276}
            initial={{ strokeDashoffset: 276 }}
            animate={{ strokeDashoffset: 276 - (276 * score) / 100 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            strokeLinecap="round"
            className="drop-shadow-[0_0_12px_rgba(251,146,60,0.2)]"
          />
          
          <defs>
            <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#8A8A8A" />
              <stop offset="100%" stopColor="#FFBC7C" />
            </linearGradient>
          </defs>
        </svg>
        
        <div className="absolute inset-0 flex flex-col items-center justify-center pt-2">
          <span className="hero-number text-7xl">{score}</span>
          <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest -mt-1">{status}</span>
        </div>
      </div>
      <p className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.3em] mt-2">{label}</p>
    </div>
  );
}
