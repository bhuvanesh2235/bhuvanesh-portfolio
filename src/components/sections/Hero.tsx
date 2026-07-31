'use client';

import dynamic from 'next/dynamic';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { ArrowDown, Download, Mail } from 'lucide-react';

// Dynamically import the R3F component to avoid SSR issues
const NeuralParticleField = dynamic(
  () => import('@/components/ui/NeuralParticleField').then((m) => m.NeuralParticleField),
  { ssr: false }
);

const ROLES = [
  'AI/ML Engineer',
  'Full-Stack Developer',
  'Computer Vision Specialist',
  'Deep Learning Researcher',
  'LLM Engineer',
];

export function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setRoleIndex((i) => (i + 1) % ROLES.length);
    }, 2800);
    return () => clearInterval(timer);
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Neural particle field background */}
      <NeuralParticleField />

      {/* Ambient glows */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-violet/5 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-cyan/5 blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-28 pb-20 w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left — Text */}
          <div>
            {/* Status pill */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-violet/30 bg-violet/8 text-violet text-xs font-medium mb-8"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-violet" />
              </span>
              Open to opportunities · Graduated on April 2026
            </motion.div>

            {/* Kinetic headline */}
            <motion.h1
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="font-display font-extrabold text-[clamp(3rem,8vw,6rem)] leading-[0.95] tracking-[-0.04em] mb-4"
            >
              <span className="block text-text">BHUVANESH</span>
              <span className="block gradient-text">K.</span>
            </motion.h1>

            {/* Animated role ticker */}
            <div className="h-10 overflow-hidden mb-6">
              <AnimatePresence mode="wait">
                <motion.p
                  key={roleIndex}
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: 0,  opacity: 1 }}
                  exit={{    y: -40, opacity: 0 }}
                  transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className="font-display text-xl md:text-2xl text-muted font-medium"
                >
                  {ROLES[roleIndex]}
                </motion.p>
              </AnimatePresence>
            </div>

            {/* One-liner */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-muted text-base md:text-lg leading-relaxed max-w-lg mb-10"
            >
              B.E. AI/ML student at Sri Eshwar College of Engineering, building
              intelligent systems at the intersection of deep learning, computer
              vision, and real-world software.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap gap-4"
            >
              <MagneticButton
                href="#projects"
                className="px-6 py-3 rounded-2xl bg-gradient-primary text-white font-semibold text-sm hover:shadow-glow-violet transition-all duration-300 gap-2"
              >
                View Projects
                <ArrowDown size={16} />
              </MagneticButton>

              <MagneticButton
                href="/Bhuvanesh_K_Resume.pdf"
                target="_blank"
                className="px-6 py-3 rounded-2xl border border-border bg-surface hover:border-violet/40 text-text font-semibold text-sm transition-all duration-300 gap-2"
              >
                <Download size={16} />
                Resume
              </MagneticButton>

              <MagneticButton
                href="mailto:bhuvaneshkalidasan2@gmail.com"
                className="px-6 py-3 rounded-2xl border border-border bg-surface hover:border-cyan/40 text-muted hover:text-text font-semibold text-sm transition-all duration-300 gap-2"
              >
                <Mail size={16} />
                Email Me
              </MagneticButton>
            </motion.div>

            {/* Stats strip */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex gap-8 mt-12 pt-8 border-t border-border"
            >
              {[
                { label: 'LeetCode',  value: '#1756', sub: 'Top 9.53%' },
                { label: 'Projects',  value: '3+',    sub: 'AI/ML apps' },
                { label: 'CGPA',      value: '8.4',   sub: 'out of 10' },
              ].map((s) => (
                <div key={s.label}>
                  <div className="font-display text-2xl font-bold gradient-text">{s.value}</div>
                  <div className="text-xs text-muted">{s.sub}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right — Photo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, x: 40 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="relative flex justify-center lg:justify-end"
          >
            {/* Decorative ring */}
            <div className="absolute inset-0 rounded-full bg-gradient-primary opacity-10 blur-2xl scale-90 animate-pulse-slow" />

            {/* Photo container */}
            <div className="relative">
              {/* Gradient border ring */}
              <div className="absolute -inset-1 rounded-3xl bg-gradient-primary opacity-60 blur-sm" />
              <div className="relative w-72 h-72 md:w-96 md:h-96 rounded-3xl overflow-hidden border-2 border-violet/20">
                <Image
                  src="/Bhuvanesh_K.jpg"
                  alt="Bhuvanesh K"
                  fill
                  priority
                  sizes="(max-width: 768px) 288px, 384px"
                  className="object-cover object-top"
                />
              </div>

              {/* Floating info card */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -bottom-4 -left-6 glass rounded-2xl px-4 py-3 border border-border"
              >
                <div className="text-xs text-muted">Currently at</div>
                <div className="font-display font-bold text-sm text-text">Sri Eshwar College</div>
                <div className="text-xs gradient-text">AI & ML • 2022–2026</div>
              </motion.div>
            </div>
          </motion.div>

        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted"
        >
          <span className="text-xs tracking-widest uppercase">Scroll</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-px h-8 bg-gradient-to-b from-violet to-transparent"
          />
        </motion.div>
      </div>
    </section>
  );
}
