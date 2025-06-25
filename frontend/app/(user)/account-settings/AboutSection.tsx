import React from "react";

const AboutSection = () => {
  return (
    <section className="space-y-8">
      <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">
        About the Author
      </h2>
      <p className="text-slate-600 dark:text-slate-300">
        This application was developed by [Author's Name], a dedicated researcher
        and developer passionate about creating tools that empower users to
        manage their academic and professional profiles effectively. With a
        background in [Author's Field], [Author's Name] aims to bridge the gap
        between technology and education.
      </p>
      <p className="text-slate-600 dark:text-slate-300">
        For inquiries or feedback, feel free to reach out via email at
        <a
          href="mailto:author@example.com"
          className="text-blue-600 hover:underline dark:text-blue-400"
        >
          author@example.com
        </a>
        .
      </p>
    </section>
  );
};

export default AboutSection;