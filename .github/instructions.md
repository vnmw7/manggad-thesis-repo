refactored Account Settings page

here is the suggested by other ai:
"use client";

import { useState, useEffect, FormEvent, ChangeEvent } from "react";
import Header from "../../\_components/Header"; // Assuming this path is correct
import Footer from "../../\_components/Footer"; // Assuming this path is correct
import {
User, Mail, Lock, Building, Users, Briefcase, Info, Bell, CheckCircle, AlertCircle, Image as ImageIcon, ExternalLink, Settings2, Shield,
} from 'lucide-react';

// Using the fetchUserData from your latest snippet
const fetchUserData = async () => {
await new Promise((resolve) => setTimeout(resolve, 500));
return {
name: "Current User Name",
email: "user@example.com",
affiliation: "University Name",
department: "Department Name",
role: "Researcher",
bio: "Short bio about the user. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
// Added for UI completeness, you'd fetch these too
displayName: "User DisplayName",
orcid: "0000-0001-2345-6789",
profilePictureUrl: "", // URL to existing profile picture or empty
notifications: { // Assuming notifications are part of user data
newThesisInField: true,
systemUpdates: true,
submissionStatus: false,
}
};
};

const updateAccountAPI = async (data: any) => {
console.log("Submitting to API:", data);
await new Promise((resolve) => setTimeout(resolve, 1500));
return { success: true, message: "Account updated successfully!" };
};

type ProfileFormData = {
name: string;
displayName: string;
email: string;
affiliation: string;
department: string;
role: string;
orcid: string;
bio: string;
profilePictureUrl: string;
};

type PasswordFormData = {
currentPassword: string;
newPassword: string;
confirmPassword: string;
};

type NotificationPreferences = {
newThesisInField: boolean;
systemUpdates: boolean;
submissionStatus: boolean;
};

const ROLES = ["Student", "Researcher", "Faculty", "Librarian", "Alumni", "Other"];
const SETTINGS_TABS = [
{ id: "profile", label: "Profile", icon: <User size={18} /> },
{ id: "security", label: "Security", icon: <Shield size={18} /> },
{ id: "notifications", label: "Notifications", icon: <Bell size={18} /> },
{ id: "submissions", label: "My Submissions", icon: <Settings2 size={18} /> }, // Placeholder icon
];

export default function AccountSettingsPage() {
const [activeTab, setActiveTab] = useState("profile");

const [profileForm, setProfileForm] = useState<ProfileFormData>({
name: "", displayName: "", email: "", affiliation: "", department: "", role: "", orcid: "", bio: "", profilePictureUrl: ""
});
const [passwordForm, setPasswordForm] = useState<PasswordFormData>({
currentPassword: "", newPassword: "", confirmPassword: "",
});
const [notifications, setNotifications] = useState<NotificationPreferences>({
newThesisInField: true, systemUpdates: true, submissionStatus: false,
});

const [isLoading, setIsLoading] = useState(false);
const [feedback, setFeedback] = useState<{ type: "success" | "error" | null; message: string }>({
type: null, message: "",
});
const [initialDataLoading, setInitialDataLoading] = useState(true);

useEffect(() => {
const loadInitialData = async () => {
setInitialDataLoading(true);
try {
const userData = await fetchUserData();
setProfileForm({
name: userData.name,
displayName: userData.displayName || "",
email: userData.email,
affiliation: userData.affiliation || "",
department: userData.department || "",
role: userData.role || "",
orcid: userData.orcid || "",
bio: userData.bio || "",
profilePictureUrl: userData.profilePictureUrl || "",
});
if(userData.notifications) {
setNotifications(userData.notifications);
}
} catch (error) {
console.error("Failed to load user data:", error);
setFeedback({ type: "error", message: "Failed to load your settings. Please refresh." });
} finally {
setInitialDataLoading(false);
}
};
loadInitialData();
}, []);

const handleProfileChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
setProfileForm({ ...profileForm, [e.target.name]: e.target.value });
};

