// scripts/migrate.ts
// Runs 001_init.sql against the Neon database

import { neon } from '@neondatabase/serverless';
import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

if (!process.env.DATABASE_URL) throw new Error('DATABASE_URL not set');

const sql = neon(process.env.DATABASE_URL);

async function migrate() {
  console.log('🗄️  Running migration...');

  // Create pgcrypto extension
  await sql`CREATE EXTENSION IF NOT EXISTS "pgcrypto"`;

  // Projects table
  await sql`
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
    )
  `;
  console.log('  ✓ projects');

  // Experiences table
  await sql`
    CREATE TABLE IF NOT EXISTS experiences (
      id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      company     TEXT NOT NULL,
      role        TEXT NOT NULL,
      year        TEXT NOT NULL,
      description TEXT,
      tags        TEXT[] NOT NULL DEFAULT '{}',
      sort_order  INTEGER NOT NULL DEFAULT 0
    )
  `;
  console.log('  ✓ experiences');

  // Skills table
  await sql`
    CREATE TABLE IF NOT EXISTS skills (
      id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      category   TEXT NOT NULL,
      name       TEXT NOT NULL,
      icon_slug  TEXT,
      sort_order INTEGER NOT NULL DEFAULT 0
    )
  `;
  console.log('  ✓ skills');

  // Certifications table
  await sql`
    CREATE TABLE IF NOT EXISTS certifications (
      id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      title      TEXT NOT NULL,
      issuer     TEXT NOT NULL,
      year       INTEGER,
      url        TEXT,
      sort_order INTEGER NOT NULL DEFAULT 0
    )
  `;
  console.log('  ✓ certifications');

  // Achievements table
  await sql`
    CREATE TABLE IF NOT EXISTS achievements (
      id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      platform    TEXT,
      title       TEXT NOT NULL,
      value       TEXT,
      unit        TEXT,
      description TEXT,
      type        TEXT NOT NULL DEFAULT 'stat' CHECK (type IN ('stat', 'award')),
      sort_order  INTEGER NOT NULL DEFAULT 0
    )
  `;
  console.log('  ✓ achievements');

  // Messages table
  await sql`
    CREATE TABLE IF NOT EXISTS messages (
      id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      name       TEXT NOT NULL,
      email      TEXT NOT NULL,
      subject    TEXT,
      body       TEXT NOT NULL,
      read       BOOLEAN NOT NULL DEFAULT false,
      created_at TIMESTAMPTZ NOT NULL DEFAULT now()
    )
  `;
  console.log('  ✓ messages');

  // Auto-update trigger
  await sql`
    CREATE OR REPLACE FUNCTION update_updated_at()
    RETURNS TRIGGER AS $$
    BEGIN
      NEW.updated_at = now();
      RETURN NEW;
    END;
    $$ LANGUAGE plpgsql
  `;
  await sql`DROP TRIGGER IF EXISTS projects_updated_at ON projects`;
  await sql`
    CREATE TRIGGER projects_updated_at
      BEFORE UPDATE ON projects
      FOR EACH ROW EXECUTE FUNCTION update_updated_at()
  `;
  console.log('  ✓ triggers');

  // Indexes
  await sql`CREATE INDEX IF NOT EXISTS idx_projects_published ON projects(published)`;
  await sql`CREATE INDEX IF NOT EXISTS idx_projects_featured  ON projects(featured)`;
  await sql`CREATE INDEX IF NOT EXISTS idx_projects_slug      ON projects(slug)`;
  await sql`CREATE INDEX IF NOT EXISTS idx_messages_read      ON messages(read)`;
  console.log('  ✓ indexes');

  console.log('\n✅ Migration complete!');
}

migrate().catch((err) => {
  console.error('❌ Migration failed:', err);
  process.exit(1);
});
