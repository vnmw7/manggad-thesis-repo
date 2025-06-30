import express, { Request, Response } from 'express';
import sql from './lib/supabase';
import * as dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

app.get('/test-supabase', async (req: Request, res: Response): Promise<void> => {
  try {
    // Query the database using the sql instance from supabase.ts
    const tables = await sql`SELECT tablename FROM pg_catalog.pg_tables`;

    res.status(200).json({ message: 'Supabase connection successful!', tables });
  } catch (error) {
    console.error('Supabase connection failed:', error);
    res.status(500).json({ error: 'Supabase connection failed.', details: error });
  }
});

app.get('/', (req: Request, res: Response): void => {
  res.status(200).json({ message: 'Server is working!' });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
