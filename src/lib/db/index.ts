// src/lib/db/index.ts
// Neon serverless Postgres client

import { neon } from '@neondatabase/serverless';

// Lazy getter — only instantiated when first DB query is made (not at module import)
let _sql: ReturnType<typeof neon> | undefined;

export function getDb() {
  if (!_sql) {
    const url = process.env.DATABASE_URL;
    if (!url) {
      throw new Error(
        'DATABASE_URL is not set. Copy .env.local.example → .env.local and add your Neon connection string.'
      );
    }
    _sql = neon(url);
  }
  return _sql;
}

// Re-export for convenience — call sites use getDb() directly in queries.ts
export { getDb as sql };
