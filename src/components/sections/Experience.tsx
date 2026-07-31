'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { SectionHeading, SectionLabel } from '@/components/ui/SectionHeading';
import { Briefcase, Calendar, ChevronRight } from 'lucide-react';
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

function TimelineItem({ exp, index }: { exp: Experience; index: number }) {
  const isLeft = index % 2 === 0;
  return (
    <div className={`relative flex ${isLeft ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-start gap-8 lg:gap-0`}>
      {/* Card */}
      <motion.div
        initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.6, delay: index * 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
        className={`w-full lg:w-[calc(50%-2rem)] ${isLeft ? 'lg:mr-auto lg:pr-8' : 'lg:ml-auto lg:pl-8'}`}
      >
        <div className="glass rounded-2xl p-6 hover:border-violet/40 transition-colors duration-300 group">
          <div className="flex items-start justify-between mb-4">
            <div>
              <div className="flex items-center gap-2 text-xs text-muted mb-1">
                <Calendar size={11} />
                {exp.year}
              </div>
              <h3 className="font-display text-lg font-bold text-text group-hover:gradient-text transition-all">
                {exp.company}
              </h3>
              <p className="text-sm text-violet font-medium mt-0.5">{exp.role}</p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-violet/10 border border-violet/20 flex items-center justify-center flex-shrink-0">
              <Briefcase size={16} className="text-violet" />
            </div>
          </div>

          {exp.description && (
            <p className="text-sm text-muted leading-relaxed mb-4">{exp.description}</p>
          )}

          <div className="flex flex-wrap gap-1.5">
            {exp.tags.map((tag) => (
              <span key={tag} className="tag-pill">{tag}</span>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Center dot — desktop only */}
      <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-surface2 border-2 border-violet items-center justify-center z-10 top-6">
        <div className="w-2 h-2 rounded-full bg-violet" />
      </div>
    </div>
  );
}

export function Experience() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <section id="experience" className="section max-w-7xl mx-auto px-4 sm:px-6">
      <div className="mb-12 sm:mb-16 text-center">
        <SectionLabel>Work History</SectionLabel>
        <SectionHeading className="justify-center">
          Where I've <span className="gradient-text">built things</span>
        </SectionHeading>
      </div>

      <div ref={ref} className="relative">
        {/* Mobile vertical line */}
        <div className="lg:hidden absolute left-4 top-2 bottom-2 w-px bg-border">
          <motion.div
            style={{ height: lineHeight }}
            className="w-full bg-gradient-to-b from-violet to-cyan"
          />
        </div>

        {/* Animated timeline line — desktop only */}
        <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-border -translate-x-1/2">
          <motion.div
            style={{ height: lineHeight }}
            className="w-full bg-gradient-to-b from-violet to-cyan"
          />
        </div>

        <div className="flex flex-col gap-8 sm:gap-12 pl-8 lg:pl-0">
          {INTERNSHIPS.map((exp, i) => (
            <TimelineItem key={exp.id} exp={exp} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
