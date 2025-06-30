import postgres from 'postgres';

const connectionString = process.env.SUPABASE_DATABASE_URL;
console.log('SUPABASE_DATABASE_URL:', process.env.SUPABASE_DATABASE_URL);
if (!connectionString) {
  throw new Error('SUPABASE_DATABASE_URL is not defined');
}

const sql = postgres(connectionString);
if (!sql) {
    throw new Error('Failed to create a connection to the database');
}

export default sql;