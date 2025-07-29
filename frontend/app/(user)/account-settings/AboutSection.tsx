"use client";
import React, { useState } from "react";

interface AboutSectionProps {
  authorBio: string;
  email: string;
  onBioChange: (newBio: string) => void;
  isLoading: boolean;
  feedback: { type: "success" | "error" | null; message: string };
  handleSubmit: (e: React.FormEvent) => Promise<void>;
}

const AboutSection: React.FC<AboutSectionProps> = ({
  authorBio,
  onBioChange,
  isLoading,
  feedback,
  handleSubmit,
}) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await handleSubmit(e);
    setIsEditing(false);
  };

  return (
    <section className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">
          About You
        </h2>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-400"
        >
          {isEditing ? "Cancel" : "Edit"}
        </button>
      </div>

      {isEditing ? (
        <form onSubmit={handleFormSubmit} className="space-y-6">
          <textarea
            name="authorBio"
            value={authorBio}
            onChange={(e) => onBioChange(e.target.value)}
            className="w-full rounded-md border border-slate-300 p-3 text-slate-800 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200"
            rows={6}
            placeholder="Tell us about yourself..."
          />
          <div className="flex items-center justify-end space-x-4">
            {feedback.message && (
              <p
                className={`text-sm ${
                  feedback.type === "success"
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {feedback.message}
              </p>
            )}
            <button
              type="submit"
              disabled={isLoading}
              className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
            >
              {isLoading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      ) : (
        <p className="text-slate-600 dark:text-slate-300">{authorBio}</p>
      )}
    </section>
  );
};

export default AboutSection;