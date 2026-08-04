// scripts/check-order.ts
import { neon } from '@neondatabase/serverless';
import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });
const sql = neon(process.env.DATABASE_URL!);

async function run() {
  const exp = await sql`SELECT id, company, role, year, sort_order FROM experiences ORDER BY year ASC, sort_order ASC`;
  console.log('=== EXPERIENCES (by year ASC) ===');
  exp.forEach(r => console.log(`  • [${r.year}] ${r.company} - ${r.role} (sort_order: ${r.sort_order})`));

  const proj = await sql`SELECT id, slug, title, year, sort_order FROM projects ORDER BY year ASC, sort_order ASC`;
  console.log('\n=== PROJECTS (by year ASC) ===');
  proj.forEach(r => console.log(`  • [${r.year}] [${r.slug}] ${r.title} (sort_order: ${r.sort_order})`));

  process.exit(0);
}

run().catch(e => { console.error(e); process.exit(1); });
