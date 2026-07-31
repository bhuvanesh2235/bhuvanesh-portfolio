-- ============================================================
-- Bhuvanesh K Portfolio — Initial Database Schema
-- Run this in Neon SQL editor or via: psql $DATABASE_URL -f 001_init.sql
-- ============================================================

CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ── Projects ──────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS projects (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug           TEXT UNIQUE NOT NULL,
  title          TEXT NOT NULL,
  year           INTEGER,
  tagline        TEXT,
  description    TEXT,
  problem        TEXT,
  approach       TEXT,
  implementation TEXT,
  impact         TEXT,
  tech_stack     TEXT[]  NOT NULL DEFAULT '{}',
  tags           TEXT[]  NOT NULL DEFAULT '{}',
  cover_image    TEXT,
  images         TEXT[]  NOT NULL DEFAULT '{}',
  demo_url       TEXT,
  github_url     TEXT,
  featured       BOOLEAN NOT NULL DEFAULT false,
  published      BOOLEAN NOT NULL DEFAULT true,
  sort_order     INTEGER NOT NULL DEFAULT 0,
  created_at     TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at     TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ── Experiences ───────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS experiences (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company     TEXT NOT NULL,
  role        TEXT NOT NULL,
  year        TEXT NOT NULL,
  description TEXT,
  tags        TEXT[] NOT NULL DEFAULT '{}',
  sort_order  INTEGER NOT NULL DEFAULT 0
);

-- ── Skills ────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS skills (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category   TEXT NOT NULL,
  name       TEXT NOT NULL,
  icon_slug  TEXT,
  sort_order INTEGER NOT NULL DEFAULT 0
);

-- ── Certifications ────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS certifications (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title      TEXT NOT NULL,
  issuer     TEXT NOT NULL,
  year       INTEGER,
  url        TEXT,
  sort_order INTEGER NOT NULL DEFAULT 0
);

-- ── Achievements ──────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS achievements (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  platform    TEXT,
  title       TEXT NOT NULL,
  value       TEXT,
  unit        TEXT,
  description TEXT,
  type        TEXT NOT NULL DEFAULT 'stat' CHECK (type IN ('stat', 'award')),
  sort_order  INTEGER NOT NULL DEFAULT 0
);

-- ── Contact Messages ──────────────────────────────────────────
CREATE TABLE IF NOT EXISTS messages (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name       TEXT NOT NULL,
  email      TEXT NOT NULL,
  subject    TEXT,
  body       TEXT NOT NULL,
  read       BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ── Auto-update updated_at on projects ────────────────────────
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS projects_updated_at ON projects;
CREATE TRIGGER projects_updated_at
  BEFORE UPDATE ON projects
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ── Indexes ───────────────────────────────────────────────────
CREATE INDEX IF NOT EXISTS idx_projects_published ON projects(published);
CREATE INDEX IF NOT EXISTS idx_projects_featured  ON projects(featured);
CREATE INDEX IF NOT EXISTS idx_projects_slug      ON projects(slug);
CREATE INDEX IF NOT EXISTS idx_messages_read      ON messages(read);
