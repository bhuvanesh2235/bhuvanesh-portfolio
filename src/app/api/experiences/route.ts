import { NextResponse } from 'next/server';
import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL!);

export async function GET() {
  try {
    const rows = await sql`
      SELECT id, company, role, year, description, tags, sort_order
      FROM experiences
      ORDER BY year ASC, sort_order ASC
    `;
    return NextResponse.json(rows);
  } catch (err) {
    console.error('Failed to fetch experiences:', err);
    return NextResponse.json({ error: 'Failed to fetch experiences' }, { status: 500 });
  }
}
