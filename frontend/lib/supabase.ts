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

// Authentication functions

// Sign up a new user
export const signUpNewUser = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signUp({
    email: email,
    password: password,
  });
  if (error) {
    return { success: false, error };
  }
  return { success: true, data };
};

// Sign in a user
export const signInWithEmail = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  });
  if (error) {
    return { success: false, error };
  }
  return { success: true, data };
};

// Get the current user
export const getUser = async () => {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (user) {
    return { success: true, data: user };
  }
  return { success: false, error: "User not found" };
};

// Sign out the current user
export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) {
    return { success: false, error };
  }
  return { success: true };
};

// Sign in with Google
export const signInWithGoogle = async () => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
  });
  if (error) {
    return { success: false, error };
  }
  return { success: true, data };
};
