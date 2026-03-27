'use client';
import Sidebar from './Sidebar';
import BottomNav from './BottomNav';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';

export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen bg-transparent">
      <Sidebar />
      <AnimatePresence mode="wait">
        <motion.main
          key={pathname}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
          className="flex-1 min-w-0 pb-24 md:pb-0"
        >
          {children}
        </motion.main>
      </AnimatePresence>
      <BottomNav />
    </div>
  );
}
