// src/app/projects/[slug]/page.tsx — Project case study page

import { notFound }   from 'next/navigation';
import Link           from 'next/link';
import Image          from 'next/image';
import type { Metadata } from 'next';
import { getProjectBySlug, getPublishedProjects } from '@/lib/db/queries';
import { Navbar }    from '@/components/layout/Navbar';
import { Footer }    from '@/components/layout/Footer';
import { ArrowLeft, ExternalLink, GitFork } from 'lucide-react';

interface Props {
  params: Promise<{ slug: string }>;
}

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project  = await getProjectBySlug(slug);
  if (!project) return { title: 'Project Not Found' };
  return {
    title: `${project.title} — Bhuvanesh K`,
    description: project.tagline ?? project.description ?? undefined,
  };
}

const SECTIONS = [
  { key: 'problem',        label: 'The Problem',       emoji: '🎯' },
  { key: 'approach',       label: 'Approach',          emoji: '🧭' },
  { key: 'implementation', label: 'Implementation',    emoji: '⚙️' },
  { key: 'impact',         label: 'Impact & Results',  emoji: '🚀' },
] as const;

export default async function ProjectPage({ params }: Props) {
  const { slug }  = await params;
  const project   = await getProjectBySlug(slug);
  if (!project) notFound();

  return (
    <>
      <Navbar />
      <main className="pt-24 sm:pt-28 pb-16 sm:pb-20 max-w-4xl mx-auto px-4 sm:px-6">

        {/* Back */}
        <Link
          href="/#projects"
          className="inline-flex items-center gap-2 text-muted hover:text-text text-sm mb-6 sm:mb-10 transition-colors"
        >
          <ArrowLeft size={14} />
          Back to Projects
        </Link>

        {/* Hero */}
        <div className="mb-8 sm:mb-10">
          <div className="flex flex-wrap gap-2 mb-4">
            {project.tags.map((tag) => (
              <span key={tag} className="tag-pill">{tag}</span>
            ))}
            {project.year && (
              <span className="px-3 py-1 rounded-full text-xs border border-border text-muted font-mono">
                {project.year}
              </span>
            )}
          </div>

          <h1 className="font-display text-3xl sm:text-4xl md:text-6xl font-extrabold tracking-tight mb-4 break-words">
            {project.title}
          </h1>

          {project.tagline && (
            <p className="text-base sm:text-xl text-muted leading-relaxed max-w-2xl">{project.tagline}</p>
          )}

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row flex-wrap gap-3 mt-6">
            {project.demo_url && (
              <a
                href={project.demo_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-primary text-white font-medium text-sm hover:shadow-glow-violet transition-all w-full sm:w-auto"
              >
                <ExternalLink size={14} />
                Live Demo
              </a>
            )}
            {project.github_url && (
              <a
                href={project.github_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border border-violet/30 bg-violet/10 text-text hover:text-white hover:border-violet/60 hover:bg-violet/20 hover:shadow-glow-violet font-medium text-sm transition-all duration-300 w-full sm:w-auto"
              >
                <GitFork size={15} className="text-violet" />
                View Code on GitHub
              </a>
            )}
          </div>
        </div>

        {/* Cover image */}
        {project.cover_image && (
          <div className="relative h-56 sm:h-72 md:h-96 rounded-2xl sm:rounded-3xl overflow-hidden mb-8 sm:mb-12 border border-border">
            <Image
              src={project.cover_image}
              alt={project.title}
              fill
              sizes="(max-width: 1200px) 100vw, 1200px"
              className="object-cover"
              priority
            />
          </div>
        )}

        {/* Description */}
        {project.description && (
          <div className="glass rounded-2xl p-5 sm:p-8 border border-border mb-6 sm:mb-8">
            <h2 className="font-display text-lg sm:text-xl font-bold text-text mb-3 sm:mb-4">Overview</h2>
            <p className="text-muted text-sm sm:text-base leading-relaxed">{project.description}</p>
          </div>
        )}

        {/* Case study sections */}
        <div className="flex flex-col gap-6">
          {SECTIONS.map(({ key, label, emoji }) => {
            const content = project[key as keyof typeof project] as string | null;
            if (!content) return null;
            return (
              <div key={key} className="glass rounded-2xl p-5 sm:p-8 border border-border hover:border-violet/30 transition-colors">
                <div className="flex items-center gap-3 mb-3 sm:mb-4">
                  <span className="text-xl sm:text-2xl">{emoji}</span>
                  <h2 className="font-display text-lg sm:text-xl font-bold gradient-text">{label}</h2>
                </div>
                <p className="text-muted text-sm sm:text-base leading-relaxed whitespace-pre-line">{content}</p>
              </div>
            );
          })}
        </div>

        {/* Tech stack */}
        {project.tech_stack.length > 0 && (
          <div className="mt-6 sm:mt-8 glass rounded-2xl p-5 sm:p-6 border border-border">
            <h2 className="font-display text-base sm:text-lg font-bold text-text mb-4">Tech Stack</h2>
            <div className="flex flex-wrap gap-2">
              {project.tech_stack.map((tech) => (
                <span key={tech} className="tag-pill">{tech}</span>
              ))}
            </div>
          </div>
        )}

      </main>
      <Footer />
    </>
  );
}
