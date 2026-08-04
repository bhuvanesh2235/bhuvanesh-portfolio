// scripts/seed-project-powerbi.ts
// Adds the Power BI Projects collection to the DB
// Run with: npx tsx scripts/seed-project-powerbi.ts

import { neon } from '@neondatabase/serverless';
import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL not set in .env.local');
}
const sql = neon(process.env.DATABASE_URL);

async function seed() {
  console.log('🌱 Adding Power BI Projects...');

  await sql`DELETE FROM projects WHERE slug = 'power-bi-dashboards'`;

  await sql`
    INSERT INTO projects (
      slug, title, year, tagline, description,
      problem, approach, implementation, impact,
      tech_stack, tags, cover_image, images,
      demo_url, github_url, featured, sort_order
    ) VALUES (
      'power-bi-dashboards',

      'Power BI Dashboards Collection',

      2023,

      '8 interactive Power BI dashboards — DAX, drill-throughs, conditional formatting & data professional survey analysis.',

      'A collection of eight Power BI dashboards built using real-world survey datasets. Covers the full breadth of Power BI capabilities: beginner chart composition, bins and lists, conditional formatting, DAX calculated measures, drill-through navigation, Power Query transformations, and advanced visualizations. The capstone project features a comprehensive Data Professional Survey dashboard analyzing salary, job satisfaction, programming language preferences, and career transition trends across the data industry.',

      'Raw survey and retail datasets contain hidden patterns that are invisible in spreadsheet form — salary disparities by role, purchasing trends by region, product revenue vs. cost margins. Without interactive dashboards and calculated measures, these insights remain inaccessible to decision-makers.',

      'Designed 8 progressive Power BI reports of increasing complexity across two datasets: (1) Apocalypse Food Prep — a retail store dataset with buyer demographics, product pricing, revenue, and geo data used for 7 technique-focused dashboards; (2) Data Professional Survey — a rich multi-variable survey used for the capstone dashboard covering salary, satisfaction metrics, difficulty breaking into data, and preferred tools. Applied DAX for calculated columns and measures, Power Query for ETL, and drill-throughs for hierarchical exploration.',

      'Beginner dashboard: bar/pie charts and KPI cards. Bins & Lists: dynamic grouping of numeric ranges. Conditional Formatting: color-coded cells by threshold rules. DAX: custom measures (average salary, revenue margins, YoY growth). Drill Power BI: drill-through pages linking summary → detail. Power BI Queries: M-language transformations in Power Query Editor. Visualizations: mixed chart types, slicers, maps. End Project (Data Professional Survey): salary by role/country, job satisfaction radar, programming language bar, career-switch donut, difficulty gauge — all with cross-filtering slicers.',

      'Produced 8 fully interactive, publication-quality dashboards demonstrating mastery of the entire Power BI toolchain — from data ingestion and transformation to advanced DAX calculations and interactive drill-through navigation. The Data Professional Survey capstone reveals key industry insights: salary benchmarks by role, satisfaction scores across 6 dimensions, and the most popular programming languages among data professionals.',

      ARRAY['Power BI','DAX','Power Query','M Language','Data Visualization','Excel','Survey Analysis','ETL'],

      ARRAY['Data Analytics','Business Intelligence','Power BI','DAX','Visualization','Data Science'],

      '/projects/powerbi-dashboards.png',
      '{}',
      NULL,
      'https://github.com/bhuvanesh2235/Power_BI',
      false,
      10
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
