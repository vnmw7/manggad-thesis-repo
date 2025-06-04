import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "YOUR_SUPABASE_URL";
const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "YOUR_SUPABASE_ANON_KEY";

if (!supabaseUrl || supabaseUrl === "YOUR_SUPABASE_URL") {
  console.error(
    "❌ Supabase URL is not configured. Please add NEXT_PUBLIC_SUPABASE_URL to your environment variables.",
  );
  throw new Error("Supabase URL is not configured");
}

if (!supabaseAnonKey || supabaseAnonKey === "YOUR_SUPABASE_ANON_KEY") {
  console.error(
    "❌ Supabase anon key is not configured. Please add NEXT_PUBLIC_SUPABASE_ANON_KEY to your environment variables.",
  );
  throw new Error("Supabase anon key is not configured");
}

console.log("✅ Supabase configuration loaded successfully");
console.log("🔗 Supabase URL:", supabaseUrl);

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: false, // Since we're using this in API routes
  },
});
