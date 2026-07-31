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
    <section id="skills" className="section max-w-7xl mx-auto px-6">
      <div className="mb-12">
        <SectionLabel>Capabilities</SectionLabel>
        <SectionHeading>
          Tools of the <span className="gradient-text">craft</span>
        </SectionHeading>
      </div>

      <div className="bento-grid">
        {categories.map((category, catIndex) => {
          const skills   = groupedSkills[category];
          const icon     = CATEGORY_ICONS[category]  ?? '·';
          const color    = CATEGORY_COLORS[category] ?? 'border-border bg-surface';
          const textColor = CATEGORY_TEXT[category]  ?? 'text-violet';

          // Feature AI/ML category — span wider
          const span = category === 'AI/ML' ? 'lg:col-span-7' : 'lg:col-span-5';

          return (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: catIndex * 0.1 }}
              className={`${span} glass rounded-2xl p-6 border ${color} transition-all duration-300 hover:scale-[1.01]`}
            >
              {/* Category header */}
              <div className="flex items-center gap-3 mb-5">
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-base font-mono font-bold ${textColor} border ${color}`}>
                  {icon}
                </div>
                <h3 className={`font-display font-bold text-base ${textColor}`}>
                  {category}
                </h3>
              </div>

              {/* Skills */}
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, i) => (
                  <motion.div
                    key={skill.id}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: catIndex * 0.05 + i * 0.03 }}
                    whileHover={{ y: -2, scale: 1.05 }}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-surface border border-border hover:border-violet/30 transition-all cursor-default"
                  >
                    <span className="text-xs text-muted font-medium">{skill.name}</span>
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
