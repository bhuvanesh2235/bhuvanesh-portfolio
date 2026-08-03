'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ExternalLink, GitFork, ArrowRight } from 'lucide-react';
import type { Project } from '@/types';
import { cn } from '@/lib/utils';

interface Props {
  project: Project;
  index: number;
}

export function ProjectCard({ project, index }: Props) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.article
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative rounded-2xl overflow-hidden border border-border bg-surface transition-all duration-300 hover:border-violet/40 hover:shadow-glow-violet flex flex-col"
    >
      {/* Cover image / gradient placeholder */}
      <div className="relative aspect-video overflow-hidden bg-surface2">
        {project.cover_image ? (
          <Image
            src={project.cover_image}
            alt={project.title}
            fill
            priority={index < 2}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className={cn(
              'object-cover object-top transition-transform duration-700',
              hovered ? 'scale-105' : 'scale-100'
            )}
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-violet/20 via-transparent to-cyan/20 flex items-center justify-center">
            <span className="font-display text-5xl font-bold gradient-text opacity-30 select-none">
              {project.title.charAt(0)}
            </span>
          </div>
        )}

        {/* Hover overlay */}
        <div
          className={cn(
            'absolute inset-0 bg-black/60 flex items-center justify-center gap-4 transition-opacity duration-300',
            hovered ? 'opacity-100' : 'opacity-0'
          )}
        >
          <Link
            href={`/projects/${project.slug}`}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-violet text-white text-sm font-medium hover:bg-violet/80 transition-colors"
          >
            View Case Study <ArrowRight size={14} />
          </Link>
        </div>

        {/* Year badge */}
        {project.year && (
          <div className="absolute top-3 left-3 px-2 py-1 rounded-lg glass text-xs text-muted font-mono">
            {project.year}
          </div>
        )}

        {/* Featured badge */}
        {project.featured && (
          <div className="absolute top-3 right-3 px-2 py-1 rounded-lg bg-violet/20 border border-violet/30 text-xs text-violet font-medium">
            Featured
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5">
        <h3 className="font-display text-lg font-bold text-text mb-2 group-hover:gradient-text transition-all">
          {project.title}
        </h3>

        {project.tagline && (
          <p className="text-sm text-muted mb-4 line-clamp-2 flex-1">
            {project.tagline}
          </p>
        )}

        {/* Tech stack */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.tech_stack.slice(0, 5).map((tech) => (
            <span key={tech} className="tag-pill">
              {tech}
            </span>
          ))}
          {project.tech_stack.length > 5 && (
            <span className="tag-pill bg-surface2 border-border text-muted">
              +{project.tech_stack.length - 5}
            </span>
          )}
        </div>

        {/* Links row */}
        <div className="flex items-center gap-3 pt-4 border-t border-border">
          <Link
            href={`/projects/${project.slug}`}
            className="flex-1 text-center py-2 rounded-xl text-sm font-medium bg-gradient-subtle hover:bg-violet/20 text-violet transition-colors"
          >
            Case Study
          </Link>
          {project.demo_url && (
            <a
              href={project.demo_url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-xl border border-border text-muted hover:text-text hover:border-violet/40 transition-colors"
              aria-label="Live demo"
            >
              <ExternalLink size={14} />
            </a>
          )}
          {project.github_url && (
            <a
              href={project.github_url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-border text-xs font-medium text-muted hover:text-text hover:border-violet/40 hover:bg-violet/10 transition-all duration-200"
              aria-label="GitHub repository"
              title="View Source Code on GitHub"
            >
              <GitFork size={13} className="text-violet" />
              <span>GitHub</span>
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
}
