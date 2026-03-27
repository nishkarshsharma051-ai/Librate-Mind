'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, MessageCircle, Focus, Users, BarChart2, Zap, Flame } from 'lucide-react';
import { clsx } from 'clsx';
import ThemeToggle from '../ThemeToggle';

const NAV = [
  { href: '/',           label: 'Dashboard', icon: LayoutDashboard },
  { href: '/coach',      label: 'AI Coach',  icon: MessageCircle   },
  { href: '/focus',      label: 'Focus',     icon: Focus           },
  { href: '/community',  label: 'Community', icon: Users           },
  { href: '/analytics',  label: 'Analytics', icon: BarChart2       },
];

export default function Sidebar() {
  const path = usePathname();
  return (
    <aside className="hidden md:flex flex-col w-64 h-screen sticky top-0 bg-surface border-r border-mist px-5 py-8 gap-2 flex-shrink-0 transition-colors duration-300">
      {/* Brand */}
      <div className="flex items-center gap-3 px-3 mb-8">
        <div className="w-9 h-9 rounded-2xl neu-surface-sm flex items-center justify-center">
          <Zap size={16} className="text-secondary" />
        </div>
        <div>
          <p className="font-bold text-primary text-sm leading-tight">Digital Moksha</p>
          <p className="text-muted text-xs">Digital Wellness</p>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex flex-col gap-1">
        {NAV.map(({ href, label, icon: Icon }) => {
          const active = path === href;
          return (
            <Link
              key={href}
              href={href}
              className={clsx(
                'flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium transition-all duration-200',
                active
                  ? 'neu-surface-sm text-primary'
                  : 'text-muted hover:text-primary'
              )}
            >
              <Icon size={18} strokeWidth={active ? 2.2 : 1.8} />
              {label}
              {active && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-secondary" />}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="mt-auto px-4 space-y-6">
        <div className="flex justify-start px-2">
           <ThemeToggle />
        </div>
        <div className="glass-card p-5 border-mist/60 space-y-3">
          <div className="flex items-center gap-3">
             <div className="p-1.5 bg-background rounded-lg border border-mist shadow-sm">
                <Flame size={14} className="text-primary" strokeWidth={2.5} />
             </div>
             <p className="text-[10px] font-black text-primary uppercase tracking-widest">7-day streak</p>
          </div>
          <p className="text-[11px] font-bold text-muted leading-relaxed">Keep going — you're building real habits.</p>
        </div>
      </div>
    </aside>
  );
}
