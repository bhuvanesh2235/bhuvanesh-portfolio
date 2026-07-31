'use client';

import { motion } from 'framer-motion';
import { SectionHeading, SectionLabel } from '@/components/ui/SectionHeading';
import { AnimatedCounter } from '@/components/ui/AnimatedCounter';
import { Trophy, Medal, Star } from 'lucide-react';
import type { Achievement } from '@/types';

interface Props {
  achievements: Achievement[];
}

const PLATFORM_CONFIG: Record<string, { color: string; icon: string }> = {
  LeetCode:   { color: 'text-amber-400',   icon: '⚡' },
  CodeChef:   { color: 'text-amber-600',   icon: '🍴' },
  HackerRank: { color: 'text-emerald-400', icon: '✓'  },
};

export function Achievements({ achievements }: Props) {
  const stats  = achievements.filter((a) => a.type === 'stat');
  const awards = achievements.filter((a) => a.type === 'award');

  return (
    <section id="achievements" className="section max-w-7xl mx-auto px-6">
      <div className="mb-12">
        <SectionLabel>Recognition</SectionLabel>
        <SectionHeading>
          Numbers & <span className="gradient-text">wins</span>
        </SectionHeading>
      </div>

      {/* Stats with animated counters */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        {stats.map((stat, i) => {
          const numericValue = stat.value ? parseInt(stat.value.replace(/\D/g, ''), 10) : 0;
          const isNumeric = !isNaN(numericValue) && numericValue > 0;
          const cfg = stat.platform ? PLATFORM_CONFIG[stat.platform] : null;

          return (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass rounded-2xl p-6 border border-border hover:border-violet/30 transition-colors text-center group"
            >
              {cfg && (
                <div className="text-2xl mb-3">{cfg.icon}</div>
              )}
              <div className="font-display text-3xl md:text-4xl font-extrabold mb-1 gradient-text">
                {isNumeric ? (
                  <AnimatedCounter
                    target={numericValue}
                    duration={2000}
                    suffix={stat.unit === 'stars' ? '★' : ''}
                  />
                ) : (
                  stat.value ?? '–'
                )}
              </div>
              <div className={`text-xs font-semibold mb-1 ${cfg?.color ?? 'text-muted'}`}>
                {stat.platform ?? ''}
              </div>
              {stat.description && (
                <div className="text-xs text-muted">{stat.description}</div>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Award cards */}
      <div className="grid sm:grid-cols-2 gap-4">
        {awards.map((award, i) => (
          <motion.div
            key={award.id}
            initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="glass rounded-2xl p-5 border border-border hover:border-violet/30 transition-all duration-300 flex items-center gap-4 group"
          >
            <div className="w-11 h-11 rounded-2xl bg-gradient-subtle border border-violet/20 flex items-center justify-center flex-shrink-0 group-hover:bg-violet/15 transition-colors">
              {i === 0 ? (
                <Trophy size={18} className="text-amber-400" />
              ) : i === 2 ? (
                <Star size={18} className="text-violet" />
              ) : (
                <Medal size={18} className="text-cyan" />
              )}
            </div>
            <div>
              <h3 className="font-display font-bold text-text text-sm group-hover:gradient-text transition-all">
                {award.title}
              </h3>
              {award.description && (
                <p className="text-xs text-muted mt-0.5">{award.description}</p>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
