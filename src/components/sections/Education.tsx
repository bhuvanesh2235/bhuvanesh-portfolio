'use client';

import { motion } from 'framer-motion';
import { SectionHeading, SectionLabel } from '@/components/ui/SectionHeading';
import { GraduationCap, Calendar, CheckCircle2 } from 'lucide-react';

const EDUCATION = [
  {
    degree: 'B.E. CSE (Artificial Intelligence & Machine Learning)',
    school: 'Sri Eshwar College of Engineering',
    period: '2022 – 2026',
    grade: 'CGPA: 8.4 / 10',
    status: 'Completed',
    icon: '🎓',
    color: 'border-violet/40',
    accent: 'text-violet',
    bg: 'bg-violet/5',
  },
  {
    degree: 'Higher Secondary Certificate (HSC)',
    school: 'Alagar Public School',
    period: '2020 – 2022',
    grade: '71.2%',
    status: 'Completed',
    icon: '📚',
    color: 'border-cyan/30',
    accent: 'text-cyan',
    bg: 'bg-cyan/5',
  },
  {
    degree: 'Secondary School Leaving Certificate (SSLC)',
    school: 'Alagar Public School',
    period: '2019 – 2020',
    grade: '73.4%',
    status: 'Completed',
    icon: '🏫',
    color: 'border-amber-500/30',
    accent: 'text-amber-400',
    bg: 'bg-amber-500/5',
  },
];

export function Education() {
  return (
    <section id="education" className="section max-w-7xl mx-auto px-4 sm:px-6">
      <div className="mb-8 sm:mb-12">
        <SectionLabel>Academic Background</SectionLabel>
        <SectionHeading>
          The <span className="gradient-text">foundation</span>
        </SectionHeading>
      </div>

      <div className="flex flex-col gap-4 sm:gap-5 max-w-3xl">
        {EDUCATION.map((edu, i) => (
          <motion.div
            key={edu.degree}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, delay: i * 0.12, ease: [0.25, 0.46, 0.45, 0.94] }}
            className={`glass rounded-2xl p-4 sm:p-6 border ${edu.color} ${edu.bg} hover:scale-[1.01] transition-transform duration-300`}
          >
            <div className="flex items-start gap-3 sm:gap-4">
              {/* Icon */}
              <div className={`flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-2xl border ${edu.color} flex items-center justify-center text-xl sm:text-2xl`}>
                {edu.icon}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 sm:gap-4">
                  {/* Left: degree + school */}
                  <div className="min-w-0">
                    <h3 className="font-display text-sm sm:text-base md:text-lg font-bold text-text leading-tight mb-1">
                      {edu.degree}
                    </h3>
                    <div className="flex items-center gap-1.5 text-xs sm:text-sm text-muted">
                      <GraduationCap size={12} className="flex-shrink-0" />
                      <span className="truncate">{edu.school}</span>
                    </div>
                  </div>

                  {/* Right: grade + period + status */}
                  <div className="flex sm:flex-col items-center sm:items-end gap-2 sm:gap-1 flex-shrink-0 flex-wrap">
                    <div className={`font-display font-bold text-lg sm:text-xl ${edu.accent}`}>
                      {edu.grade}
                    </div>
                    <div className="flex items-center gap-1 text-xs text-muted">
                      <Calendar size={10} className="flex-shrink-0" />
                      {edu.period}
                    </div>
                    <div className="flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                      <CheckCircle2 size={10} />
                      {edu.status}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
