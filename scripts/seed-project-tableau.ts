// scripts/seed-project-tableau.ts
// Adds the Tableau Projects collection to the DB
// Run with: npx tsx scripts/seed-project-tableau.ts

import { neon } from '@neondatabase/serverless';
import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL not set in .env.local');
}
const sql = neon(process.env.DATABASE_URL);

async function seed() {
  console.log('🌱 Adding Tableau Projects...');

  await sql`DELETE FROM projects WHERE slug = 'tableau-dashboards'`;

  await sql`
    INSERT INTO projects (
      slug, title, year, tagline, description,
      problem, approach, implementation, impact,
      tech_stack, tags, cover_image, images,
      demo_url, github_url, featured, sort_order
    ) VALUES (
      'tableau-dashboards',

      'Tableau Dashboards Collection',

      2023,

      '5 Tableau dashboards — AirBnB geospatial analysis, video game sales, calculated fields, bins & multi-sheet joins.',

      'A collection of five Tableau dashboards built on real-world Kaggle datasets, progressing from fundamentals to advanced geospatial analysis. Projects span video game global sales (vgsales), store directory mapping (directory dataset), employee joins across demographic/salary/title sheets, and a capstone AirBnB dashboard analyzing 80+ listing fields across listings, reviews, and calendar data with geo-mapping, pricing trends, and review score breakdowns.',

      'Raw datasets from Kaggle contain patterns that are only discoverable through interactive visualization — regional sales dominance, price-per-bedroom trends, review score distributions, or salary disparities by job title. Spreadsheet analysis alone cannot surface these multi-dimensional insights for non-technical stakeholders.',

      'Built 5 dashboards of increasing complexity: Introduction to Tableau (basic charts with vgsales), Calculated Fields & Bins (custom measures and numeric grouping on vgsales), Visualizations (mixed chart types across vgsales and store directory), Joins (multi-sheet Excel joins linking Demographics, JobTitle, and Salary by EmployeeID), and the AirBnB Capstone (cross-sheet joins of listings, reviews, and calendar with geo maps, price heatmaps, and review score analysis).',

      'AirBnB dashboard: geo scatter map of listings by latitude/longitude, average price by zipcode bar chart, revenue-over-time line chart from calendar data, bedroom count vs. average price, and review score breakdowns (accuracy, cleanliness, communication, location, value). Joins dashboard: blended Demographics + JobTitle + Salary sheets on EmployeeID to show salary by job title and gender. vgsales dashboards: global vs. regional sales by platform and genre, calculated profit fields, binned sales ranges, and publisher ranking tables. Directory dashboard: store density map by country/state with ownership type filters.',

      'Produced 5 publication-quality interactive Tableau dashboards demonstrating the full analytics workflow — data connection, ETL via joins, calculated field creation, binning, and multi-chart layout design. The AirBnB capstone reveals actionable pricing and availability insights from 80+ fields across three data sources. Demonstrates proficiency in Tableau Desktop, data blending, geospatial visualization, and business storytelling.',

      ARRAY['Tableau','Data Visualization','Calculated Fields','Bins','Joins','Geospatial Mapping','Excel','CSV','Kaggle','Data Blending','Dashboard Design'],

      ARRAY['Data Analytics','Business Intelligence','Tableau','Visualization','Geospatial','Data Science'],

      '/projects/tableau-dashboards.png',
      '{}',
      NULL,
      'https://github.com/bhuvanesh2235/Tableau',
      false,
      11
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
