import React from "react";
import { upload } from "@/api/uploadAction";
import { User, Building, Users, ImageIcon, Camera } from "lucide-react";

interface ProfileSectionProps {
  profileForm: {
    name: string;
    email: string;
    affiliation: string;
    department: string;
    profileImageUrl: string;
    degreePrograms: string;
    authorBio: string;
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
  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files[0]) {
      const formData = new FormData();
      formData.append('file', files[0]);

      const result = await upload(formData);
      if (result.success && result.filePath_netxjs) {
        const simulatedEvent = {
          target: {
            name: 'profileImageUrl',
            value: result.filePath_netxjs,
          },
        } as React.ChangeEvent<HTMLInputElement>;
        handleProfileChange(simulatedEvent);
      } else {
        console.error("Upload failed:", result.error);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-10">
      <section className="flex flex-col items-center gap-8 md:flex-row md:items-start">
        <div className="flex-shrink-0">
          <h3 className="mb-4 text-lg font-semibold text-slate-700 dark:text-slate-200 text-center md:text-left">Profile</h3>
          <div className="relative group w-32 h-32">
            <img
              src={profileForm.profileImageUrl || 'https://res.cloudinary.com/dzslcjub9/image/upload/v1751176469/default-profile_psr5o8.jpg'}
              alt="Profile"
              className="w-32 h-32 rounded-full object-cover border-4 border-white dark:border-gray-800 shadow-md"
            />
            <label
              htmlFor="profile-picture-upload"
              className="absolute inset-0 flex cursor-pointer items-center justify-center rounded-full bg-black bg-opacity-0 text-white opacity-0 transition-all duration-300 group-hover:bg-opacity-50 group-hover:opacity-100"
            >
              <Camera size={24} />
              <span className="sr-only">Change profile picture</span>
            </label>
            <input
              id="profile-picture-upload"
              type="file"
              className="hidden"
              accept="image/png, image/jpeg"
              onChange={handleFileChange}
            />
          </div>
          <p className="mt-2 text-center text-xs text-gray-500">Click image to change</p>
        </div>

        <div className="w-full flex-grow">
          <h3 className="mb-4 text-lg font-semibold text-slate-700 dark:text-slate-200 border-b pb-2">Account Details</h3>
          <div className="grid grid-cols-1 gap-6">
            <InputField
              id="name"
              name="name"
              label="Full Name"
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
          </div>
        </div>
      </section>

      <section>
        <h3 className="mb-4 text-lg font-semibold text-slate-700 dark:text-slate-200 border-b pb-2">Institutional Information</h3>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <label htmlFor="department" className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Select Department
            </label>
            <select
              id="department"
              name="department"
              value={profileForm.department}
              onChange={handleProfileChange}
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-gray-900 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-white"
            >
              <option value="">Select Department</option>
              <option value="School of Architecture, Fine Arts, and Interior Design (SARFAID)">School of Architecture, Fine Arts, and Interior Design (SARFAID)</option>
              <option value="School of Business and Information Technology (SBIT)">School of Business and Information Technology (SBIT)</option>
              <option value="School of Hospitality and Tourism Management (SHTM)">School of Hospitality and Tourism Management (SHTM)</option>
              <option value="School of Sciences, Liberal Arts, and Teacher Education (SSLATE)">School of Sciences, Liberal Arts, and Teacher Education (SSLATE)</option>
            </select>
          </div>
          <div>
            <label htmlFor="role" className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Select Affiliation
            </label>
            <select
              id="affiliation"
              name="affiliation"
              value={profileForm.affiliation}
              onChange={handleProfileChange}
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-gray-900 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-white"
            >
              <option value="">Select Affiliation</option>
              <option value="Student">Student</option>
              <option value="Alumni">Alumni</option>
              <option value="Researcher">Faculty</option>
              <option value="Librarian">Librarian</option>
              <option value="Admin">Admin</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="md:col-span-2">
            <label htmlFor="degreePrograms" className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Degree Programs
            </label>
            <select
              id="degreePrograms"
              name="degreePrograms"
              value={profileForm.degreePrograms}
              onChange={handleProfileChange}
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-gray-900 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-white"
            >
              <option value="">Select a Program</option>
              <option value="Bachelor of Science in Architecture">Bachelor of Science in Architecture</option>
              <option value="Bachelor of Fine Arts major in Advertising Arts">Bachelor of Fine Arts major in Advertising Arts</option>
              <option value="Bachelor of Fine Arts major in Digital Media Arts">Bachelor of Fine Arts major in Digital Media Arts</option>
              <option value="Bachelor of Fine Arts major in Industrial Design">Bachelor of Fine Arts major in Industrial Design</option>
              <option value="Bachelor of Fine Arts major in Studio Arts">Bachelor of Fine Arts major in Studio Arts</option>
              <option value="Bachelor of Fine Arts major in Fashion Design">Bachelor of Fine Arts major in Fashion Design</option>
              <option value="Bachelor of Science in Interior Design">Bachelor of Science in Interior Design</option>
              <option value="Bachelor of Science in Business Administration major in Human Resource Management">Bachelor of Science in Business Administration major in Human Resource Management</option>
              <option value="Bachelor of Science in Business Administration major in Marketing Management">Bachelor of Science in Business Administration major in Marketing Management</option>
              <option value="Bachelor of Science in Information Technology">Bachelor of Science in Information Technology</option>
              <option value="Bachelor of Library & Information Science">Bachelor of Library & Information Science</option>
              <option value="Bachelor of Science in Hospitality Management">Bachelor of Science in Hospitality Management</option>
              <option value="Bachelor of Science in Hospitality Management - Major in Culinary Arts">Bachelor of Science in Hospitality Management - Major in Culinary Arts</option>
              <option value="Bachelor of Science in Tourism Management">Bachelor of Science in Tourism Management</option>
              <option value="Bachelor of Science in Psychology">Bachelor of Science in Psychology</option>
              <option value="Bachelor of Arts in English Language Studies">Bachelor of Arts in English Language Studies</option>
              <option value="Bachelor of Elementary Education">Bachelor of Elementary Education</option>
              <option value="Bachelor of Secondary Education major in English">Bachelor of Secondary Education major in English</option>
              <option value="Bachelor of Secondary Education major in Filipino">Bachelor of Secondary Education major in Filipino</option>
              <option value="Bachelor of Secondary Education major in Math">Bachelor of Secondary Education major in Math</option>
              <option value="Bachelor of Secondary Education major in Science">Bachelor of Secondary Education major in Science</option>
              <option value="Teacher Certificate Program">Teacher Certificate Program</option>
              <option value="Doctor in Business Administration">Doctor in Business Administration</option>
              <option value="Master of Science in Architecture">Master of Science in Architecture</option>
              <option value="Master of Science in Hospitality Management">Master of Science in Hospitality Management</option>
              <option value="Master in Business Administration">Master in Business Administration</option>
              <option value="Master in Business Administration in Human Resource Management">Master in Business Administration in Human Resource Management</option>
              <option value="Master of Arts in Counseling">Master of Arts in Counseling</option>
              <option value="Master of Arts in Education in English/Literature">Master of Arts in Education in English/Literature</option>
              <option value="Master of Arts in Education in Filipino">Master of Arts in Education in Filipino</option>
              <option value="Master of Arts in Education in General Science">Master of Arts in Education in General Science</option>
              <option value="Master of Arts in Education in Instructional Technology">Master of Arts in Education in Instructional Technology</option>
              <option value="Master of Arts in Education in Mathematics">Master of Arts in Education in Mathematics</option>
              <option value="Master of Arts in Education in Physical Education & Sports">Master of Arts in Education in Physical Education & Sports</option>
              <option value="Master of Arts in Education in Religious Studies">Master of Arts in Education in Religious Studies</option>
              <option value="Master of Arts in Education in Values Education">Master of Arts in Education in Values Education</option>
              <option value="Master of Arts in Educational Leadership & Management">Master of Arts in Educational Leadership & Management</option>
            </select>
          </div>
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
        {feedback.message && feedback.type && (
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
