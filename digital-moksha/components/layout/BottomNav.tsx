'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, MessageCircle, Focus, Users, BarChart2 } from 'lucide-react';
import { clsx } from 'clsx';

const NAV = [
  { href: '/',          label: 'Home',      icon: LayoutDashboard },
  { href: '/coach',     label: 'Coach',     icon: MessageCircle   },
  { href: '/focus',     label: 'Focus',     icon: Focus           },
  { href: '/community', label: 'Community', icon: Users           },
  { href: '/analytics', label: 'Stats',     icon: BarChart2       },
];

export default function BottomNav() {
  const path = usePathname();
  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-fog/90 backdrop-blur-md border-t border-mist flex items-center justify-around px-2 pb-safe">
      {NAV.map(({ href, label, icon: Icon }) => {
        const active = path === href;
        return (
          <Link
            key={href}
            href={href}
            className={clsx(
              'flex flex-col items-center gap-1 py-3 px-3 rounded-2xl transition-all duration-200 min-w-[56px]',
              active ? 'text-iron' : 'text-slate'
            )}
          >
            <div className={clsx('p-1.5 rounded-xl transition-all', active && 'neu-surface-sm')}>
              <Icon size={20} strokeWidth={active ? 2.2 : 1.8} />
            </div>
            <span className="text-[10px] font-medium leading-none">{label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
