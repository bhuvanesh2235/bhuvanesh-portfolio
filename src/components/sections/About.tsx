'use client';

import { motion } from 'framer-motion';
import { SectionHeading, SectionLabel } from '@/components/ui/SectionHeading';
import { Code2, Brain, MapPin, GraduationCap, Trophy, Cpu } from 'lucide-react';

const BENTO_ITEMS = [
  {
    id: 'narrative',
    col: 'lg:col-span-7',
    row: 'lg:row-span-2',
    content: (
      <div className="flex flex-col h-full">
        <div className="flex items-center gap-2 mb-6">
          <div className="w-10 h-10 rounded-xl bg-violet/10 border border-violet/20 flex items-center justify-center">
            <Brain size={18} className="text-violet" />
          </div>
          <span className="text-sm text-muted font-medium">About Me</span>
        </div>
        <p className="text-text/90 text-base leading-relaxed mb-4">
          I'm <span className="gradient-text font-semibold">Bhuvanesh K</span>, a final-year B.E. student in 
          Artificial Intelligence & Machine Learning at Sri Eshwar College of Engineering, 
          graduating in 2026 with a CGPA of 8.4.
        </p>
        <p className="text-muted text-sm leading-relaxed mb-4">
          My work lives at the intersection of deep learning and real-world products. I've built 
          Android apps powered by on-device TensorFlow models, retail surveillance systems using 
          vision transformers, and GenAI pipelines with LangChain — all shipped as working products, 
          not just notebooks.
        </p>
        <p className="text-muted text-sm leading-relaxed">
          Off the keyboard, I'm a competitive programmer (LeetCode top 9.53% worldwide) and 
          hackathon finalist. I care deeply about writing code that's readable, extensible, and 
          actually solves the problem.
        </p>
      </div>
    ),
  },
  {
    id: 'location',
    col: 'lg:col-span-5',
    row: '',
    content: (
      <div className="flex flex-col h-full">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 rounded-xl bg-cyan/10 border border-cyan/20 flex items-center justify-center">
            <MapPin size={14} className="text-cyan" />
          </div>
          <span className="text-sm text-muted font-medium">Location</span>
        </div>
        <div className="font-display text-2xl font-bold text-text">Thoothukudi</div>
        <div className="text-muted text-sm mt-1">Tamil Nadu, India 🇮🇳</div>
        <div className="mt-auto pt-4">
          <div className="text-xs text-muted uppercase tracking-wider mb-2">Status</div>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Open to Work
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 'focus',
    col: 'lg:col-span-5',
    row: '',
    content: (
      <div className="flex flex-col h-full">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 rounded-xl bg-violet/10 border border-violet/20 flex items-center justify-center">
            <Cpu size={14} className="text-violet" />
          </div>
          <span className="text-sm text-muted font-medium">Core Focus</span>
        </div>
        <div className="flex flex-col gap-2 mt-2">
          {['Deep Learning', 'Computer Vision', 'LLMs & GenAI', 'Full-Stack Dev', 'Mobile (Android)'].map((f) => (
            <div key={f} className="flex items-center gap-2 text-sm text-muted">
              <div className="w-1.5 h-1.5 rounded-full bg-gradient-primary flex-shrink-0" />
              {f}
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'education',
    col: 'lg:col-span-4',
    row: '',
    content: (
      <div className="flex flex-col h-full">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
            <GraduationCap size={14} className="text-amber-400" />
          </div>
          <span className="text-sm text-muted font-medium">Education</span>
        </div>
        <div className="font-display font-bold text-3xl gradient-text">8.4</div>
        <div className="text-xs text-muted mt-1">CGPA through 8th semester</div>
        <div className="text-sm text-text/80 mt-3 leading-snug">B.E. AI & ML<br/>Sri Eshwar College</div>
        <div className="text-xs text-muted mt-1">2022 – 2026</div>
      </div>
    ),
  },
  {
    id: 'competitive',
    col: 'lg:col-span-8',
    row: '',
    content: (
      <div className="flex flex-col h-full">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center">
            <Trophy size={14} className="text-rose-400" />
          </div>
          <span className="text-sm text-muted font-medium">Competitive Programming</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
          {[
            { platform: 'LeetCode', value: '1756', desc: 'Top 9.53%' },
            { platform: 'CodeChef', value: '1010', desc: '2-star' },
            { platform: 'HackerRank', value: '5★', desc: 'C badge' },
          ].map((s) => (
            <div key={s.platform} className="text-center p-2 rounded-xl bg-surface/50 sm:bg-transparent">
              <div className="font-display text-xl sm:text-2xl font-bold gradient-text">{s.value}</div>
              <div className="text-xs text-muted mt-0.5">{s.platform}</div>
              <div className="text-xs text-muted/60">{s.desc}</div>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'stack',
    col: 'lg:col-span-5',
    row: '',
    content: (
      <div className="flex flex-col h-full">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 rounded-xl bg-violet/10 border border-violet/20 flex items-center justify-center">
            <Code2 size={14} className="text-violet" />
          </div>
          <span className="text-sm text-muted font-medium">Favourite Stack</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {['Python', 'TensorFlow', 'LangChain', 'Java', 'Next.js', 'Firebase'].map((t) => (
            <span key={t} className="tag-pill">{t}</span>
          ))}
        </div>
      </div>
    ),
  },
];

export function About() {
  return (
    <section id="about" className="section max-w-7xl mx-auto px-4 sm:px-6">
      <div className="mb-12">
        <SectionLabel>Who I Am</SectionLabel>
        <SectionHeading>
          Building at the edge of{' '}
          <span className="gradient-text">intelligence</span>
        </SectionHeading>
      </div>

      <div className="bento-grid">
        {BENTO_ITEMS.map((item, i) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className={`${item.col} ${item.row} glass rounded-2xl p-6 hover:border-violet/30 transition-colors duration-300`}
          >
            {item.content}
          </motion.div>
        ))}
      </div>
    </section>
  );
}
