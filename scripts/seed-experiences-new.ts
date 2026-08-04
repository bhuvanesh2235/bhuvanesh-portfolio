// scripts/seed-experiences-new.ts
// Appends 5 new internships to the existing experiences table
// Run with: npx tsx scripts/seed-experiences-new.ts

import { neon } from '@neondatabase/serverless';
import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL not set in .env.local');
}
const sql = neon(process.env.DATABASE_URL);

async function seed() {
  console.log('🌱 Appending new internships...');

  // Remove only the new entries if re-running (idempotent)
  await sql`
    DELETE FROM experiences
    WHERE company IN (
      'Bahwan CyberTek',
      'OctaNet Services',
      'Isaii',
      'Synapslogic'
    )
  `;

  await sql`
    INSERT INTO experiences (company, role, year, description, tags, sort_order) VALUES

    (
      'Bahwan CyberTek',
      'Digital Engineering Intern',
      'Feb 2026 – Jun 2026',
      'Completed a 4-month enterprise internship at Bahwan CyberTek Pvt Ltd, working across a full engineering curriculum spanning React frontend, Java backend, QA & automation, ML engineering, deep learning (computer vision), Generative AI (multilingual RAG), GIS & geospatial systems, enterprise integration, and cloud & DevOps. Delivered multiple capstone modules including the Intelligent Logistics & E-Commerce Hub as the final project.',
      ARRAY['React','Java','Spring Boot','ML Engineering','Deep Learning','Generative AI','LangChain','GIS','Docker','Cloud','DevOps','QA','Automation'],
      4
    ),

    (
      'OctaNet Services',
      'Web Developer Intern',
      'Mar 2024 – Apr 2024',
      'Completed a 1-month web development internship at OctaNet Services Pvt Ltd, building and deploying web applications and strengthening frontend and backend development skills.',
      ARRAY['Web Development','HTML','CSS','JavaScript'],
      5
    ),

    (
      'Isaii',
      'Tech HR Intern',
      '2025',
      'Accomplished a Tech HR internship at Isaii, gaining hands-on experience in technical recruitment, candidate onboarding, and internship branding. Strengthened skills in candidate sourcing, screening, and talent engagement using LinkedIn and Unstop.',
      ARRAY['Technical Recruitment','Talent Acquisition','LinkedIn','Unstop','Candidate Screening','Onboarding'],
      6
    ),

    (
      'Synapslogic',
      'Tech HR Intern',
      '2025',
      'Accomplished a Tech HR internship at Synapslogic, gaining hands-on experience in technical recruitment, candidate onboarding, and internship branding. Strengthened skills in candidate sourcing, screening, and talent engagement using LinkedIn.',
      ARRAY['Technical Recruitment','Talent Acquisition','LinkedIn','Candidate Screening','Onboarding'],
      7
    ),

    (
      'Isaii',
      'Product Manager Intern',
      '2025',
      'Led end-to-end development of Alkarmah, a Dubai-based e-commerce app, managing a cross-functional team from concept to launch. Successfully launched on both Play Store & App Store within 4 months. Drove 100+ active users by enhancing user flow, multilingual support, and product UX.',
      ARRAY['Product Management','React Native','React','Node.js','MongoDB','Mobile','E-Commerce','Play Store','App Store','Multilingual'],
      8
    )
  `;

  const rows = await sql`SELECT company, role, year FROM experiences ORDER BY sort_order` as { company: string; role: string; year: string }[];
  console.log('\n✅ All experiences in DB:');
  rows.forEach((r) => console.log(`  • [${r.year}] ${r.company} — ${r.role}`));
  console.log('\n🎉 Done!');
  process.exit(0);
}

seed().catch((err) => {
  console.error('❌ Failed:', err);
  process.exit(1);
});
