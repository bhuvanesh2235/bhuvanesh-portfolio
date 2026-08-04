// scripts/seed-project-virtual-courtroom.ts
// Adds the Virtual Online Courtroom project to the DB
// Run with: npx tsx scripts/seed-project-virtual-courtroom.ts

import { neon } from '@neondatabase/serverless';
import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL not set in .env.local');
}
const sql = neon(process.env.DATABASE_URL);

async function seed() {
  console.log('🌱 Adding Virtual Online Courtroom...');

  await sql`DELETE FROM projects WHERE slug = 'virtual-online-courtroom'`;

  await sql`
    INSERT INTO projects (
      slug, title, year, tagline, description,
      problem, approach, implementation, impact,
      tech_stack, tags, cover_image, images,
      demo_url, github_url, featured, sort_order
    ) VALUES (
      'virtual-online-courtroom',

      'Virtual Online Courtroom',

      2023,

      'Digitized judicial platform — Django web app, Android video conferencing & AI face-recognition deception detection.',

      'An end-to-end digitized courtroom system combining a Django web application for case management with an Android app (Courtup) for judge–user video conferencing. Recorded video calls are analyzed by an AI face-recognition model to predict deception, with results surfaced to the judge for informed judgment. Manages the full judicial lifecycle: user registration, case filing, file uploads, lawyer selection, and automated report generation with email delivery.',

      'Traditional courtroom proceedings are paper-heavy, location-dependent, and lack objective tools to assist judges. Remote hearings are conducted over generic video tools with no case management integration, no deception analysis, and no automated reporting — creating inefficiencies and access barriers for users in remote areas.',

      'Built a Django backend with MySQL handling five core modules: Users (registration/auth), Cases (case number, status, description), Uploads (case file storage to cloud drive), Reports (PDF generation + email to judge and user), and Lawyers (profile listing with specialization, experience, pricing). Built the Courtup Android app for judge–user video calls; recordings are passed to an AI face-recognition deception prediction model. Meeting IDs are generated via the web app and shared with participants. Node.js frontend connects to Django via Axios.',

      'Django REST backend manages all CRUD operations across 5 modules with MySQL persistence. Uploaded case files are stored in a separate cloud drive; Case IDs link uploads to their respective cases. The Reports module auto-generates case reports and emails them to both judge and user via Django email integration. The Courtup Android app handles video call setup using generated Meeting IDs; recorded sessions are analyzed frame-by-frame by the face-recognition AI model, and the deception prediction output is delivered to the judge before judgment.',

      'Delivered a fully integrated virtual courtroom platform: digitized case filing, cloud document management, lawyer selection, automated report dispatch, and AI-assisted judgment via deception detection from video evidence. Demonstrates cross-platform system design (web + Android), AI integration in legal tech, and end-to-end judicial workflow automation.',

      ARRAY['Python','Django','Node.js','Axios','MySQL','Android','Java','Face Recognition','AI/ML','TensorFlow','OpenCV','Video Conferencing','Cloud Storage','Email Integration'],

      ARRAY['Full-Stack','Python','Django','Android','AI/ML','Computer Vision','Face Recognition','Legal Tech','Mobile'],

      '/projects/virtual-courtroom.png',
      '{}',
      NULL,
      'https://github.com/bhuvanesh2235/Virtual-Online-Courtroom',
      true,
      9
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
