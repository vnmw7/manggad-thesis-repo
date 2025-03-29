import { Account, Client, ID } from "appwrite";

// Initialize the Appwrite client
const client = new Client();

client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("67e4aa4d0013422857cb");

// Initialize the Account service
export const account = new Account(client);

// Authentication functions
export const createUser = async (email: string, password: string) => {
  try {
    const user = await account.create(ID.unique(), email, password);
    return { success: true, data: user };
  } catch (error) {
    console.error("Appwrite create user error:", error);
    return { success: false, error };
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
