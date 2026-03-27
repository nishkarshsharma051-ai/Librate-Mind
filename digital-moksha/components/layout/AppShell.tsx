'use client';
import Sidebar from './Sidebar';
import BottomNav from './BottomNav';
import { motion, AnimatePresence } from 'framer-motion';
import ThemeToggle from '../ThemeToggle';
import DynamicIcon from '../DynamicIcon';
import { usePathname } from 'next/navigation';

export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen bg-transparent relative transition-colors duration-500">
      {/* Organic Background Elements */}
      <div className="fixed inset-0 overflow-hidden -z-10 pointer-events-none">
        <div className="glass-bubble w-[600px] h-[600px] -top-20 -left-20 scale-110" />
        <div className="glass-bubble w-[350px] h-[350px] top-[10%] left-[30%]" />
        <div className="glass-bubble w-[400px] h-[400px] top-[40%] left-[80%]" />
        <div className="glass-bubble w-[250px] h-[250px] top-[20%] right-[10%]" />
        <div className="glass-bubble w-[300px] h-[300px] top-[70%] left-[5%]" />
        <div className="glass-bubble w-[500px] h-[500px] -bottom-20 left-[40%]" />
        <div className="glass-bubble w-[450px] h-[450px] -bottom-10 -right-10" />
      </div>

      <Sidebar />
      <AnimatePresence mode="wait">
        <motion.main
          key={pathname}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="flex-1 relative"
        >
          <div className="absolute top-10 right-10 z-50">
            <ThemeToggle />
          </div>
          {children}
        </motion.main>
      </AnimatePresence>
      <BottomNav />
    </div>
  );
}
