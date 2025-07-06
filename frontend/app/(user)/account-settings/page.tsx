"use client";

import { useState, useEffect, FormEvent } from "react";
import { Bell, Shield, Settings2, User } from "lucide-react";
import { useRouter } from "next/navigation";
import Header from "../../_components/Header";
import Footer from "../../_components/Footer";
import ProfileSection from "./ProfileSection";
import SecuritySection from "./SecuritySection";
import AboutSection from "./AboutSection";
import { supabase } from "../../../lib/supabase";

const fetchUserData = async () => {
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    console.error("Error fetching user:", error);
    // Return a default structure if user is not found or on error
    return {
      name: "Full Name",
      email: "user@example.com",
      affiliation: "What is your position in school?",
      department: "Department Name",
      profileImageUrl:
        "https://res.cloudinary.com/dzslcjub9/image/upload/v1751176469/default-profile_psr5o8.jpg",
      degreePrograms: "Degree, University, 2025",
      authorBio: "Enter your bio here...",
    };
  }

  // Fetch author bio from the 'tblprofiles' table
  const { data: profileData, error: profileError } = await supabase
    .from("tblprofiles")
    .select("prf_author_bio")
    .eq("prf_user_id", user.id)
    .single();

  if (profileError) {
    console.error("Error fetching author bio:", profileError);
  }

  return {
    name: user.user_metadata.full_name || "Current User Name",
    email: user.email || "user@example.com",
    affiliation: user.user_metadata.affiliation || "University Name",
    department: user.user_metadata.department || "Department Name",
    role: user.user_metadata.role || "Researcher",
    publicName: user.user_metadata.public_name || "Public Name",
    profileImageUrl:
      user.user_metadata.profile_image_url ||
      "https://res.cloudinary.com/dzslcjub9/image/upload/v1751176469/default-profile_psr5o8.jpg",
    degreePrograms: user.user_metadata.degree_programs || "Degree, University, 2025",
    authorBio: profileData?.prf_author_bio || "No bio available. Please add one.",
  };
};

const updateAccountAPI = async (userId: string, data: any) => {
  const { authorBio, ...profileData } = data;

  // Update user metadata in Supabase Auth
  const { data: authData, error: authError } = await supabase.auth.updateUser({
    data: profileData,
  });

  if (authError) {
    throw new Error(authError.message);
  }

  // Update author bio in the 'tblprofiles' table
  const { error: profileError } = await supabase
    .from("tblprofiles")
    .update({ prf_author_bio: authorBio })
    .eq("prf_user_id", userId);

  if (profileError) {
    throw new Error(profileError.message);
  }

  return { success: true, message: "Account updated successfully!" };
};

const SETTINGS_TABS = [
  { id: "profile", label: "Profile", icon: <User size={18} /> },
  { id: "security", label: "Security", icon: <Shield size={18} /> },
  { id: "about", label: "About the Author", icon: <Bell size={18} /> },
  {
    id: "submissions",
    label: "My Submissions",
    icon: <Settings2 size={18} />,
  },
];

export default function AccountSettingsPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<string>("profile");
  const [profileForm, setProfileForm] = useState({
    name: "",
    email: "",
    affiliation: "",
    department: "",
    profileImageUrl: "",
    degreePrograms: "",
    authorBio: "",
  });
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [feedback, setFeedback] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({
    type: null,
    message: "",
  });
  const [initialDataLoading, setInitialDataLoading] = useState(true);

  useEffect(() => {
    const checkSessionAndLoadData = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session) {
        router.push("/auth");
      } else {
        loadInitialData();
      }
    };
    checkSessionAndLoadData();
  }, [router]);

  const loadInitialData = async () => {
    setInitialDataLoading(true);
    try {
      const userData = await fetchUserData();
      setProfileForm(userData);
    } catch (error) {
      setFeedback({
        type: "error",
        message: "Failed to load your data. Please try again.",
      });
    } finally {
      setInitialDataLoading(false);
    }
  };

  const handleProfileChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setProfileForm({ ...profileForm, [e.target.name]: e.target.value });
  };

  const handleBioChange = (newBio: string) => {
    setProfileForm({ ...profileForm, authorBio: newBio });
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordForm({ ...passwordForm, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setFeedback({ type: null, message: "" });

    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      setFeedback({ type: "error", message: "You must be logged in." });
      setIsLoading(false);
      return;
    }

    // Form validation logic here...

    try {
      const { authorBio, ...profileData } = profileForm;
      const result = await updateAccountAPI(user.id, {
        authorBio,
        ...profileData,
      });
      setFeedback({ type: "success", message: result.message });
    } catch (error: any) {
      setFeedback({
        type: "error",
        message: error.message || "An unexpected error occurred.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (initialDataLoading) {
    return (
      <div className="flex min-h-screen w-full flex-col items-center justify-center bg-gradient-to-br from-blue-50/80 to-indigo-50/80 dark:from-gray-900 dark:to-gray-950">
        <p className="text-xl text-gray-700 dark:text-gray-300">
          Loading settings...
        </p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen w-full flex-col">
      <Header />
      <main className="flex w-full flex-grow justify-center bg-slate-100 px-4 py-10 dark:bg-slate-950">
        <div className="w-full max-w-5xl rounded-lg bg-white shadow-xl dark:bg-slate-900">
          <div className="flex flex-col md:flex-row">
            {/* Left Sidebar for Tabs */}
            <aside className="w-full border-b border-slate-200 p-6 md:w-1/4 md:border-r md:border-b-0 md:p-8 dark:border-slate-700">
              <h2 className="mb-6 hidden text-base font-semibold text-slate-500 md:block dark:text-slate-400">
                Settings Navigation
              </h2>
              <nav className="-mx-4 flex overflow-x-auto px-4 md:m-0 md:flex-col md:space-y-1 md:overflow-x-visible md:p-0">
                {SETTINGS_TABS.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex w-full items-center space-x-3 rounded-md px-3 py-2.5 text-left text-sm font-medium whitespace-nowrap transition-colors ${
                      activeTab === tab.id
                        ? "bg-blue-50 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400"
                        : "text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-700/50 dark:hover:text-slate-100"
                    }`}
                  >
                    {tab.icon}
                    <span>{tab.label}</span>
                  </button>
                ))}
              </nav>
            </aside>

            {/* Right Content Pane for Forms */}
            <div className="w-full p-6 md:w-3/4 md:p-8">
              <h1 className="mb-6 text-2xl font-bold text-slate-800 dark:text-slate-100">
                {activeTab === "profile" && "Profile Settings"}
                {activeTab === "security" && "Security Settings"}
                {activeTab === "about" && "About the Author"}
                {activeTab === "submissions" && "My Submissions"}
              </h1>
              {activeTab === "profile" && (
                <ProfileSection
                  profileForm={profileForm}
                  handleProfileChange={handleProfileChange}
                  isLoading={isLoading}
                  feedback={feedback}
                  handleSubmit={handleSubmit}
                />
              )}
              {activeTab === "security" && (
                <SecuritySection
                  passwordForm={passwordForm}
                  handlePasswordChange={handlePasswordChange}
                  isLoading={isLoading}
                  feedback={feedback}
                  handleSubmit={handleSubmit}
                />
              )}
              {activeTab === "about" && (
                <AboutSection
                  authorBio={profileForm.authorBio}
                  email={profileForm.email}
                  onBioChange={handleBioChange}
                  isLoading={isLoading}
                  feedback={feedback}
                  handleSubmit={handleSubmit}
                />
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}