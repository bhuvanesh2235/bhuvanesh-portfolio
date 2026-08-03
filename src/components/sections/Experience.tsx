'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { SectionHeading, SectionLabel } from '@/components/ui/SectionHeading';
import { Briefcase, Calendar } from 'lucide-react';
import type { Experience } from '@/types';

const INTERNSHIPS: Experience[] = [
  {
    id: '1',
    company: 'MOKSA.AI (USA)',
    role: 'AI/ML Intern',
    year: '2023',
    description:
      'Classified datasets and trained an annotation model for surveillance applications. Built a Python + Flutter GUI for a surveillance product integrating OpenCV, NLP, and deep learning pipelines.',
    tags: ['Python', 'Flutter', 'OpenCV', 'NLP', 'Deep Learning'],
    sort_order: 1,
  },
  {
    id: '2',
    company: 'GenAI Internship',
    role: 'Generative AI Intern',
    year: '2024',
    description:
      'Hands-on with prompt engineering and LangChain workflows. Explored Generative Adversarial Networks (GANs) and large language models (LLMs) for practical AI applications.',
    tags: ['LangChain', 'Prompt Engineering', 'GANs', 'LLMs'],
    sort_order: 2,
  },
  {
    id: '3',
    company: 'Infosys',
    role: 'ML/GenAI Intern',
    year: '2024',
    description:
      '"Risk Analysis for Home Credit Default" — built predictive models using ML, Deep Learning, and NLP to analyze credit-risk factors. Applied GenAI techniques to improve prediction accuracy.',
    tags: ['Machine Learning', 'Deep Learning', 'NLP', 'GenAI'],
    sort_order: 3,
  },
];

export function Experience() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <section id="experience" className="section max-w-7xl mx-auto px-4 sm:px-6">
      <div className="mb-10 sm:mb-16 text-center">
        <SectionLabel>Work History</SectionLabel>
        <SectionHeading className="justify-center">
          Where I've <span className="gradient-text">built things</span>
        </SectionHeading>
      </div>

      <div ref={ref} className="relative max-w-3xl mx-auto">
        {/* Vertical timeline line */}
        <div className="absolute left-4 sm:left-5 top-2 bottom-2 w-px bg-border">
          <motion.div
            style={{ height: lineHeight }}
            className="w-full bg-gradient-to-b from-violet to-cyan"
          />
        </div>

        <div className="flex flex-col gap-6 sm:gap-10 pl-12 sm:pl-16">
          {INTERNSHIPS.map((exp, i) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.12, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="relative"
            >
              {/* Timeline dot */}
              <div className="absolute -left-12 sm:-left-16 top-5 sm:top-6 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-surface2 border-2 border-violet flex items-center justify-center z-10">
                <Briefcase size={13} className="text-violet" />
              </div>

              <div className="glass rounded-2xl p-4 sm:p-6 hover:border-violet/40 transition-colors duration-300 group">
                {/* Header */}
                <div className="flex items-start justify-between gap-3 mb-3 sm:mb-4">
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5 text-xs text-muted mb-1">
                      <Calendar size={10} className="flex-shrink-0" />
                      {exp.year}
                    </div>
                    <h3 className="font-display text-base sm:text-lg font-bold text-text group-hover:gradient-text transition-all leading-tight">
                      {exp.company}
                    </h3>
                    <p className="text-xs sm:text-sm text-violet font-medium mt-0.5">{exp.role}</p>
                  </div>
                </div>

                {exp.description && (
                  <p className="text-xs sm:text-sm text-muted leading-relaxed mb-3 sm:mb-4">{exp.description}</p>
                )}

                <div className="flex flex-wrap gap-1.5">
                  {exp.tags.map((tag) => (
                    <span key={tag} className="tag-pill">{tag}</span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
