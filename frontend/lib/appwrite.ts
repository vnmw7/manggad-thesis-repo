import { Account, Client, ID } from "appwrite";

// Initialize the Appwrite client
const client = new Client();

client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID || ""); // Use NEXT_PUBLIC_ prefix for client-side access

// Initialize the Account service
export const account = new Account(client);

// Define a type for Appwrite errors
interface AppwriteError {
  code?: number;
  message?: string;
  type?: string;
  [key: string]: any; // For any other properties
}

// Authentication functions
export const createUser = async (email: string, password: string) => {
  try {
    const user = await account.create(ID.unique(), email, password);
    return { success: true, data: user };
  } catch (error) {
    console.error("Appwrite create user error:", error);

    // Cast error to the AppwriteError type
    const appwriteError = error as AppwriteError;

    // Return the full error object to allow for detailed error handling
    return {
      success: false,
      error,
      // Add a more specific message for common errors
      errorCode: appwriteError?.code,
      errorMessage: appwriteError?.message || "An unknown error occurred",
    };
  }
};

export const login = async (email: string, password: string) => {
  try {
    const session = await account.createEmailPasswordSession(email, password);
    return { success: true, data: session };
  } catch (error) {
    console.error("Appwrite login error:", error);
    return { success: false, error };
  }
};

export const getCurrentUser = async () => {
  try {
    const user = await account.get();
    return { success: true, data: user };
  } catch (error) {
    return { success: false, error };
  }
};

export const logout = async () => {
  try {
    await account.deleteSession("current");
    return { success: true };
  } catch (error) {
    console.error("Appwrite logout error:", error);
    return { success: false, error };
  }
};
