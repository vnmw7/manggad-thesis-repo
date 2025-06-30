import { Kysely, sql } from 'kysely';

export async function up(db: Kysely<any>): Promise<void> {
await db.schema
    .createTable('tblprofiles')
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

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropTable('tblprofiles').execute();
}
