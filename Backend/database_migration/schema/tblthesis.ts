/**
 * System: MANGGAD
 * Module: Database Migration
 * Purpose: Defines the schema for the 'tblthesis' table.
 */
import { Kysely, sql } from 'kysely';

/**
 * Creates the 'tblthesis' table if it does not already exist.
 * This table stores thesis information.
 *
 * @param db The Kysely database instance.
 * @returns A promise that resolves when the table creation is complete.
 */
export async function createThesisTable(db: Kysely<any>): Promise<void> {
  await db.schema
    .createTable('tblthesis')
    .ifNotExists()
    .addColumn('ths_id', 'uuid', (col) =>
      col.primaryKey().defaultTo(sql`gen_random_uuid()`)
    )
    .addColumn('ths_prf_id', 'uuid', (col) =>
        col.references('tblprofiles.prf_id').onDelete('cascade').notNull()
    )
    .addColumn('ths_created_at', 'timestamptz', (col) =>
      col.defaultTo(sql`now()`).notNull()
    )
    .addColumn('ths_title', 'text', (col) => col.notNull())
    .addColumn('ths_department', 'text')
    .addColumn('ths_submitted_date', 'date')
    .addColumn('ths_publication_date', 'date')
    .addColumn('ths_abstract', 'text')
    .addColumn('ths_keywords', 'text')
    .addColumn('ths_file_url', 'text')
    .addColumn('ths_doi', 'text', (col) => col.unique())
    .execute();
}