const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
setPasswordForm({ ...passwordForm, [e.target.name]: e.target.value });
};

const handleNotificationChange = (e: ChangeEvent<HTMLInputElement>) => {
setNotifications({ ...notifications, [e.target.name]: e.target.checked });
};

const handleSubmit = async (e: FormEvent) => {
e.preventDefault();
setIsLoading(true);
setFeedback({ type: null, message: "" });

    if (activeTab === "security" && (passwordForm.newPassword || passwordForm.currentPassword || passwordForm.confirmPassword)) {
      if (!passwordForm.currentPassword) {
        setFeedback({ type: "error", message: "Current password is required to change password." });
        setIsLoading(false); return;
      }
      if (passwordForm.newPassword.length > 0 && passwordForm.newPassword.length < 8) {
         setFeedback({ type: "error", message: "New password must be at least 8 characters." });
         setIsLoading(false); return;
      }
      if (passwordForm.newPassword !== passwordForm.confirmPassword) {
        setFeedback({ type: "error", message: "New passwords do not match." });
        setIsLoading(false); return;
      }
    }

    try {
      const payload: any = {
        profile: profileForm,
        notifications: notifications,
      };
      if (passwordForm.newPassword && passwordForm.currentPassword) {
        payload.passwordChange = { currentPassword: passwordForm.currentPassword, newPassword: passwordForm.newPassword };
      }
      const result = await updateAccountAPI(payload);
      setFeedback({ type: "success", message: result.message });
      if (payload.passwordChange) {
        setPasswordForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
      }
    } catch (error: any) {
      setFeedback({ type: "error", message: error.message || "An unexpected error occurred." });
    } finally {
      setIsLoading(false);
    }

};

