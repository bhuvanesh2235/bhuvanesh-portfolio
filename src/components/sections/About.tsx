'use client';

import { motion } from 'framer-motion';
import { SectionHeading, SectionLabel } from '@/components/ui/SectionHeading';
import { Code2, Brain, MapPin, GraduationCap, Trophy, Cpu } from 'lucide-react';

export function About() {
  return (
    <section id="about" className="section max-w-7xl mx-auto px-4 sm:px-6">
      <div className="mb-8 sm:mb-12">
        <SectionLabel>Who I Am</SectionLabel>
        <SectionHeading>
          Building at the edge of{' '}
          <span className="gradient-text">intelligence</span>
        </SectionHeading>
      </div>

      {/* Mobile & Tablet: stacked cards / Desktop: bento grid */}
      <div className="flex flex-col gap-3.5 lg:grid lg:grid-cols-12 lg:gap-4">

        {/* Narrative — full width mobile, col-span-7 desktop */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5, delay: 0 }}
          className="lg:col-span-7 lg:row-span-2 glass rounded-2xl p-5 sm:p-6 hover:border-violet/30 transition-colors duration-300"
        >
          <div className="flex flex-col h-full">
            <div className="flex items-center gap-2 mb-4 sm:mb-6">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-violet/10 border border-violet/20 flex items-center justify-center flex-shrink-0">
                <Brain size={16} className="text-violet" />
              </div>
              <span className="text-sm text-muted font-medium">About Me</span>
            </div>
            <p className="text-text/90 text-sm sm:text-base leading-relaxed mb-3 sm:mb-4">
              I'm <span className="gradient-text font-semibold">Bhuvanesh K</span>, a B.E. graduate in
              Artificial Intelligence &amp; Machine Learning from Sri Eshwar College of Engineering,
              with a CGPA of 8.4.
            </p>
            <p className="text-muted text-sm leading-relaxed mb-3 sm:mb-4">
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
        </motion.div>

        {/* Location + Focus — 2 cols on sm, stacked on mobile */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-none lg:col-span-5 lg:contents gap-3.5 lg:gap-0">

          {/* Location */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, delay: 0.08 }}
            className="lg:col-span-5 glass rounded-2xl p-4 sm:p-5 hover:border-violet/30 transition-colors duration-300"
          >
            <div className="flex flex-col h-full">
              <div className="flex items-center gap-2 mb-3 sm:mb-4">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-cyan/10 border border-cyan/20 flex items-center justify-center">
                  <MapPin size={13} className="text-cyan" />
                </div>
                <span className="text-xs sm:text-sm text-muted font-medium">Location</span>
              </div>
              <div className="font-display text-lg sm:text-2xl font-bold text-text">Thoothukudi</div>
              <div className="text-muted text-xs sm:text-sm mt-1">Tamil Nadu, India 🇮🇳</div>
              <div className="mt-3 sm:mt-auto sm:pt-4">
                <div className="text-[10px] sm:text-xs text-muted uppercase tracking-wider mb-1.5 sm:mb-2">Status</div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] sm:text-xs font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse flex-shrink-0" />
                  Open to Work
                </div>
              </div>
            </div>
          </motion.div>

          {/* Core Focus */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, delay: 0.16 }}
            className="lg:col-span-5 glass rounded-2xl p-4 sm:p-5 hover:border-violet/30 transition-colors duration-300"
          >
            <div className="flex flex-col h-full">
              <div className="flex items-center gap-2 mb-3 sm:mb-4">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-violet/10 border border-violet/20 flex items-center justify-center">
                  <Cpu size={13} className="text-violet" />
                </div>
                <span className="text-xs sm:text-sm text-muted font-medium">Core Focus</span>
              </div>
              <div className="flex flex-col gap-1.5 sm:gap-2">
                {['Deep Learning', 'Computer Vision', 'LLMs & GenAI', 'Full-Stack Dev', 'Mobile (Android)'].map((f) => (
                  <div key={f} className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-muted">
                    <div className="w-1.5 h-1.5 rounded-full bg-gradient-primary flex-shrink-0" />
                    {f}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Education + Competitive — 2 cols on sm */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-none lg:col-span-12 lg:contents gap-3.5 lg:gap-0">

          {/* Education */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, delay: 0.24 }}
            className="lg:col-span-4 glass rounded-2xl p-4 sm:p-5 hover:border-violet/30 transition-colors duration-300"
          >
            <div className="flex flex-col h-full">
              <div className="flex items-center gap-2 mb-3 sm:mb-4">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
                  <GraduationCap size={13} className="text-amber-400" />
                </div>
                <span className="text-xs sm:text-sm text-muted font-medium">Education</span>
              </div>
              <div className="font-display font-bold text-2xl sm:text-3xl gradient-text">8.4</div>
              <div className="text-xs text-muted mt-1">CGPA through 8th semester</div>
              <div className="text-sm text-text/80 mt-2 sm:mt-3 leading-snug">B.E. AI &amp; ML<br/>Sri Eshwar College</div>
              <div className="text-xs text-muted mt-1">2022 – 2026</div>
            </div>
          </motion.div>

          {/* Competitive Programming */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, delay: 0.32 }}
            className="lg:col-span-8 glass rounded-2xl p-4 sm:p-5 hover:border-violet/30 transition-colors duration-300"
          >
            <div className="flex flex-col h-full">
              <div className="flex items-center gap-2 mb-3 sm:mb-4">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center">
                  <Trophy size={13} className="text-rose-400" />
                </div>
                <span className="text-xs sm:text-sm text-muted font-medium">Competitive Programming</span>
              </div>
              <div className="grid grid-cols-3 gap-2 sm:gap-4">
                {[
                  { platform: 'LeetCode', value: '1756', desc: 'Top 9.53%' },
                  { platform: 'CodeChef', value: '1010', desc: '2-star' },
                  { platform: 'HackerRank', value: '5★', desc: 'C badge' },
                ].map((s) => (
                  <div key={s.platform} className="text-center p-2 rounded-xl bg-surface/50">
                    <div className="font-display text-lg sm:text-2xl font-bold gradient-text">{s.value}</div>
                    <div className="text-[10px] sm:text-xs text-muted mt-0.5 leading-tight">{s.platform}</div>
                    <div className="text-[10px] text-muted/60 hidden sm:block">{s.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Favourite Stack */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="lg:col-span-12 glass rounded-2xl p-4 sm:p-5 hover:border-violet/30 transition-colors duration-300"
          >
            <div className="flex items-center gap-2 mb-3 sm:mb-4">
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-violet/10 border border-violet/20 flex items-center justify-center">
                <Code2 size={13} className="text-violet" />
              </div>
              <span className="text-xs sm:text-sm text-muted font-medium">Favourite Stack</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {['Python', 'TensorFlow', 'LangChain', 'Java', 'Next.js', 'Firebase', 'OpenCV', 'PyTorch'].map((t) => (
                <span key={t} className="tag-pill">{t}</span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
