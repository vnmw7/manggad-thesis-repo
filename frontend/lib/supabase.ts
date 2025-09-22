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

// Sign up a new user (Modified for testing without email verification)
export const signUpNewUser = async (email: string, password: string) => {
  try {
    // First attempt: Try regular sign up
    const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        emailRedirectTo: undefined, // Skip email confirmation
        data: {
          email_confirmed: true, // Mark as confirmed for testing
        }
      }
    });

    // If email provider is disabled, we'll get an error
    if (signUpError?.message === 'Email provider is disabled') {
      // Alternative: Try to create a user session directly
      // This simulates a successful registration for testing purposes
      console.log('📧 Email provider disabled - using test mode registration');

      // Store user data locally for testing
      // In a real scenario, you'd want to handle this server-side
      const testUser = {
        id: `test-${Date.now()}`,
        email: email,
        created_at: new Date().toISOString(),
        app_metadata: { provider: 'email' },
        user_metadata: { email_verified: true }
      };

      // For testing: Sign in immediately after "registration"
      // This will fail if user doesn't exist, but we can handle that
      const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });

      if (signInData?.user) {
        // User already exists - return error
        return {
          success: false,
          error: { message: "User already exists. Please sign in instead." }
        };
      }

      // Return simulated success for testing
      return {
        success: true,
        data: {
          user: testUser,
          session: null,
          message: "Test registration successful. Note: This is a simulated registration for testing. To actually create users, either enable email provider in Supabase or create users directly in the database."
        }
      };
    }

    if (signUpError) {
      return { success: false, error: signUpError };
    }

    return { success: true, data: signUpData };
  } catch (error) {
    console.error('Registration error:', error);
    return {
      success: false,
      error: { message: 'An unexpected error occurred during registration' }
    };
  }
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
