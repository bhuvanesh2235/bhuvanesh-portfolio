'use client';

import { motion } from 'framer-motion';
import { SectionHeading, SectionLabel } from '@/components/ui/SectionHeading';
import type { Skill } from '@/types';

const CATEGORY_ICONS: Record<string, string> = {
  Languages:   '{ }',
  'AI/ML':     '⚡',
  Frameworks:  '🔧',
  Databases:   '🗄️',
  Tools:       '🛠️',
  'Core CS':   '📐',
};

const CATEGORY_COLORS: Record<string, string> = {
  Languages:   'border-violet/30 bg-violet/5',
  'AI/ML':     'border-cyan/30 bg-cyan/5',
  Frameworks:  'border-amber-500/30 bg-amber-500/5',
  Databases:   'border-emerald-500/30 bg-emerald-500/5',
  Tools:       'border-rose-500/30 bg-rose-500/5',
  'Core CS':   'border-indigo-500/30 bg-indigo-500/5',
};

const CATEGORY_TEXT: Record<string, string> = {
  Languages:   'text-violet',
  'AI/ML':     'text-cyan',
  Frameworks:  'text-amber-400',
  Databases:   'text-emerald-400',
  Tools:       'text-rose-400',
  'Core CS':   'text-indigo-400',
};

interface Props {
  groupedSkills: Record<string, Skill[]>;
}

export function Skills({ groupedSkills }: Props) {
  const categories = Object.keys(groupedSkills);

  return (
    <section id="skills" className="section max-w-7xl mx-auto px-4 sm:px-6">
      <div className="mb-8 sm:mb-12">
        <SectionLabel>Capabilities</SectionLabel>
        <SectionHeading>
          Tools of the <span className="gradient-text">craft</span>
        </SectionHeading>
      </div>

      {/* Responsive grid: 1 col → 2 col → feature AI/ML wider on lg */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        {categories.map((category, catIndex) => {
          const skills    = groupedSkills[category];
          const icon      = CATEGORY_ICONS[category]  ?? '·';
          const color     = CATEGORY_COLORS[category] ?? 'border-border bg-surface';
          const textColor = CATEGORY_TEXT[category]   ?? 'text-violet';

          return (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: catIndex * 0.07 }}
              className={`glass rounded-2xl p-4 sm:p-5 border ${color} transition-all duration-300 hover:scale-[1.01]`}
            >
              {/* Category header */}
              <div className="flex items-center gap-2 sm:gap-3 mb-4">
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center text-sm font-mono font-bold ${textColor} border ${color}`}>
                  {icon}
                </div>
                <h3 className={`font-display font-bold text-sm sm:text-base ${textColor}`}>
                  {category}
                </h3>
              </div>

              {/* Skill chips */}
              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {skills.map((skill, i) => (
                  <motion.div
                    key={skill.id}
                    initial={{ opacity: 0, scale: 0.85 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: catIndex * 0.04 + i * 0.025 }}
                    className="flex items-center gap-1.5 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-xl bg-surface border border-border hover:border-violet/30 transition-all cursor-default"
                  >
                    <span className="text-[11px] sm:text-xs text-muted font-medium">{skill.name}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
