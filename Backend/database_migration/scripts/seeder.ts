import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import * as path from 'path';
import { seedData } from '../seeds/users';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('[seed.ts] Cannot find Supabase URL or Key');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function seed() {
  for (const userData of seedData) {
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: userData.email,
      password: userData.password,
    });

    if (authError) {
      console.error(`Error signing up user ${userData.email}: ${authError.message}`);
      continue; // Skip to the next user if signup fails
    }

    if (authData.user) {
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
  }
}

seed();