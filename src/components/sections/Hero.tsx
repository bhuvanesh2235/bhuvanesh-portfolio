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
    /*
     * KEY FIX:
     * – NO overflow-hidden / overflow-x-hidden on this element
     *   (overflow-x:hidden forces overflow-y:auto which clips content)
     * – On mobile: section is just as tall as its content (no min-h-screen)
     * – On lg+: min-h-screen with vertical centering
     * – Background glow wrapper uses overflow-hidden instead (it's decorative only)
     */
    <section id="hero" className="relative lg:min-h-screen lg:flex lg:flex-col lg:justify-center">
      {/* Background layer — overflow-hidden lives here, not on the section */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <NeuralParticleField />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-violet/5 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-cyan/5 blur-3xl" />
      </div>

      {/* ── Content ─────────────────────────────────────────────── */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 w-full pt-20 sm:pt-24 lg:pt-28 pb-10 sm:pb-14 lg:pb-20">
        <div className="grid lg:grid-cols-2 gap-6 lg:gap-16 items-center">

          {/* ── Left — Text ───────────────────────────────────────── */}
          <div className="flex flex-col">

            {/* Mobile header row: small avatar + status pill */}
            <div className="flex items-center gap-3 mb-4 sm:mb-6 lg:hidden">
              <div className="relative flex-shrink-0">
                <div className="absolute -inset-0.5 rounded-xl bg-gradient-primary opacity-70 blur-[2px]" />
                <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-xl overflow-hidden border border-violet/30">
                  <Image
                    src="/Bhuvanesh_K.jpg"
                    alt="Bhuvanesh K"
                    fill
                    priority
                    sizes="64px"
                    className="object-cover object-top"
                  />
                </div>
              </div>

              <motion.div
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-violet/30 bg-violet/10 text-violet text-[11px] sm:text-xs font-medium"
              >
                <span className="relative flex h-1.5 w-1.5 flex-shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet opacity-75" />
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-violet" />
                </span>
                Open to opportunities
              </motion.div>
            </div>

            {/* Desktop status pill */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="hidden lg:inline-flex self-start items-center gap-2 px-4 py-2 rounded-full border border-violet/30 bg-violet/10 text-violet text-xs font-medium mb-8"
            >
              <span className="relative flex h-2 w-2 flex-shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-violet" />
              </span>
              Open to opportunities · Graduated April 2026
            </motion.div>

            {/* ── Headline ── */}
            <motion.h1
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="font-display font-extrabold tracking-tight leading-[1.0] mb-2 sm:mb-3"
              style={{ fontSize: 'clamp(2.4rem, 10vw, 5.5rem)' }}
            >
              <span className="block text-text">BHUVANESH</span>
              <span className="block gradient-text">K.</span>
            </motion.h1>

            {/* ── Role ticker ── */}
            <div className="h-7 sm:h-9 overflow-hidden mb-3 sm:mb-5">
              <AnimatePresence mode="wait">
                <motion.p
                  key={roleIndex}
                  initial={{ y: 28, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -28, opacity: 0 }}
                  transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className="font-display text-sm sm:text-lg md:text-2xl text-muted font-medium"
                >
                  {ROLES[roleIndex]}
                </motion.p>
              </AnimatePresence>
            </div>

            {/* ── Description ── */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="text-muted text-xs sm:text-sm md:text-base leading-relaxed max-w-lg mb-5 sm:mb-7"
            >
              B.E. AI/ML graduate at Sri Eshwar College of Engineering, building
              intelligent systems at the intersection of deep learning, computer
              vision, and real-world software.
            </motion.p>

            {/* ── CTA Buttons ── */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="flex flex-col sm:flex-row gap-2.5 sm:gap-3 mb-6 sm:mb-8"
            >
              <MagneticButton
                href="#projects"
                className="flex items-center justify-center gap-2 px-5 py-2.5 sm:py-3 rounded-2xl bg-gradient-primary text-white font-semibold text-sm hover:shadow-glow-violet transition-all duration-300"
              >
                View Projects <ArrowDown size={14} />
              </MagneticButton>

              <MagneticButton
                href="/Bhuvanesh_K_Resume.pdf"
                target="_blank"
                className="flex items-center justify-center gap-2 px-5 py-2.5 sm:py-3 rounded-2xl border border-border bg-surface hover:border-violet/40 text-text font-semibold text-sm transition-all duration-300"
              >
                <Download size={14} /> Resume
              </MagneticButton>

              <MagneticButton
                href="mailto:bhuvaneshkalidasan2@gmail.com"
                className="flex items-center justify-center gap-2 px-5 py-2.5 sm:py-3 rounded-2xl border border-border bg-surface hover:border-cyan/40 text-muted hover:text-text font-semibold text-sm transition-all duration-300"
              >
                <Mail size={14} /> Email Me
              </MagneticButton>
            </motion.div>

            {/* ── Stats strip ── */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="grid grid-cols-3 gap-4 sm:gap-8 pt-4 sm:pt-6 border-t border-border"
            >
              {[
                { value: '#1756', sub: 'Top 9.53%',  label: 'LeetCode' },
                { value: '3+',   sub: 'AI/ML apps', label: 'Projects' },
                { value: '8.4',  sub: 'out of 10',  label: 'CGPA' },
              ].map((s) => (
                <div key={s.label}>
                  <div className="font-display text-lg sm:text-2xl font-bold gradient-text">{s.value}</div>
                  <div className="text-[10px] sm:text-xs text-muted mt-0.5">{s.sub}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* ── Right — Photo (desktop only) ──────────────────────── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, x: 40 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="hidden lg:flex justify-end relative"
          >
            <div className="relative">
              <div className="absolute -inset-1 rounded-3xl bg-gradient-primary opacity-60 blur-sm" />
              <div className="relative w-80 xl:w-96 h-80 xl:h-96 rounded-3xl overflow-hidden border-2 border-violet/20">
                <Image
                  src="/Bhuvanesh_K.jpg"
                  alt="Bhuvanesh K"
                  fill
                  priority
                  sizes="(max-width: 1280px) 320px, 384px"
                  className="object-cover object-top"
                />
              </div>

              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -bottom-3 -left-6 glass rounded-2xl px-4 py-3 border border-border shadow-lg"
              >
                <div className="text-[11px] text-muted">Currently at</div>
                <div className="font-display font-bold text-sm text-text">Sri Eshwar College</div>
                <div className="text-[11px] gradient-text">AI &amp; ML • 2022–2026</div>
              </motion.div>
            </div>
          </motion.div>

        </div>
      </div>

      {/* Scroll indicator — desktop only to avoid taking extra space on mobile */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="hidden lg:flex absolute bottom-8 left-1/2 -translate-x-1/2 flex-col items-center gap-2 text-muted"
      >
        <span className="text-[10px] tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-px h-7 bg-gradient-to-b from-violet to-transparent"
        />
      </motion.div>
    </section>
  );
}
