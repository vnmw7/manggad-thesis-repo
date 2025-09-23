/*
System: Suno Automation
Module: Book Search Page
Purpose: Handle search queries from header navigation and display results
*/

"use client";

import React, { useEffect, useState, useCallback, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { FaSearch, FaFilter, FaBook, FaCalendarAlt, FaArrowLeft } from "react-icons/fa";
import Image from "next/image";
import { searchBooks, Book } from "@/lib/api";

const GlassmorphicCard = ({
  children,
  className,
  hoverEffect = false,
}: {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
}) => {
  return (
    <motion.div
      whileHover={
        hoverEffect
          ? {
              y: -5,
              boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)",
              transition: { duration: 0.2 },
            }
          : {}
      }
      className={cn(
        "dark:shadow-2xl/20 relative overflow-hidden rounded-xl border border-white/20 bg-white/70 p-6 shadow-xl backdrop-blur-sm transition-all dark:border-gray-800/30 dark:bg-gray-900/50",
        className,
      )}
    >
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-blue-100/20 to-indigo-100/5 opacity-30 dark:from-blue-900/10 dark:to-indigo-900/5"></div>
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
};

interface FilterCheckboxStatus {
  [key: string]: boolean;
}

function SearchContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [books, setBooks] = useState<Book[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [searchError, setSearchError] = useState<string>("");
  const [showFilters, setShowFilters] = useState(false);
  const [filterYear, setFilterYear] = useState("");
  const [filterCheckboxStatus, setFilterCheckboxStatus] = useState<FilterCheckboxStatus>({
    "School of Architecture, Fine Arts, and Interior Design (SARFAID)": false,
    "School of Business and Information Technology (SBIT)": false,
    "School of Hospitality and Tourism Management (SHTM)": false,
    "School of Sciences, Liberal Arts, and Teacher Education (SSLATE)": false,
    "BS in Architecture": false,
    "BS in Fine Arts": false,
    "BS in Interior Design": false,
    "BS in Business Administration": false,
    "BS in Information Technology": false,
    "BS in Hospitality Management": false,
    "BS in Tourism Management": false,
    "BS in English": false,
    "BS in Filipino": false,
    "BS in Basic Education": false,
    "BS in Psychology": false,
  });

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  };

  const staggerChildren = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const performSearch = useCallback(async (query: string) => {
    if (!query.trim()) {
      setBooks([]);
      return;
    }

    setIsLoading(true);
    setSearchError("");

    try {
      const result = await searchBooks({
        filterAndSearchQuery: query,
        year: filterYear ? parseInt(filterYear) : undefined,
        departments: Object.keys(filterCheckboxStatus).filter(
          (key) => filterCheckboxStatus[key] && key.includes("School of"),
        ),
        programs: Object.keys(filterCheckboxStatus).filter(
          (key) => filterCheckboxStatus[key] && key.includes("BS in"),
        ),
      });

      if (!result.success) {
        throw new Error(result.error || "Search failed");
      }

      setBooks(result.data || []);
    } catch (error) {
      console.error("Error searching books:", error);
      setSearchError("Search failed. Please try again or adjust your search terms.");
      setBooks([]);
    } finally {
      setIsLoading(false);
    }
  }, [filterYear, filterCheckboxStatus]);

  // Get query from URL on component mount and perform search
  useEffect(() => {
    const query = searchParams.get("query");
    if (query) {
      setSearchQuery(query);
      performSearch(query);
    }
  }, [searchParams, performSearch]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Update the URL with the new search query
    const params = new URLSearchParams();
    if (searchQuery.trim()) {
      params.set("query", searchQuery);
    }
    router.push(`/book/search?${params.toString()}`);

    // Perform the search
    performSearch(searchQuery);
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    setFilterCheckboxStatus((prevStatus) => ({
      ...prevStatus,
      [value]: checked,
    }));
  };

  const handleBookClick = (bookId: string) => {
    router.push(`/book/${bookId}`);
  };

  const handleBackClick = () => {
    router.push("/home");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <button
          onClick={handleBackClick}
          className="mb-6 flex items-center text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
        >
          <FaArrowLeft className="mr-2" />
          Back to Home
        </button>

        {/* Page Header */}
        <GlassmorphicCard className="mb-8 overflow-hidden rounded-xl p-6">
          <motion.h1
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className="text-3xl font-bold text-[#0A379C] dark:text-blue-300"
          >
            Search Results
          </motion.h1>
          {searchQuery && (
            <motion.p
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              className="mt-2 text-gray-600 dark:text-gray-300"
            >
              Searching for: <span className="font-semibold">{searchQuery}</span>
            </motion.p>
          )}
        </GlassmorphicCard>

        {/* Search Bar */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="mb-8"
        >
          <GlassmorphicCard className="overflow-hidden rounded-xl p-6">
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <div className="relative flex-1">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search for documents, research papers, and more..."
                    className="w-full rounded-lg border border-gray-300 bg-white/70 px-4 py-3 pr-4 pl-10 text-gray-700 focus:border-[#053fa8] focus:ring-2 focus:ring-[#053fa8]/50 focus:outline-none dark:border-gray-600 dark:bg-gray-800/70 dark:text-white dark:focus:border-blue-500"
                  />
                  <FaSearch className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-gray-400 dark:text-gray-500" />
                </div>
                <button
                  type="button"
                  onClick={() => setShowFilters(!showFilters)}
                  className="rounded-lg border border-gray-300 bg-white/70 px-5 py-3 font-medium text-gray-700 transition-colors hover:bg-gray-100 focus:ring-2 focus:ring-gray-300 focus:outline-none dark:border-gray-600 dark:bg-gray-800/70 dark:text-white dark:hover:bg-gray-700"
                >
                  <FaFilter className="h-5 w-5" />
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="rounded-lg bg-[#053fa8] px-5 py-3 font-medium text-white transition-colors hover:bg-[#053fa8]/90 focus:ring-2 focus:ring-[#053fa8]/50 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 dark:bg-[#053fa8] dark:hover:bg-[#053fa8]/80"
                >
                  {isLoading ? "Searching..." : "Search"}
                </button>
              </div>

              {/* Error Message */}
              {searchError && (
                <div className="mt-4 rounded-lg border border-red-200 bg-red-50/70 p-3 dark:border-red-900 dark:bg-red-900/20">
                  <div className="flex items-center">
                    <span className="text-sm text-red-700 dark:text-red-300">
                      {searchError}
                    </span>
                  </div>
                </div>
              )}

              {/* Filter Section */}
              {showFilters && (
                <div className="mt-4 rounded-lg border border-gray-200 bg-white/70 p-4 dark:border-gray-700 dark:bg-gray-800/50">
                  <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Year Published
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="number"
                          name="year"
                          value={filterYear}
                          onChange={(e) => setFilterYear(e.target.value)}
                          className="w-full rounded border border-gray-300 px-3 py-2 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                          placeholder="Year"
                          min="2020"
                        />
                      </div>
                    </div>

                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Department
                      </label>
                      <div className="flex flex-col gap-2">
                        {[
                          "School of Architecture, Fine Arts, and Interior Design (SARFAID)",
                          "School of Business and Information Technology (SBIT)",
                          "School of Hospitality and Tourism Management (SHTM)",
                          "School of Sciences, Liberal Arts, and Teacher Education (SSLATE)",
                        ].map((dept) => (
                          <label key={dept} className="flex items-center">
                            <input
                              type="checkbox"
                              name="department"
                              checked={filterCheckboxStatus[dept]}
                              onChange={handleCheckboxChange}
                              value={dept}
                              className="mr-2"
                            />
                            <span className="text-gray-700 dark:text-gray-300">
                              {dept}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Programs
                      </label>
                      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
                        {[
                          "BS in Architecture",
                          "BS in Fine Arts",
                          "BS in Interior Design",
                          "BS in Business Administration",
                          "BS in Information Technology",
                          "BS in Hospitality Management",
                          "BS in Tourism Management",
                          "BS in English",
                          "BS in Filipino",
                          "BS in Basic Education",
                          "BS in Psychology",
                        ].map((program) => (
                          <label key={program} className="flex items-center">
                            <input
                              type="checkbox"
                              name="program"
                              checked={filterCheckboxStatus[program]}
                              onChange={handleCheckboxChange}
                              value={program}
                              className="mr-2"
                            />
                            <span className="text-gray-700 dark:text-gray-300">
                              {program}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </form>
          </GlassmorphicCard>
        </motion.div>

        {/* Book Results */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerChildren}
        >
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {isLoading ? (
              <div className="col-span-full py-12 text-center">
                <div className="mx-auto h-16 w-16 animate-spin rounded-full border-4 border-gray-300 border-t-blue-600 dark:border-gray-600 dark:border-t-blue-400"></div>
                <p className="mt-4 text-xl text-gray-500 dark:text-gray-400">
                  Loading books...
                </p>
              </div>
            ) : books.length > 0 ? (
              books.map((book) => (
                <motion.div
                  key={book.id}
                  variants={fadeIn}
                  className="cursor-pointer"
                >
                  <GlassmorphicCard hoverEffect className="h-full">
                    <div className="flex h-full flex-col">
                      {book.coverImage && (
                        <div className="relative mb-4 h-48 w-full flex-shrink-0 overflow-hidden rounded-lg">
                          <Image
                            src={book.coverImage || "/defaults/defaultBookCover.png"}
                            alt={book.title}
                            fill
                            className="object-cover transition-opacity duration-300 group-hover:opacity-20"
                          />
                        </div>
                      )}
                      <div className="flex flex-grow flex-col">
                        <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-white">
                          {book.title}
                        </h3>
                        <p className="mb-1 text-sm text-gray-600 dark:text-gray-400">
                          Year: {book.degreeAwarded}
                        </p>
                        <p className="mb-2 line-clamp-3 flex-grow text-xs text-gray-500 dark:text-gray-400">
                          {book.abstract}
                        </p>
                        <div className="mt-4 flex items-center justify-between">
                          <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                            <FaCalendarAlt />
                            <span>{book.degreeAwarded}</span>
                          </div>
                          <button
                            onClick={() => handleBookClick(book.id)}
                            className="rounded-lg bg-blue-500 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700"
                          >
                            View Details
                          </button>
                        </div>
                      </div>
                    </div>
                  </GlassmorphicCard>
                </motion.div>
              ))
            ) : (
              <div className="col-span-full py-12 text-center">
                <FaBook className="mx-auto h-16 w-16 text-gray-300 dark:text-gray-600" />
                <p className="mt-4 text-xl text-gray-500 dark:text-gray-400">
                  {searchQuery
                    ? "No books found. Try adjusting your search criteria."
                    : "Enter a search query to find books."}
                </p>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    }>
      <SearchContent />
    </Suspense>
  );
}