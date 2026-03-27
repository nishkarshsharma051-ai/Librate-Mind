'use client';
import { motion } from 'framer-motion';

interface ScoreRingProps {
  score: number;
  label?: string;
}

export default function ScoreRing({ score, label = 'Addiction Score' }: ScoreRingProps) {
  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative flex items-center justify-center p-8">
        <svg className="transform -rotate-90 w-full h-full max-w-[280px]" viewBox="0 0 100 100">
          {/* Background track */}
          <circle 
            cx="50" cy="50" r="42" 
            stroke="url(#trackGradient)" 
            strokeWidth="10" 
            fill="transparent"
            strokeLinecap="round"
          />
          {/* Progress ring */}
          <motion.circle
            cx="50" cy="50" r="42"
            stroke="url(#scoreGradient)"
            strokeWidth="10"
            fill="transparent"
            strokeDasharray={264}
            initial={{ strokeDashoffset: 264 }}
            animate={{ strokeDashoffset: 264 - (264 * score) / 100 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            strokeLinecap="round"
            className="drop-shadow-[0_0_8px_rgba(138,138,138,0.2)]"
          />
          
          <defs>
            <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#4A4A4A" />
              <stop offset="100%" stopColor="#8A8A8A" />
            </linearGradient>
            <linearGradient id="trackGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#EAEAEA" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#F5F5F5" stopOpacity="0.8" />
            </linearGradient>
          </defs>
        </svg>
        
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="hero-number text-7xl md:text-8xl">{score}</span>
          <span className="text-zinc-400 font-bold tracking-[0.2em] text-xs uppercase mt-2">Dopamine Score</span>
        </div>
      </div>
      <p className="text-sm text-iron font-medium mt-4">{label}</p>
    </div>
  );
}
