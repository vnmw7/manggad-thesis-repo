/**
 * System: MANGGAD
 * Module: Database Migration
 * Purpose: Main script for ensuring database tables exist.
 */
import { Pool } from 'pg';
import { Kysely, PostgresDialect } from 'kysely';
import { createProfileTable } from './schema/tblprofile';
import { createThesisTable } from './schema/tblthesis';

import * as dotenv from 'dotenv';
import * as path from 'path';

const envPath = path.resolve(__dirname, '../.env');
const result = dotenv.config({ path: envPath });

if (result.error) {
  console.error(`[migrate.ts] Failed to load .env file at ${envPath}`);
  process.exit(1);
}

const connectionString = process.env.SUPABASE_DATABASE_URL;

if (!connectionString) {
  console.error('[migrate.ts] Missing required environment variable: SUPABASE_DATABASE_URL');
  process.exit(1);
}

const db = new Kysely<any>({
  dialect: new PostgresDialect({
    pool: new Pool({
      connectionString,
    }),
  }),
});

/**
 * Ensures that the necessary database tables are created.
 * This script only creates the tables every time it is run, and it will not
 * delete or modify existing tables. It connects to the database using
 * environment variables and calls the table creation functions from the schema files.
 */
async function migrate() {
  try {
    await createProfileTable(db);
    await createThesisTable(db);
    console.log('Migration completed: Tables are ensured to exist.');
  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
  } finally {
    await db.destroy();
  }
}

migrate();
