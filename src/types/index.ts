// src/types/index.ts

export interface Project {
  id: string;
  slug: string;
  title: string;
  year: number | null;
  tagline: string | null;
  description: string | null;
  problem: string | null;
  approach: string | null;
  implementation: string | null;
  impact: string | null;
  tech_stack: string[];
  tags: string[];
  cover_image: string | null;
  images: string[];
  demo_url: string | null;
  github_url: string | null;
  featured: boolean;
  published: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  year: string;
  description: string | null;
  tags: string[];
  sort_order: number;
}

export interface Skill {
  id: string;
  category: string;
  name: string;
  icon_slug: string | null;
  sort_order: number;
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  year: number | null;
  url: string | null;
  sort_order: number;
}

export interface Achievement {
  id: string;
  platform: string | null;
  title: string;
  value: string | null;
  unit: string | null;
  description: string | null;
  type: 'stat' | 'award';
  sort_order: number;
}

