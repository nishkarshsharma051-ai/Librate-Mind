'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, MessageCircle, Focus, Users, BarChart2, Zap, Flame } from 'lucide-react';
import { clsx } from 'clsx';

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
    <aside className="hidden md:flex flex-col w-64 h-screen sticky top-0 bg-transparent border-r border-white/5 px-6 py-10 gap-2 flex-shrink-0">
      {/* Brand */}
      <div className="flex items-center gap-4 px-2 mb-10">
        <div className="w-10 h-10 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center shadow-hero-glow">
          <Zap size={18} className="text-zinc-400" />
        </div>
        <div>
          <p className="font-black text-primary text-sm leading-tight tracking-tight">Digital Moksha</p>
          <p className="text-muted text-[10px] font-bold uppercase tracking-widest">Digital Wellness</p>
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
                'flex items-center gap-4 px-5 py-4 rounded-2xl text-sm font-bold transition-all duration-300 relative group',
                active
                  ? 'glass-card text-primary border-white/10 shadow-hero-glow'
                  : 'text-muted hover:text-primary'
              )}
            >
              <Icon size={20} className={active ? 'text-primary' : 'text-muted opacity-60 group-hover:opacity-100'} />
              <span className="flex-1">{label}</span>
              {active && <div className="w-1.5 h-1.5 rounded-full bg-primary absolute right-4 shadow-[0_0_8px_white]" />}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="mt-auto px-4">
        <div className="glass-card p-6 border-white/60 space-y-4">
          <div className="flex items-center gap-3">
             <div className="p-1.5 bg-zinc-50 rounded-lg">
                <Flame size={14} className="text-zinc-800" strokeWidth={1.5} />
             </div>
             <p className="text-[11px] font-bold text-zinc-800 tracking-wide">7 Days Active</p>
          </div>
          <p className="text-[11px] font-medium text-zinc-400 leading-relaxed italic">"You are developing a natural equilibrium."</p>
        </div>
      </div>
    </aside>
  );
}
