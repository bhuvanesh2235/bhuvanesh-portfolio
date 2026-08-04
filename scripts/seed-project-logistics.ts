// scripts/seed-project-logistics.ts
// Adds the Intelligent Logistics & E-Commerce Hub project to the DB
// Run with: npx tsx scripts/seed-project-logistics.ts

import { neon } from '@neondatabase/serverless';
import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL not set in .env.local');
}
const sql = neon(process.env.DATABASE_URL);

async function seed() {
  console.log('🌱 Adding Intelligent Logistics & E-Commerce Hub...');

  // Remove if it already exists (idempotent)
  await sql`DELETE FROM projects WHERE slug = 'intelligent-logistics-hub'`;

  await sql`
    INSERT INTO projects (
      slug, title, year, tagline, description,
      problem, approach, implementation, impact,
      tech_stack, tags, cover_image, images,
      demo_url, github_url, featured, sort_order
    ) VALUES (
      'intelligent-logistics-hub',

      'Intelligent Logistics & E-Commerce Hub',

      2026,

      'Enterprise-grade AI-powered logistics platform — LSTM forecasting, CNN damage detection, GIS tracking & microservices.',

      'A capstone internship project demonstrating enterprise software engineering at scale: a full-stack React + Spring Boot e-commerce platform integrated with an LSTM neural network for sales/shipment demand forecasting, a MobileNetV2 CNN for automated parcel damage detection, and a real-time GIS geospatial intelligence module — all containerized in a 5-service Docker Compose microservices architecture.',

      'Modern logistics operations suffer from poor demand visibility, manual cargo inspection errors, and lack of real-time geospatial intelligence. Traditional monolithic platforms cannot scale ML workloads alongside transactional systems, and testing coverage is often inadequate for mission-critical workflows.',

      'Designed a microservices architecture separating concerns across 5 Docker containers: React SPA, Spring Boot REST API (JWT + RBAC), MySQL, and twin Flask ML APIs for forecasting (:5001) and damage detection (:5002). Added a PostGIS spatial database for live GIS tracking with WebSocket real-time vehicle feeds. Built an LSTM (2-layer, 128→64 units) for time-series forecasting and a MobileNetV2 transfer-learning CNN for parcel classification.',

      'Built the React frontend with Redux Toolkit (11 slices) and Recharts dashboards. Implemented stateless JWT authentication with role-based Spring Security — USER and ADMIN roles enforced at API and frontend levels. Trained LSTM on 50,000 orders (1,461 daily rows, 10 engineered features) achieving MAE 4.21 / RMSE 5.41. Trained CNN on 800 package images (MobileNetV2 ImageNet pretrained) achieving 72.5% accuracy, ROC-AUC 0.80. Added 39 JUnit 5 + Mockito backend tests, Playwright E2E checkout tests, and Selenium admin UI automation. Deployed all services via Docker Compose with Nginx reverse proxy.',

      'Delivered a fully production-ready logistics platform: 39/39 backend tests passing, ~38 ms average API response time, 7/14/30-day demand forecasts, live vehicle tracking via PostGIS + WebSocket, and automated parcel damage classification with 97% confidence scoring. Demonstrated enterprise ML integration, secure API design, and multi-layer test coverage in a unified ecosystem.',

      ARRAY['React','Redux Toolkit','Spring Boot','Java','Spring Security','JWT','MySQL','PostgreSQL','PostGIS','TensorFlow','Keras','LSTM','MobileNetV2','Flask','Docker','Docker Compose','Nginx','JUnit 5','Mockito','Playwright','Selenium','Recharts','Vite','WebSocket','STOMP','SockJS','pandas','scikit-learn'],

      ARRAY['Full-Stack','AI/ML','Deep Learning','Computer Vision','Microservices','Docker','Java','Spring Boot','GIS','Enterprise'],

      '/projects/logistics-hub.png',
      '{}',
      NULL,
      'https://github.com/bhuvanesh2235/Intelligent-Logistics-E-Commerce-Hub',
      true,
      4
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
