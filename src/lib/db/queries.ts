// src/lib/db/queries.ts
// Typed query helpers — all DB access goes through here

import { getDb } from './index';
import type {
  Project,
  Experience,
  Skill,
  Certification,
  Achievement,
} from '@/types';

// Helper to cast Neon results — neon returns Record<string,any>[] but TS union is too wide
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function rows<T>(r: any): T[] { return r as T[]; }
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function row<T>(r: any): T | null { return (r[0] as T) ?? null; }

// ── Projects ──────────────────────────────────────────────────

export async function getPublishedProjects(): Promise<Project[]> {
  const sql = getDb();
  const r = await sql`
    SELECT * FROM projects
    WHERE published = true
    ORDER BY year ASC, sort_order ASC, created_at DESC
  `;
  return rows<Project>(r);
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const sql = getDb();
  const r = await sql`
    SELECT * FROM projects WHERE slug = ${slug} AND published = true LIMIT 1
  `;
  return row<Project>(r);
}

// ── Experiences ───────────────────────────────────────────────

export async function getExperiences(): Promise<Experience[]> {
  const sql = getDb();
  const r = await sql`SELECT * FROM experiences ORDER BY year ASC, sort_order ASC`;
  return rows<Experience>(r);
}

// ── Skills ────────────────────────────────────────────────────

export async function getSkills(): Promise<Skill[]> {
  const sql = getDb();
  const r = await sql`SELECT * FROM skills ORDER BY category ASC, sort_order ASC`;
  return rows<Skill>(r);
}

export function groupSkillsByCategory(skills: Skill[]): Record<string, Skill[]> {
  return skills.reduce(
    (acc, skill) => {
      if (!acc[skill.category]) acc[skill.category] = [];
      acc[skill.category].push(skill);
      return acc;
    },
    {} as Record<string, Skill[]>
  );
}

// ── Certifications ────────────────────────────────────────────

export async function getCertifications(): Promise<Certification[]> {
  const sql = getDb();
  const r = await sql`SELECT * FROM certifications ORDER BY sort_order ASC`;
  return rows<Certification>(r);
}

// ── Achievements ──────────────────────────────────────────────

export async function getAchievements(): Promise<Achievement[]> {
  const sql = getDb();
  const r = await sql`SELECT * FROM achievements ORDER BY type ASC, sort_order ASC`;
  return rows<Achievement>(r);
}
