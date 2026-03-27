'use client';
import * as Lucide from 'lucide-react';
import { LucideProps } from 'lucide-react';

interface IconProps extends LucideProps {
  name: string;
}

/**
 * Dynamic Icon component to render professional Lucide icons from string names
 */
export default function DynamicIcon({ name, size = 18, ...props }: IconProps) {
  // @ts-ignore
  const Icon = Lucide[name];
  
  if (!Icon) {
    return <Lucide.HelpCircle size={size} {...props} />;
  }

  return <Icon size={size} strokeWidth={2} {...props} />;
}