// Reusable Field Components (Styled for light theme)
const FieldWrapper = ({ children, title }: { children: React.ReactNode, title?: string }) => (

<div className="mb-6">
{title && <h3 className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3">{title}</h3>}
<div className="space-y-4">{children}</div>
</div>
);

const InputField = ({ label, id, ...props }: any) => (

<div>
<label htmlFor={id} className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
{label}
</label>
<input
id={id}
className="w-full rounded-md border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700/50 text-slate-900 dark:text-slate-100 placeholder-slate-400 px-3 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none text-sm"
{...props}
/>
</div>
);

const TextAreaField = ({ label, id, ...props }: any) => (

<div>
<label htmlFor={id} className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
{label}
</label>
<textarea
id={id}
rows={4}
className="w-full rounded-md border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700/50 text-slate-900 dark:text-slate-100 placeholder-slate-400 px-3 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none text-sm"
{...props}
/>
</div>
);

const SelectField = ({ label, id, children, ...props }: any) => (

<div>
<label htmlFor={id} className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
{label}
</label>
<select
id={id}
className="w-full appearance-none rounded-md border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700/50 text-slate-900 dark:text-slate-100 px-3 py-2 pr-8 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none text-sm"
{...props} >
{children}
</select>
</div>
);

const CheckboxField = ({ label, id, ...props }: any) => (

<div className="flex items-center">
<input
id={id}
type="checkbox"
className="h-4 w-4 rounded border-slate-400 dark:border-slate-500 bg-white dark:bg-slate-700 text-blue-600 focus:ring-blue-500 focus:ring-offset-white dark:focus:ring-offset-slate-800"
{...props}
/>
<label htmlFor={id} className="ml-2 text-sm text-slate-700 dark:text-slate-300">
{label}
</label>
</div>
);

if (initialDataLoading) {
return (

<div className="flex min-h-screen w-full flex-col items-center justify-center bg-slate-100 dark:bg-slate-950">
<p className="text-xl text-slate-600 dark:text-slate-300">Loading settings...</p>
</div>
);
}

return (

<div className="flex min-h-screen w-full flex-col">
<Header />
<main className="flex-grow w-full bg-slate-100 dark:bg-slate-950 py-10 px-4 flex justify-center">
<div className="w-full max-w-5xl bg-white dark:bg-slate-900 shadow-xl rounded-lg">
<div className="flex flex-col md:flex-row">
{/_ Left Sidebar for Tabs _/}
<aside className="w-full md:w-1/4 p-6 md:p-8 border-b md:border-b-0 md:border-r border-slate-200 dark:border-slate-700">
<h2 className="text-base font-semibold text-slate-500 dark:text-slate-400 mb-6 hidden md:block">Settings Navigation</h2>
<nav className="flex md:flex-col md:space-y-1 overflow-x-auto md:overflow-x-visible -mx-4 px-4 md:m-0 md:p-0">
{SETTINGS_TABS.map((tab) => (
<button
key={tab.id}
onClick={() => setActiveTab(tab.id)}
className={`flex items-center space-x-3 w-full text-left px-3 py-2.5 rounded-md text-sm font-medium transition-colors whitespace-nowrap
                      ${ activeTab === tab.id
                          ? 'bg-blue-50 dark:bg-blue-500/10 text-blue-700 dark:text-blue-400'
                          : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700/50 hover:text-slate-900 dark:hover:text-slate-100'
                      }`} >
{tab.icon}
<span>{tab.label}</span>
</button>
))}
</nav>
</aside>

            {/* Right Content Pane for Forms */}
            <div className="w-full md:w-3/4 p-6 md:p-8">
              <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-6">
                {SETTINGS_TABS.find(t => t.id === activeTab)?.label} Settings
              </h1>
              <form onSubmit={handleSubmit} className="space-y-8">
                {activeTab === "profile" && (
                  <section>
                    <FieldWrapper title="Basic Information">
                      <div className="flex items-center space-x-4 mb-4">
                          <img
                              src={profileForm.profilePictureUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(profileForm.name || 'User')}&background=0D89EC&color=fff&size=96&font-size=0.33&bold=true`}
                              alt="Profile"
                              className="h-20 w-20 rounded-full object-cover bg-slate-200 dark:bg-slate-700"
                          />
                          <div>
                              <button type="button" className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium">Change picture</button>
                              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">PNG or JPG, max 2MB.</p>
                          </div>
                      </div>
                      <InputField label="Full Name" id="name" name="name" type="text" value={profileForm.name} onChange={handleProfileChange} required />
                      <InputField label="Display Name (Public)" id="displayName" name="displayName" type="text" value={profileForm.displayName} onChange={handleProfileChange} placeholder="e.g., ThesisPro" />
                      <InputField label="Email Address" id="email" name="email" type="email" value={profileForm.email} onChange={handleProfileChange} required />
                    </FieldWrapper>

                    <FieldWrapper title="Academic & Professional Details">
                      <InputField label="Affiliation (University/Institution)" id="affiliation" name="affiliation" type="text" value={profileForm.affiliation} onChange={handleProfileChange} />
                      <InputField label="Department" id="department" name="department" type="text" value={profileForm.department} onChange={handleProfileChange} />
                      <SelectField label="Role" id="role" name="role" value={profileForm.role} onChange={handleProfileChange}>
                        <option value="" disabled>Select your role</option>
                        {ROLES.map(r => <option key={r} value={r}>{r}</option>)}
                      </SelectField>
                      <InputField label="ORCID iD" id="orcid" name="orcid" type="text" value={profileForm.orcid} onChange={handleProfileChange} placeholder="0000-0000-0000-0000" />
                      <TextAreaField label="Short Bio / Research Interests" id="bio" name="bio" value={profileForm.bio} onChange={handleProfileChange} placeholder="Share a bit about your work and interests..." />
                    </FieldWrapper>
                  </section>
                )}

                {activeTab === "security" && (
                  <section>
                     <FieldWrapper title="Change Password">
                        <p className="text-sm text-slate-600 dark:text-slate-400 -mt-3 mb-3">
                            Leave fields blank if you do not want to change your password.
                        </p>
                        <InputField label="Current Password" id="currentPassword" name="currentPassword" type="password" value={passwordForm.currentPassword} onChange={handlePasswordChange} autoComplete="current-password" />
                        <InputField label="New Password (min. 8 characters)" id="newPassword" name="newPassword" type="password" value={passwordForm.newPassword} onChange={handlePasswordChange} autoComplete="new-password" />
                        <InputField label="Confirm New Password" id="confirmPassword" name="confirmPassword" type="password" value={passwordForm.confirmPassword} onChange={handlePasswordChange} autoComplete="new-password" />
                    </FieldWrapper>
                    <FieldWrapper title="Two-Factor Authentication (2FA)">
                        <p className="text-sm text-slate-600 dark:text-slate-400 -mt-3 mb-3">
                            Add an extra layer of security to your account for enhanced protection.
                        </p>
                        <button type="button" className="inline-flex items-center px-4 py-2 border border-slate-300 dark:border-slate-600 text-sm font-medium rounded-md text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-700 hover:bg-slate-50 dark:hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-slate-900">
                            Set Up Two-Factor Authentication
                        </button>
                    </FieldWrapper>
                  </section>
                )}

                {activeTab === "notifications" && (
                  <section>
                    <FieldWrapper title="Email Notification Preferences">
                      <CheckboxField label="Notify me about new theses in my specified fields of interest." id="newThesisInField" name="newThesisInField" checked={notifications.newThesisInField} onChange={handleNotificationChange} />
                      <CheckboxField label="Notify me about important system updates or announcements." id="systemUpdates" name="systemUpdates" checked={notifications.systemUpdates} onChange={handleNotificationChange} />
                      <CheckboxField label="Notify me about updates to my thesis submissions (e.g., review status)." id="submissionStatus" name="submissionStatus" checked={notifications.submissionStatus} onChange={handleNotificationChange} />
                    </FieldWrapper>
                  </section>
                )}

                {activeTab === "submissions" && (
                  <section>
                    <FieldWrapper title="Manage Your Thesis Submissions">
                        <p className="text-sm text-slate-600 dark:text-slate-400 -mt-3 mb-3">
                            View the status of your submitted theses, make revisions, or start a new submission.
                        </p>
                        <div className="text-center py-10 border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-md bg-slate-50 dark:bg-slate-800/30">
                            <Settings2 size={48} className="mx-auto text-slate-400 dark:text-slate-500 mb-3" />
                            <p className="text-slate-500 dark:text-slate-400 mb-1">You haven't submitted any theses yet.</p>
                            <p className="text-xs text-slate-400 dark:text-slate-500 mb-4">Your submitted theses will appear here.</p>
                            <button type="button" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-slate-900">
                                <ExternalLink size={16} className="mr-2"/> Submit Your First Thesis
                            </button>
                        </div>
                    </FieldWrapper>
                  </section>
                )}

                {/* Submit Button & Feedback (common for all tabs) */}
                <div className="pt-6 border-t border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row items-center sm:justify-between">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full sm:w-auto inline-flex items-center justify-center px-5 py-2.5 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-slate-900 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {isLoading ? (
                        <><svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>Saving...</>
                    ) : "Save Changes"}
                  </button>
                  {feedback.message && (
                    <div
                      aria-live="polite"
                      className={`mt-3 sm:mt-0 text-sm flex items-center ${ feedback.type === 'success' ? 'text-green-600 dark:text-green-400' : 'text-red-500 dark:text-red-400' }`}
                    >
                      {feedback.type === 'success' ? <CheckCircle size={18} className="mr-1.5"/> : <AlertCircle size={18} className="mr-1.5"/>}
                      {feedback.message}
                    </div>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>

);
}
