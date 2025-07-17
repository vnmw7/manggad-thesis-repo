/**
 * System: MANGGAD
 * Module: Database Migration
 * Purpose: Defines the schema for the 'tblprofiles' table.
 */
import { Kysely, sql } from 'kysely';

/**
 * Creates the 'tblprofiles' table if it does not already exist.
 * This table stores user profile information.
 *
 * @param db The Kysely database instance.
 * @returns A promise that resolves when the table creation is complete.
 */
export async function createProfileTable(db: Kysely<any>): Promise<void> {
  await db.schema
    .createTable('tblprofiles')
    .ifNotExists()
    .addColumn('prf_id', 'uuid', (col) =>
        col.primaryKey().defaultTo(sql`gen_random_uuid()`)
    )
    .addColumn('prf_user_id', 'uuid', (col) =>
        col.references('auth.users.id').onDelete('cascade').notNull().unique()
    )
    .addColumn('prf_created_at', 'timestamptz', (col) =>
        col.defaultTo(sql`now()`).notNull()
    )
    .addColumn('prf_name', 'text', (col) => col.notNull())
    .addColumn('prf_email', 'text', (col) => col.notNull().unique())
    .addColumn('prf_affiliation', 'text')
    .addColumn('prf_department', 'text')
    .addColumn(
        'prf_image_url',
        'text',
        (col) =>
            col.defaultTo(
                'https://res.cloudinary.com/dzslcjub9/image/upload/v1751176469/default-profile_psr5o8.jpg'
            )
    )
    .addColumn('prf_degree_program', 'text')
    .addColumn('prf_author_bio', 'text')
    .execute();
}

