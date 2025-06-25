import React from "react";
import { User, Building, Users, ImageIcon, Briefcase, GraduationCap } from "lucide-react";

interface ProfileSectionProps {
  profileForm: {
    name: string;
    email: string;
    affiliation: string;
    department: string;
    role: string;
    publicName: string;
    profileImageUrl: string;
    professionalTitle: string;
    professionalPosition: string;
    educationDegree: string;
    educationUniversity: string;
    educationGradYear: string;
    educationScholarship: string;
    authorBio: string; // Moved to AuthorDescriptionSection
  };
  handleProfileChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => void;
  isLoading: boolean;
  feedback: {
    type: "success" | "error" | null;
    message: string;
  };
  handleSubmit: (e: React.FormEvent) => void;
}

const InputField: React.FC<{
  id: string;
  name: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  placeholder?: string;
  icon?: React.ReactNode;
}> = ({ id, name, label, value, onChange, type = "text", placeholder, icon }) => (
  <div>
    <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
      {label}
    </label>
    <div className="relative">
      {icon && <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">{icon}</div>}
      <input
        type={type}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-gray-900 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-white ${icon ? "pl-10" : ""}`}
      />
    </div>
  </div>
);

const ProfileSection: React.FC<ProfileSectionProps> = ({
  profileForm,
  handleProfileChange,
  isLoading,
  feedback,
  handleSubmit,
}) => {
  return (
    <form onSubmit={handleSubmit} className="space-y-10">
      {/* Account Information Section */}
      <section>
        <h3 className="mb-4 text-lg font-semibold text-slate-700 dark:text-slate-200 border-b pb-2">Account Details</h3>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <InputField
            id="name"
            name="name"
            label="Account Name"
            value={profileForm.name}
            onChange={handleProfileChange}
            placeholder="Your full name"
            icon={<User size={16} className="text-gray-400" />}
          />
          <InputField
            id="email"
            name="email"
            label="Account Email (Private)"
            type="email"
            value={profileForm.email}
            onChange={handleProfileChange}
            placeholder="your.email@example.com"
            icon={<User size={16} className="text-gray-400" />}
          />
          <InputField
            id="affiliation"
            name="affiliation"
            label="Affiliation (e.g., University)"
            value={profileForm.affiliation}
            onChange={handleProfileChange}
            placeholder="University of Life"
            icon={<Building size={16} className="text-gray-400" />}
          />
          <InputField
            id="department"
            name="department"
            label="Department"
            value={profileForm.department}
            onChange={handleProfileChange}
            placeholder="Department of Studies"
            icon={<Users size={16} className="text-gray-400" />}
          />
          <div>
            <label htmlFor="role" className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
              System Role
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
              <option value="Alumni">Alumni</option>
              <option value="Researcher">Researcher</option>
              <option value="Faculty">Faculty</option>
              <option value="Librarian">Librarian</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>
      </section>

      {/* Public Bio Note Details Section */}
      <section>
        <h3 className="mb-4 text-lg font-semibold text-slate-700 dark:text-slate-200 border-b pb-2">Public Author Profile</h3>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <InputField
            id="publicName"
            name="publicName"
            label="Public Display Name"
            value={profileForm.publicName}
            onChange={handleProfileChange}
            placeholder="e.g., Dr. Jane Doe"
            icon={<User size={16} className="text-gray-400" />}
          />
          <InputField
            id="profileImageUrl"
            name="profileImageUrl"
            label="Profile Image URL (Cloudinary)"
            value={profileForm.profileImageUrl}
            onChange={handleProfileChange}
            placeholder="https://res.cloudinary.com/..."
            icon={<ImageIcon size={16} className="text-gray-400" />}
          />
          <InputField
            id="professionalTitle"
            name="professionalTitle"
            label="Professional Title"
            value={profileForm.professionalTitle}
            onChange={handleProfileChange}
            placeholder="e.g., Professor of Astrophysics"
            icon={<Briefcase size={16} className="text-gray-400" />}
          />
          <InputField
            id="professionalPosition"
            name="professionalPosition"
            label="Professional Position"
            value={profileForm.professionalPosition}
            onChange={handleProfileChange}
            placeholder="e.g., Head of Department"
            icon={<Briefcase size={16} className="text-gray-400" />}
          />
        </div>
      </section>

      {/* Education Section */}
      <section>
        <h3 className="mb-4 text-lg font-semibold text-slate-700 dark:text-slate-200 border-b pb-2">Education</h3>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
           <InputField
            id="educationDegree"
            name="educationDegree"
            label="Degree"
            value={profileForm.educationDegree}
            onChange={handleProfileChange}
            placeholder="e.g., Ph.D. in History"
            icon={<GraduationCap size={16} className="text-gray-400" />}
          />
          <InputField
            id="educationUniversity"
            name="educationUniversity"
            label="University"
            value={profileForm.educationUniversity}
            onChange={handleProfileChange}
            placeholder="e.g., Oxford University"
            icon={<GraduationCap size={16} className="text-gray-400" />}
          />
          <InputField
            id="educationGradYear"
            name="educationGradYear"
            label="Graduation Year"
            value={profileForm.educationGradYear}
            onChange={handleProfileChange}
            placeholder="e.g., 2020"
            icon={<GraduationCap size={16} className="text-gray-400" />}
          />
          <InputField
            id="educationScholarship"
            name="educationScholarship"
            label="Scholarship (Optional)"
            value={profileForm.educationScholarship}
            onChange={handleProfileChange}
            placeholder="e.g., Rhodes Scholar"
            icon={<GraduationCap size={16} className="text-gray-400" />}
          />
        </div>
      </section>

      <div>
        <button
          type="submit"
          disabled={isLoading}
          className="w-full rounded-lg bg-indigo-600 px-6 py-3 font-semibold text-white shadow-md transition hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 dark:focus:ring-offset-gray-900 md:w-auto"
        >
          {isLoading ? "Saving..." : "Save Profile Changes"}
        </button>
        {feedback.message && feedback.type && ( // Only show feedback if type is set
          <p
            aria-live="polite"
            className={`mt-4 text-sm ${
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
  );
};

export default ProfileSection;
