'use client';

import { motion } from 'framer-motion';
import { SectionHeading, SectionLabel } from '@/components/ui/SectionHeading';
import { GraduationCap, Calendar } from 'lucide-react';

const EDUCATION = [
  {
    degree: 'B.E. CSE (Artificial Intelligence & Machine Learning)',
    school: 'Sri Eshwar College of Engineering',
    period: '2022 – 2026',
    grade: 'CGPA: 8.4 / 10',
    status: 'Completed',
    icon: '🎓',
    color: 'border-violet/40 bg-violet/5',
    accent: 'text-violet',
  },
  {
    degree: 'Higher Secondary Certificate (HSC)',
    school: 'Alagar Public School',
    period: '2020 – 2022',
    grade: '71.2%',
    status: 'Completed',
    icon: '📚',
    color: 'border-cyan/30 bg-cyan/5',
    accent: 'text-cyan',
  },
  {
    degree: 'Secondary School Leaving Certificate (SSLC)',
    school: 'Alagar Public School',
    period: '2019 – 2020',
    grade: '73.4%',
    status: 'Completed',
    icon: '🏫',
    color: 'border-amber-500/30 bg-amber-500/5',
    accent: 'text-amber-400',
  },
];

export function Education() {
  return (
    <section id="education" className="section max-w-7xl mx-auto px-6">
      <div className="mb-12">
        <SectionLabel>Academic Background</SectionLabel>
        <SectionHeading>
          The <span className="gradient-text">foundation</span>
        </SectionHeading>
      </div>

      <div className="relative">
        {/* Vertical connector — desktop */}
        <div className="hidden md:block absolute left-6 top-8 bottom-8 w-px bg-gradient-to-b from-violet via-cyan to-amber-500 opacity-20" />

        <div className="flex flex-col gap-6">
          {EDUCATION.map((edu, i) => (
            <motion.div
              key={edu.degree}
              initial={{ opacity: 0, x: -32 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.6, delay: i * 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="relative md:pl-16"
            >
              {/* Timeline dot */}
              <div className={`hidden md:flex absolute left-0 top-6 w-12 h-12 rounded-2xl border items-center justify-center text-2xl ${edu.color}`}>
                {edu.icon}
              </div>

              <div className={`glass rounded-2xl p-6 border ${edu.color} hover:scale-[1.01] transition-transform duration-300`}>
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3">
                  <div>
                    <h3 className="font-display text-lg font-bold text-text mb-1">
                      {edu.degree}
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-muted">
                      <GraduationCap size={13} />
                      {edu.school}
                    </div>
                  </div>
                  <div className="flex flex-col items-start md:items-end gap-2 flex-shrink-0">
                    <div className="flex items-center gap-1.5 text-xs text-muted">
                      <Calendar size={11} />
                      {edu.period}
                    </div>
                    <div className={`font-display font-bold text-xl ${edu.accent}`}>
                      {edu.grade}
                    </div>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium border ${edu.status === 'Completed'
                      ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
                      : 'bg-surface2 border-border text-muted'
                      }`}>
                      {edu.status}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
