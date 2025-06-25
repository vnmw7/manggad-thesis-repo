import React from "react";

interface AuthorDescriptionSectionProps {
  authorBio: string;
  handleBioChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  isLoading: boolean;
  feedback: {
    type: "success" | "error" | null;
    message: string;
  };
  handleSubmit: (e: React.FormEvent) => void;
}

const AuthorDescriptionSection: React.FC<AuthorDescriptionSectionProps> = ({
  authorBio,
  handleBioChange,
  isLoading,
  feedback,
  handleSubmit,
}) => {
  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <section>
        <h3 className="mb-1 text-lg font-semibold text-slate-700 dark:text-slate-200">Edit Your Author Description</h3>
        <p className="mb-4 text-sm text-slate-500 dark:text-slate-400">
          Share your story, research interests, and contributions. This will be displayed on your public author profile.
        </p>
        <div>
          <label
            htmlFor="authorBio"
            className="sr-only" // Screen reader only, as the purpose is clear from context
          >
            Author Description / Bio
          </label>
          <textarea
            id="authorBio"
            name="authorBio" // Important: must match the key in profileForm state
            value={authorBio}
            onChange={handleBioChange}
            rows={10}
            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-gray-900 focus:border-indigo-500 focus:ring-2 focus:ring-indo-500 focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-white"
            placeholder="Tell us about yourself as an author..."
          ></textarea>
        </div>
      </section>

      <div>
        <button
          type="submit"
          disabled={isLoading}
          className="w-full rounded-lg bg-indigo-600 px-6 py-3 font-semibold text-white shadow-md transition hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 dark:focus:ring-offset-gray-900 md:w-auto"
        >
          {isLoading ? "Saving Description..." : "Save Description"}
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

export default AuthorDescriptionSection;
