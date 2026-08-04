// scripts/update-year-desc-sort-order.ts
import { neon } from '@neondatabase/serverless';
import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });
const sql = neon(process.env.DATABASE_URL!);

async function run() {
  console.log('🔄 Re-ordering Experiences by year DESC...');
  const experiences = await sql`SELECT id, company, role, year FROM experiences ORDER BY year DESC, sort_order ASC, id ASC`;
  for (let i = 0; i < experiences.length; i++) {
    await sql`UPDATE experiences SET sort_order = ${i + 1} WHERE id = ${experiences[i].id}`;
  }

  console.log('🔄 Re-ordering Projects by year DESC...');
  const projects = await sql`SELECT id, slug, title, year FROM projects ORDER BY year DESC, sort_order ASC, id ASC`;
  for (let i = 0; i < projects.length; i++) {
    await sql`UPDATE projects SET sort_order = ${i + 1} WHERE id = ${projects[i].id}`;
  }

  console.log('\n✅ UPDATED EXPERIENCES (descending by year):');
  const expRes = await sql`SELECT company, role, year, sort_order FROM experiences ORDER BY sort_order ASC`;
  expRes.forEach(r => console.log(`  ${r.sort_order}. [${r.year}] ${r.company} — ${r.role}`));

  console.log('\n✅ UPDATED PROJECTS (descending by year):');
  const projRes = await sql`SELECT slug, title, year, sort_order FROM projects ORDER BY sort_order ASC`;
  projRes.forEach(r => console.log(`  ${r.sort_order}. [${r.year}] ${r.title}`));

  process.exit(0);
}

run().catch(e => { console.error(e); process.exit(1); });
