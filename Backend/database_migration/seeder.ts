/**
 * System: MANGGAD
 * Module: Backend
 * Sub-module: Database Migration
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * Purpose:
 * This script seeds the database with initial data. It is designed to be run
 * from the command line. It connects to a Supabase instance and populates
 * the tables with data from the `seeds` directory.
 *
 * `seedData` is an array of objects, where each object represents a user to be
 * created. Each object should have an `email`, `password`, and `profile` property.
 *
 * The script first signs up the user using the `auth.signUp` method, and then
 * inserts the user's profile data into the `tblprofiles` table.
 *
 * If any errors occur during the process, they are logged to the console.
 *
 * @see /Backend/database_migration/seeds/users.ts
 * @see /Backend/package.json
 *
 * Pre-requisites:
 * - A running Supabase instance
 * - A `.env` file with the following variables:
 *  - `NEXT_PUBLIC_SUPABASE_URL`
 *  - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
 *
 * To run this script, execute the following command:
 * `npm run seed`
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 */
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import * as path from 'path';
import { seedData, UserData } from './seeds/users';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('[seed.ts] Cannot find Supabase URL or Key');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

/**
 * Signs up a user and inserts their profile data.
 *
 * @param supabase - The Supabase client.
 * @param userData - The user data to seed.
 */
async function seedUser(supabase: SupabaseClient, userData: UserData): Promise<void> {
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email: userData.email,
    password: userData.password,
  });

  if (authError) {
    console.error(`Error signing up user ${userData.email}: ${authError.message}`);
    return;
  }

  if (!authData.user) {
    console.error(`No user data returned for ${userData.email}`);
    return;
  }

  console.log(`Successfully signed up user ${userData.email}`);

  const { error: profileError } = await supabase
    .from('tblprofiles')
    .insert({ ...userData.profile, prf_user_id: authData.user.id });

  if (profileError) {
    console.error(`Error inserting profile for ${userData.email}: ${profileError.message}`);
  } else {
    console.log(`Successfully inserted profile for ${userData.email}`);
  }
}

/**
 * Seeds the database with initial data.
 */
async function seed(): Promise<void> {
  for (const userData of seedData) {
    await seedUser(supabase, userData);
  }
}

seed();