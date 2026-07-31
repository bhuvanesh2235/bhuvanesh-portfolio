'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionHeading, SectionLabel } from '@/components/ui/SectionHeading';
import { ProjectCard } from '@/components/ui/ProjectCard';
import type { Project } from '@/types';

interface Props {
  projects: Project[];
}

export function Projects({ projects }: Props) {
  const [activeTag, setActiveTag] = useState<string>('All');

  // Derive unique tags from all projects
  const allTags = useMemo(() => {
    const tagSet = new Set<string>(['All']);
    projects.forEach((p) => p.tags.forEach((t) => tagSet.add(t)));
    return Array.from(tagSet);
  }, [projects]);

  const filtered = useMemo(() => {
    if (activeTag === 'All') return projects;
    return projects.filter((p) => p.tags.includes(activeTag));
  }, [projects, activeTag]);

  return (
    <section id="projects" className="section max-w-7xl mx-auto px-4 sm:px-6">
      <div className="mb-8 sm:mb-12">
        <SectionLabel>What I've Built</SectionLabel>
        <SectionHeading>
          Projects that <span className="gradient-text">ship</span>
        </SectionHeading>
        <p className="mt-3 sm:mt-4 text-muted text-sm sm:text-base max-w-xl">
          Every project here is a complete, working product — not a tutorial clone.
          Each one solves a real problem with real ML/AI at its core.
        </p>
      </div>

      {/* Tag filters */}
      <div className="flex flex-wrap gap-2 mb-8 sm:mb-10 overflow-x-auto pb-2 sm:pb-0 scrollbar-none">
        {allTags.map((tag) => (
          <button
            key={tag}
            onClick={() => setActiveTag(tag)}
            className={`px-3.5 py-1.5 sm:px-4 sm:py-1.5 rounded-full text-xs font-medium border transition-all duration-200 flex-shrink-0 ${
              activeTag === tag
                ? 'bg-violet border-violet text-white shadow-glow-violet'
                : 'border-border text-muted hover:border-violet/40 hover:text-text'
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Project grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTag}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filtered.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </motion.div>
      </AnimatePresence>

      {filtered.length === 0 && (
        <div className="text-center py-20 text-muted">
          No projects found for &ldquo;{activeTag}&rdquo;.
        </div>
      )}

      {/* More projects CTA */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="mt-12 text-center"
      >
        <p className="text-muted text-sm">
          More projects coming soon.{' '}
          <a href="#contact" className="text-violet animated-underline">
            Reach out
          </a>{' '}
          if you'd like to collaborate.
        </p>
      </motion.div>
    </section>
  );
}
