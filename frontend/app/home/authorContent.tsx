import React, { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase"; // Import Supabase client

// Define an interface for the author data
interface Author {
  id: string;
  name: string;
  bio: string;
  publishedWorksCount: number; // Renamed for clarity
}

const AuthorContent = () => {
  const [authors, setAuthors] = useState<Author[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null); // Add error state

  useEffect(() => {
    const fetchAuthors = async () => {
      setLoading(true);
      setError(null);
      try {
        const { data, error: supabaseError } = await supabase
          .from("thesis_tbl")
          .select("id, firstName, middleName, lastName, department, program");

        if (supabaseError) {
          throw supabaseError;
        }

        if (data) {
          const authorMap = new Map<string, { count: number; details: any }>();

          data.forEach((thesis) => {
            // Create a consistent key for each author based on their full name.
            const authorKey =
              `${thesis.firstName || ""} ${thesis.middleName || ""} ${thesis.lastName || ""}`
                .replace(/\s+/g, " ")
                .trim()
                .toLowerCase();

            if (!authorKey) return; // Skip if author name is empty

            if (authorMap.has(authorKey)) {
              authorMap.get(authorKey)!.count++;
            } else {
              authorMap.set(authorKey, {
                count: 1,
                details: thesis, // Store the first encountered thesis details for this author
              });
            }
          });
          const formattedAuthors: Author[] = Array.from(
            authorMap.entries(),
          ).map(([, value]) => ({
            id: value.details.id, // Use the id from the stored thesis details
            name: `${value.details.firstName || ""} ${value.details.middleName || ""} ${value.details.lastName || ""}`
              .replace(/\s+/g, " ")
              .trim(),
            bio:
              value.details.program ||
              value.details.department ||
              "No biography available.",
            publishedWorksCount: value.count,
          }));

          setAuthors(formattedAuthors);
        }
      } catch (err: any) {
        console.error("Error fetching authors:", err);
        setError("Failed to fetch authors. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchAuthors();
  }, []);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredAuthors = authors.filter((author) =>
    author.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  if (loading) {
    return <div className="p-4">Loading authors...</div>;
  }

  if (error) {
    return <div className="p-4 text-red-500">{error}</div>; // Display error message
  }

  return (
    <div className="rounded-lg bg-white p-6 shadow-md dark:bg-gray-800">
      <h1 className="mb-6 text-3xl font-bold text-gray-800 dark:text-white">
        Meet Our Authors
      </h1>

      <div className="mb-6">
        <input
          type="text"
          placeholder="Search authors..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="w-full rounded-lg border border-gray-300 p-3 focus:border-transparent focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:ring-blue-400"
        />
      </div>

      {filteredAuthors.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredAuthors.map((author) => (
            <div
              key={author.id}
              className="rounded-lg bg-gray-50 p-6 shadow-sm transition-shadow duration-300 hover:shadow-lg dark:bg-gray-700"
            >
              <h2 className="mb-2 text-xl font-semibold text-blue-600 dark:text-blue-400">
                {author.name}
              </h2>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                {author.bio}
              </p>
              <p className="mt-2 text-sm font-medium text-gray-600 dark:text-gray-400">
                Published Works: {author.publishedWorksCount}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 dark:text-gray-400">
          No authors found matching your search.
        </p>
      )}
    </div>
  );
};

export default AuthorContent;
