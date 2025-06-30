import { Pool } from 'pg';
import { Kysely, PostgresDialect } from 'kysely';
import { up, down } from '../schema/tblprofile';

import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const connectionString = process.env.SUPABASE_DATABASE_URL;

if (!connectionString) {
  console.error('[migrate.ts] Cannot find connection string');
  process.exit(1);
}

const db = new Kysely<any>({
  dialect: new PostgresDialect({
    pool: new Pool({
      connectionString,
    }),
  }),
});

async function migrate() {
  const args = process.argv.slice(2);
  const direction = args[0];

  if (direction !== 'up' && direction !== 'down') {
    console.error('Please specify direction: up or down');
    process.exit(1);
  }

  try {
    if (direction === 'up') {
      await up(db);
      console.log('Migration: up completed successfully');
    } else {
      await down(db);
      console.log('Migration: down completed successfully');
    }
  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
  } finally {
    await db.destroy();
  }
}

migrate();
