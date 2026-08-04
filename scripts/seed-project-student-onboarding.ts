// scripts/seed-project-student-onboarding.ts
// Adds the Student Onboarding System project to the DB
// Run with: npx tsx scripts/seed-project-student-onboarding.ts

import { neon } from '@neondatabase/serverless';
import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL not set in .env.local');
}
const sql = neon(process.env.DATABASE_URL);

async function seed() {
  console.log('🌱 Adding Student Onboarding System...');

  await sql`DELETE FROM projects WHERE slug = 'student-onboarding-system'`;

  await sql`
    INSERT INTO projects (
      slug, title, year, tagline, description,
      problem, approach, implementation, impact,
      tech_stack, tags, cover_image, images,
      demo_url, github_url, featured, sort_order
    ) VALUES (
      'student-onboarding-system',

      'Student Onboarding System',

      2025,

      'Full-stack automated student onboarding — Python data pipeline, Spring Boot API, React UI, BCrypt auth & Docker orchestration.',

      'A full-stack application that automates the complete student data lifecycle: synthetic data generation, validation, batch ingestion via REST API, persistent storage, and a React dashboard for CRUD management. Built with a Python data pipeline (Service A) and a Spring Boot backend (Service B), secured with BCrypt authentication, and fully containerized with Docker Compose. Includes Selenium + Playwright test automation suites for UI and E2E coverage.',

      'Educational institutions spend significant manual effort onboarding students — verifying records, handling invalid data, bulk-importing to databases, and managing access control. Doing this without automation leads to data errors, slow processing, and security vulnerabilities from unhashed passwords or unprotected routes.',

      'Designed a microservices architecture with clear separation: Python pipeline handles data generation, validation, and batch API submission with retry logic; Spring Boot backend exposes REST APIs (CRUD + bulk insert + pagination) with DTO validation; React frontend renders a protected dashboard with login/signup; PostgreSQL stores students and hashed user credentials. All services orchestrated via Docker Compose with Nginx reverse-proxying frontend → backend on /api/*.',

      'Python pipeline (pandas + requests + watchdog): generates synthetic students with deliberate invalid cases, validates email/name/age, splits valid/invalid CSVs, sends valid batches to backend with exponential retry. Spring Boot: JPA/Hibernate ORM, bulk insert endpoint, paginated GET, PUT/DELETE per student, /auth/signup and /auth/login with BCrypt password hashing, 409 duplicate and 401 invalid-credentials error handling. React: protected routes via localStorage session, student table with add/edit/delete, form validation, pagination. Selenium (Java + WebDriverManager) covers signup/login/logout/route-protection flows headlessly. Playwright (JS) runs 6 E2E tests: signup, login, error handling, redirect, logout.',

      'Delivered a fully automated student onboarding pipeline: end-to-end flow from CSV generation to authenticated React dashboard. Secure BCrypt auth with protected routes, batch ingestion with retry resilience, full CRUD with pagination, and two independent test automation suites. Demonstrates real-world full-stack integration across Data Engineering, Backend, Frontend, Auth, Testing, and DevOps in a single system.',

      ARRAY['Python','pandas','requests','watchdog','Spring Boot','Java','Spring Security','BCrypt','JPA','Hibernate','PostgreSQL','React','React Router','Axios','Nginx','Docker','Docker Compose','Selenium','WebDriverManager','Playwright','JWT','localStorage'],

      ARRAY['Full-Stack','Java','Spring Boot','Python','React','PostgreSQL','Docker','Authentication','Test Automation','Data Pipeline'],

      '/projects/student-onboarding.png',
      '{}',
      NULL,
      'https://github.com/bhuvanesh2235/Student-Onboarding-System',
      true,
      7
    )
  `;

  const rows = await sql`SELECT slug, title FROM projects ORDER BY sort_order` as { slug: string; title: string }[];
  console.log('\n✅ Projects in DB:');
  rows.forEach((r) => console.log(`  • [${r.slug}] ${r.title}`));
  console.log('\n🎉 Done!');
  process.exit(0);
}

seed().catch((err) => {
  console.error('❌ Failed:', err);
  process.exit(1);
});
