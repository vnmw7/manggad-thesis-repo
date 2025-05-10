import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "YOUR_SUPABASE_URL";
const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "YOUR_SUPABASE_ANON_KEY";

if (!supabaseUrl || supabaseUrl === "YOUR_SUPABASE_URL") {
  console.warn(
    "Supabase URL is not configured. Please add NEXT_PUBLIC_SUPABASE_URL to your environment variables.",
  );
}

if (!supabaseAnonKey || supabaseAnonKey === "YOUR_SUPABASE_ANON_KEY") {
  console.warn(
    "Supabase anon key is not configured. Please add NEXT_PUBLIC_SUPABASE_ANON_KEY to your environment variables.",
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
