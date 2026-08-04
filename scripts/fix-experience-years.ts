// scripts/fix-experience-years.ts
import { neon } from '@neondatabase/serverless';
import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });
const sql = neon(process.env.DATABASE_URL!);

async function run() {
  await sql`UPDATE experiences SET year = '2026' WHERE company = 'Bahwan CyberTek'`;
  await sql`UPDATE experiences SET year = '2024' WHERE company = 'OctaNet Services'`;

  const rows = await sql`SELECT company, role, year FROM experiences ORDER BY sort_order` as { company: string; role: string; year: string }[];
  console.log('\n✅ Updated:');
  rows.forEach(r => console.log(`  [${r.year}] ${r.company} — ${r.role}`));
  process.exit(0);
}

run().catch(e => { console.error(e); process.exit(1); });
