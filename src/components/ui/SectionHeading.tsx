'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface Props {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export function SectionHeading({ children, className, delay = 0 }: Props) {
  return (
    <motion.h2
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={cn(
        'font-display text-[1.75rem] sm:text-3xl md:text-[2.75rem] lg:text-5xl font-bold tracking-tight leading-tight',
        className
      )}
    >
      {children}
    </motion.h2>
  );
}

export function SectionLabel({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.p
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={cn(
        'text-xs uppercase tracking-widest font-medium text-violet mb-3',
        className
      )}
    >
      {children}
    </motion.p>
  );
}
