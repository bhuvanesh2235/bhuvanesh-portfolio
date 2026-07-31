'use client';

import { motion } from 'framer-motion';
import { SectionHeading, SectionLabel } from '@/components/ui/SectionHeading';
import { Award, ExternalLink } from 'lucide-react';
import type { Certification } from '@/types';

interface Props {
  certifications: Certification[];
}

const ISSUER_COLORS: Record<string, string> = {
  'Coursera':      'text-blue-400',
  'Udemy':         'text-amber-400',
  'HackerRank':    'text-emerald-400',
  'Great Learning':'text-violet',
};

export function Certifications({ certifications }: Props) {
  return (
    <section id="certifications" className="section max-w-7xl mx-auto px-4 sm:px-6">
      <div className="mb-12">
        <SectionLabel>Credentials</SectionLabel>
        <SectionHeading>
          Verified <span className="gradient-text">certifications</span>
        </SectionHeading>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {certifications.map((cert, i) => (
          <motion.div
            key={cert.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="glass rounded-2xl p-5 border border-border hover:border-violet/30 transition-all duration-300 group flex flex-col"
          >
            <div className="flex items-start gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-violet/10 border border-violet/20 flex items-center justify-center flex-shrink-0 group-hover:bg-violet/20 transition-colors">
                <Award size={16} className="text-violet" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-text text-sm leading-snug group-hover:text-violet transition-colors line-clamp-2">
                  {cert.title}
                </h3>
              </div>
            </div>

            <div className="flex items-center justify-between mt-auto pt-3 border-t border-border">
              <div>
                <div className={`text-xs font-semibold ${ISSUER_COLORS[cert.issuer] ?? 'text-muted'}`}>
                  {cert.issuer}
                </div>
                {cert.year && (
                  <div className="text-xs text-muted/60 mt-0.5">{cert.year}</div>
                )}
              </div>
              {cert.url ? (
                <a
                  href={cert.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 rounded-lg border border-border text-muted hover:text-violet hover:border-violet/40 transition-colors"
                  aria-label="View certificate"
                >
                  <ExternalLink size={12} />
                </a>
              ) : (
                <div className="px-2 py-1 rounded-lg bg-surface2 text-xs text-muted">
                  Verified
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
