"use client";

import { useState, useEffect, FormEvent } from "react";
import { Bell, Shield, Settings2, User } from "lucide-react";
import Header from "../../_components/Header";
import Footer from "../../_components/Footer";

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
  };
};

// Simulate updating user data (replace with your actual API call)
const updateAccountAPI = async (data: any) => {
  await new Promise((resolve) => setTimeout(resolve, 1500)); // Simulate network delay
  return { success: true, message: "Account updated successfully!" };
};

export default function AccountSettingsPage() {
  const [activeTab, setActiveTab] = useState("profile");
  const [profileForm, setProfileForm] = useState({
    name: "",
    email: "",
    affiliation: "",
    department: "",
    role: "",
    bio: "",
  });
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [notifications, setNotifications] = useState({
    newThesisInField: true,
    systemUpdates: true,
    submissionStatus: false,
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

  const SETTINGS_TABS = [
    { id: "profile", label: "Profile", icon: <User size={18} /> },
    { id: "security", label: "Security", icon: <Shield size={18} /> },
    { id: "notifications", label: "Notifications", icon: <Bell size={18} /> },
    {
      id: "submissions",
      label: "My Submissions",
      icon: <Settings2 size={18} />,
    },
  ];

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

  const handleNotificationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNotifications({ ...notifications, [e.target.name]: e.target.checked });
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
      const payload: any = { ...profileForm, notifications };
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
                {activeTab === "notifications" && "Notification Preferences"}
                {activeTab === "submissions" && "My Submissions"}
              </h1>
              {activeTab === "profile" && (
                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Profile Information Section */}
                  <section>
                    <h2 className="mb-4 text-xl font-semibold text-gray-800 dark:text-gray-100">
                      Profile Information
                    </h2>
                    <div className="space-y-4">
                      <div>
                        <label
                          htmlFor="name"
                          className="mb-1.5 block font-medium text-gray-700 dark:text-gray-300"
                        >
                          Full Name
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={profileForm.name}
                          onChange={handleProfileChange}
                          className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-gray-900 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                          required
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="email"
                          className="mb-1.5 block font-medium text-gray-700 dark:text-gray-300"
                        >
                          Email Address
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={profileForm.email}
                          onChange={handleProfileChange}
                          className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-gray-900 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                          required
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="affiliation"
                          className="mb-1.5 block font-medium text-gray-700 dark:text-gray-300"
                        >
                          Affiliation
                        </label>
                        <input
                          type="text"
                          id="affiliation"
                          name="affiliation"
                          value={profileForm.affiliation}
                          onChange={handleProfileChange}
                          className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-gray-900 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="department"
                          className="mb-1.5 block font-medium text-gray-700 dark:text-gray-300"
                        >
                          Department
                        </label>
                        <input
                          type="text"
                          id="department"
                          name="department"
                          value={profileForm.department}
                          onChange={handleProfileChange}
                          className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-gray-900 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="role"
                          className="mb-1.5 block font-medium text-gray-700 dark:text-gray-300"
                        >
                          Role
                        </label>
                        <select
                          id="role"
                          name="role"
                          value={profileForm.role}
                          onChange={handleProfileChange}
                          className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-gray-900 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                        >
                          <option value="">Select Role</option>
                          <option value="Student">Student</option>
                          <option value="Researcher">Researcher</option>
                          <option value="Faculty">Faculty</option>
                          <option value="Librarian">Librarian</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                      <div>
                        <label
                          htmlFor="bio"
                          className="mb-1.5 block font-medium text-gray-700 dark:text-gray-300"
                        >
                          Short Bio
                        </label>
                        <textarea
                          id="bio"
                          name="bio"
                          value={profileForm.bio}
                          onChange={handleProfileChange}
                          className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-gray-900 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                        ></textarea>
                      </div>
                    </div>
                  </section>

                  {/* Change Password Section */}
                  <section>
                    <h2 className="mb-4 text-xl font-semibold text-gray-800 dark:text-gray-100">
                      Security Settings
                    </h2>
                    <div className="space-y-4">
                      <div>
                        <label
                          htmlFor="currentPassword"
                          className="mb-1.5 block font-medium text-gray-700 dark:text-gray-300"
                        >
                          Current Password
                        </label>
                        <input
                          type="password"
                          id="currentPassword"
                          name="currentPassword"
                          value={passwordForm.currentPassword}
                          onChange={handlePasswordChange}
                          className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-gray-900 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="newPassword"
                          className="mb-1.5 block font-medium text-gray-700 dark:text-gray-300"
                        >
                          New Password
                        </label>
                        <input
                          type="password"
                          id="newPassword"
                          name="newPassword"
                          value={passwordForm.newPassword}
                          onChange={handlePasswordChange}
                          className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-gray-900 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="confirmPassword"
                          className="mb-1.5 block font-medium text-gray-700 dark:text-gray-300"
                        >
                          Confirm New Password
                        </label>
                        <input
                          type="password"
                          id="confirmPassword"
                          name="confirmPassword"
                          value={passwordForm.confirmPassword}
                          onChange={handlePasswordChange}
                          className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-gray-900 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                        />
                      </div>
                    </div>
                  </section>

                  {/* Notification Preferences Section */}
                  <section>
                    <h2 className="mb-4 text-xl font-semibold text-gray-800 dark:text-gray-100">
                      Notification Preferences
                    </h2>
                    <div className="space-y-4">
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="newThesisInField"
                          name="newThesisInField"
                          checked={notifications.newThesisInField}
                          onChange={handleNotificationChange}
                          className="h-5 w-5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-800 dark:text-indigo-400"
                        />
                        <label
                          htmlFor="newThesisInField"
                          className="ml-2 text-gray-700 dark:text-gray-300"
                        >
                          Notify me about new theses in my field
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="systemUpdates"
                          name="systemUpdates"
                          checked={notifications.systemUpdates}
                          onChange={handleNotificationChange}
                          className="h-5 w-5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-800 dark:text-indigo-400"
                        />
                        <label
                          htmlFor="systemUpdates"
                          className="ml-2 text-gray-700 dark:text-gray-300"
                        >
                          Notify me about system updates
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="submissionStatus"
                          name="submissionStatus"
                          checked={notifications.submissionStatus}
                          onChange={handleNotificationChange}
                          className="h-5 w-5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-800 dark:text-indigo-400"
                        />
                        <label
                          htmlFor="submissionStatus"
                          className="ml-2 text-gray-700 dark:text-gray-300"
                        >
                          Notify me about submission status
                        </label>
                      </div>
                    </div>
                  </section>

                  {/* Submit Button & Feedback */}
                  <div>
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full rounded-lg bg-indigo-600 py-3 font-semibold text-white shadow-md transition hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 dark:focus:ring-offset-gray-900"
                    >
                      {isLoading ? "Saving..." : "Save Changes"}
                    </button>
                    {feedback.message && (
                      <p
                        aria-live="polite"
                        className={`mt-4 text-center text-sm ${
                          feedback.type === "success"
                            ? "text-green-600 dark:text-green-400"
                            : "text-red-600 dark:text-red-400"
                        }`}
                      >
                        {feedback.message}
                      </p>
                    )}
                  </div>
                </form>
              )}
              {activeTab === "security" && (
                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Change Password Section */}
                  <section>
                    <h2 className="mb-4 text-xl font-semibold text-gray-800 dark:text-gray-100">
                      Security Settings
                    </h2>
                    <div className="space-y-4">
                      <div>
                        <label
                          htmlFor="currentPassword"
                          className="mb-1.5 block font-medium text-gray-700 dark:text-gray-300"
                        >
                          Current Password
                        </label>
                        <input
                          type="password"
                          id="currentPassword"
                          name="currentPassword"
                          value={passwordForm.currentPassword}
                          onChange={handlePasswordChange}
                          className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-gray-900 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="newPassword"
                          className="mb-1.5 block font-medium text-gray-700 dark:text-gray-300"
                        >
                          New Password
                        </label>
                        <input
                          type="password"
                          id="newPassword"
                          name="newPassword"
                          value={passwordForm.newPassword}
                          onChange={handlePasswordChange}
                          className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-gray-900 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="confirmPassword"
                          className="mb-1.5 block font-medium text-gray-700 dark:text-gray-300"
                        >
                          Confirm New Password
                        </label>
                        <input
                          type="password"
                          id="confirmPassword"
                          name="confirmPassword"
                          value={passwordForm.confirmPassword}
                          onChange={handlePasswordChange}
                          className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-gray-900 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                        />
                      </div>
                    </div>
                  </section>

                  {/* Submit Button & Feedback */}
                  <div>
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full rounded-lg bg-indigo-600 py-3 font-semibold text-white shadow-md transition hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 dark:focus:ring-offset-gray-900"
                    >
                      {isLoading ? "Saving..." : "Save Changes"}
                    </button>
                    {feedback.message && (
                      <p
                        aria-live="polite"
                        className={`mt-4 text-center text-sm ${
                          feedback.type === "success"
                            ? "text-green-600 dark:text-green-400"
                            : "text-red-600 dark:text-red-400"
                        }`}
                      >
                        {feedback.message}
                      </p>
                    )}
                  </div>
                </form>
              )}
              {activeTab === "notifications" && (
                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Notification Preferences Section */}
                  <section>
                    <h2 className="mb-4 text-xl font-semibold text-gray-800 dark:text-gray-100">
                      Notification Preferences
                    </h2>
                    <div className="space-y-4">
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="newThesisInField"
                          name="newThesisInField"
                          checked={notifications.newThesisInField}
                          onChange={handleNotificationChange}
                          className="h-5 w-5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-800 dark:text-indigo-400"
                        />
                        <label
                          htmlFor="newThesisInField"
                          className="ml-2 text-gray-700 dark:text-gray-300"
                        >
                          Notify me about new theses in my field
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="systemUpdates"
                          name="systemUpdates"
                          checked={notifications.systemUpdates}
                          onChange={handleNotificationChange}
                          className="h-5 w-5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-800 dark:text-indigo-400"
                        />
                        <label
                          htmlFor="systemUpdates"
                          className="ml-2 text-gray-700 dark:text-gray-300"
                        >
                          Notify me about system updates
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="submissionStatus"
                          name="submissionStatus"
                          checked={notifications.submissionStatus}
                          onChange={handleNotificationChange}
                          className="h-5 w-5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-800 dark:text-indigo-400"
                        />
                        <label
                          htmlFor="submissionStatus"
                          className="ml-2 text-gray-700 dark:text-gray-300"
                        >
                          Notify me about submission status
                        </label>
                      </div>
                    </div>
                  </section>

                  {/* Submit Button & Feedback */}
                  <div>
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full rounded-lg bg-indigo-600 py-3 font-semibold text-white shadow-md transition hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 dark:focus:ring-offset-gray-900"
                    >
                      {isLoading ? "Saving..." : "Save Changes"}
                    </button>
                    {feedback.message && (
                      <p
                        aria-live="polite"
                        className={`mt-4 text-center text-sm ${
                          feedback.type === "success"
                            ? "text-green-600 dark:text-green-400"
                            : "text-red-600 dark:text-red-400"
                        }`}
                      >
                        {feedback.message}
                      </p>
                    )}
                  </div>
                </form>
              )}
              {activeTab === "submissions" && (
                <div>
                  {/* Placeholder for submissions content */}
                  <p className="text-slate-600 dark:text-slate-300">
                    You have no submissions yet.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
