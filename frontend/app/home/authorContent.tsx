import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Mail, Building2, GraduationCap } from "lucide-react";
import { fetchAllPublicProfiles, fetchUserThesesCount, PublicProfile } from "@/lib/api-profile";

// Define an interface for the author data with thesis count
interface AuthorWithCount extends PublicProfile {
  publishedWorksCount: number;
}

const AuthorContent = () => {
  const [authors, setAuthors] = useState<AuthorWithCount[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAuthors = async () => {
      setLoading(true);
      setError(null);
      try {
        // Fetch all public profiles
        const profiles = await fetchAllPublicProfiles();
        
        // Fetch thesis count for each author
        const authorsWithCounts = await Promise.all(
          profiles.map(async (profile) => {
            const count = await fetchUserThesesCount(profile.prf_name);
            return {
              ...profile,
              publishedWorksCount: count,
            };
          })
        );

        setAuthors(authorsWithCounts);
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
    author.publishedWorksCount > 0 &&
    (author.prf_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (author.prf_department && author.prf_department.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (author.prf_degree_program && author.prf_degree_program.toLowerCase().includes(searchTerm.toLowerCase())))
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
            <Link
              key={author.prf_id}
              href={`/${author.prf_user_id}`}
              className="block rounded-lg bg-gray-50 p-6 shadow-sm transition-all duration-300 hover:shadow-lg hover:scale-105 dark:bg-gray-700"
            >
              <div className="flex items-center mb-4">
                <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-blue-500 mr-4 flex-shrink-0">
                  <Image
                    src={author.prf_image_url || '/profile_placeholder.png'}
                    alt={`Profile picture of ${author.prf_name}`}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h2 className="text-xl font-semibold text-blue-600 dark:text-blue-400 truncate">
                    {author.prf_name}
                  </h2>
                  {author.prf_affiliation && (
                    <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                      {author.prf_affiliation}
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-2 mb-4">
                {author.prf_email && (
                  <div className="flex items-center text-sm text-gray-700 dark:text-gray-300">
                    <Mail className="w-4 h-4 mr-2 text-blue-500 flex-shrink-0" />
                    <span className="truncate">{author.prf_email}</span>
                  </div>
                )}
                
                {author.prf_department && (
                  <div className="flex items-center text-sm text-gray-700 dark:text-gray-300">
                    <Building2 className="w-4 h-4 mr-2 text-blue-500 flex-shrink-0" />
                    <span className="truncate">{author.prf_department}</span>
                  </div>
                )}
                
                {author.prf_degree_program && (
                  <div className="flex items-center text-sm text-gray-700 dark:text-gray-300">
                    <GraduationCap className="w-4 h-4 mr-2 text-blue-500 flex-shrink-0" />
                    <span className="truncate">{author.prf_degree_program}</span>
                  </div>
                )}
              </div>

              {author.prf_author_bio && (
                <p className="text-sm text-gray-700 dark:text-gray-300 mb-3 line-clamp-3">
                  {author.prf_author_bio}
                </p>
              )}

              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Published Works: {author.publishedWorksCount}
                </p>
                <span className="text-blue-600 dark:text-blue-400 text-sm font-medium">
                  View Profile →
                </span>
              </div>
            </Link>
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
