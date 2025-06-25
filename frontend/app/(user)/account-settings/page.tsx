"use client";

import { useState, useEffect, FormEvent } from "react";
import { Bell, Shield, Settings2, User } from "lucide-react";
import Header from "../../_components/Header";
import Footer from "../../_components/Footer";
import ProfileSection from "./ProfileSection";
import SecuritySection from "./SecuritySection";
import AboutSection from "./AboutSection";

// Updated fetchUserData to include additional fields
const fetchUserData = async () => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return {
    name: "Current User Name",
    email: "user@example.com",
    affiliation: "University Name",
    department: "Department Name",
    role: "Researcher",
    bio: "Short bio about the user",
    publicName: "Public Name",
    profileImageUrl: "https://example.com/profile.jpg",
    professionalTitle: "Professional Title",
    professionalPosition: "Professional Position",
    educationDegree: "Degree",
    educationUniversity: "University",
    educationGradYear: "2025",
    educationScholarship: "Scholarship",
    authorBio: "Author bio",
  };
};

// Simulate updating user data (replace with your actual API call)
const updateAccountAPI = async (data: any) => {
  await new Promise((resolve) => setTimeout(resolve, 1500)); // Simulate network delay
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
  const [activeTab, setActiveTab] = useState<string>("profile");
  const [profileForm, setProfileForm] = useState({
    name: "",
    email: "",
    affiliation: "",
    department: "",
    role: "",
    bio: "",
    publicName: "",
    profileImageUrl: "",
    professionalTitle: "",
    professionalPosition: "",
    educationDegree: "",
    educationUniversity: "",
    educationGradYear: "",
    educationScholarship: "",
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
    const loadInitialData = async () => {
      setInitialDataLoading(true);
      try {
        const userData = await fetchUserData();
        setProfileForm({
          name: userData.name,
          email: userData.email,
          affiliation: userData.affiliation || "",
          department: userData.department || "",
          role: userData.role || "",
          bio: userData.bio || "",
          publicName: userData.publicName || "",
          profileImageUrl: userData.profileImageUrl || "",
          professionalTitle: userData.professionalTitle || "",
          professionalPosition: userData.professionalPosition || "",
          educationDegree: userData.educationDegree || "",
          educationUniversity: userData.educationUniversity || "",
          educationGradYear: userData.educationGradYear || "",
          educationScholarship: userData.educationScholarship || "",
          authorBio: userData.authorBio || "",
        });
      } catch (error) {
        setFeedback({
          type: "error",
          message: "Failed to load your data. Please try again.",
        });
      } finally {
        setInitialDataLoading(false);
      }
    };
    loadInitialData();
  }, []);

  // Updated handleProfileChange to handle different input types
  const handleProfileChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setProfileForm({ ...profileForm, [e.target.name]: e.target.value });
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordForm({ ...passwordForm, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setFeedback({ type: null, message: "" });

    // Client-side validation for password
    if (
      passwordForm.newPassword ||
      passwordForm.currentPassword ||
      passwordForm.confirmPassword
    ) {
      if (!passwordForm.currentPassword) {
        setFeedback({
          type: "error",
          message: "Please enter your current password to change it.",
        });
        setIsLoading(false);
        return;
      }
      if (passwordForm.newPassword.length < 8) {
        setFeedback({
          type: "error",
          message: "New password must be at least 8 characters long.",
        });
        setIsLoading(false);
        return;
      }
      if (passwordForm.newPassword !== passwordForm.confirmPassword) {
        setFeedback({ type: "error", message: "New passwords do not match." });
        setIsLoading(false);
        return;
      }
    }

    try {
      const payload: any = { ...profileForm };
      if (passwordForm.newPassword) {
        payload.currentPassword = passwordForm.currentPassword;
        payload.newPassword = passwordForm.newPassword;
      }
      const result = await updateAccountAPI(payload); // Simulated API call
      setFeedback({ type: "success", message: result.message });
      if (passwordForm.newPassword) {
        setPasswordForm({
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
      }
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
              {activeTab === "about" && <AboutSection />}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
