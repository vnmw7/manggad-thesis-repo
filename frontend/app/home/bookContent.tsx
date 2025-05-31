"use client";

import React, {
  ChangeEvent,
  FormEvent,
  useEffect,
  useState,
  useCallback, // Added useCallback
} from "react";
import { useRouter } from "next/navigation"; // Assuming next/navigation for useRouter
import { motion } from "framer-motion"; // Assuming framer-motion for animations
import { cn } from "@/lib/utils"; // Assuming cn utility is in lib/utils
import {
  FaSearch,
  FaFilter,
  FaTimes,
  FaBook,
  FaCalendarAlt,
} from "react-icons/fa"; // Assuming react-icons
import Image from "next/image"; // Assuming next/image
import { supabase } from "@/lib/supabase"; // Import Supabase client

// GlassmorphicCard component definition (ensure this is correctly defined or imported)
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
      {/* Subtle inner gradient */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-blue-100/20 to-indigo-100/5 opacity-30 dark:from-blue-900/10 dark:to-indigo-900/5"></div>

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
};

interface FilterCheckboxStatus {
  [key: string]: boolean;
}

interface BookContentProps {
  // Added interface for props
  onContentChange: (content: "bookDetail", bookId: string) => void;
}

export default function BookContent({ onContentChange }: BookContentProps) {
  // Destructure onContentChange from props
  const router = useRouter();

  const [books, setBooks] = useState<
    {
      id: string; // Changed from number to string to align with typical ObjectId from DB
      title: string;
      yearOfSubmission: number;
      coverImage: string;
      recommendations: number;
      abstract: string;
      keywords: string;
    }[]
  >([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [showFilters, setShowFilters] = useState(false);
  const [filterYear, setFilterYear] = useState("");
  const [filterCheckboxStatus, setFilterCheckboxStatus] =
    useState<FilterCheckboxStatus>({
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
  const [filterSentence, setFilterSentence] = useState("");
  const [filterAndSearchQuery, setFilterAndSearchQuery] = useState<string>("");

  // Animation variants
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

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    setFilterCheckboxStatus((prevStatus) => ({
      ...prevStatus,
      [value]: checked,
    }));
  };

  // Function to update filter sentence and combined query
  useEffect(() => {
    let sentence = "";

    if (filterYear) {
      sentence += `${filterYear}, `;
    }

    const selectedDepartments = Object.keys(filterCheckboxStatus).filter(
      (key) => filterCheckboxStatus[key],
    );

    if (selectedDepartments.length > 0) {
      sentence += selectedDepartments.join(", ");
    }

    const trimmedSentence = sentence.trim();
    setFilterSentence(trimmedSentence);
    // Combine searchQuery and trimmedSentence, then trim the result
    setFilterAndSearchQuery((searchQuery + " " + trimmedSentence).trim());
  }, [filterYear, filterCheckboxStatus, searchQuery]);

  // Get all books function, memoized with useCallback
  const getAllBooks = useCallback(async () => {
    try {
      const { data, error } = await supabase.from("thesis_tbl").select("*");

      if (error) {
        throw error;
      }

      setBooks(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching all books:", error);
      setBooks([]); // Set to empty array on error to prevent crashes
    }
  }, [setBooks]); // Added setBooks to dependency array

  // Fetch all books initially or when the search/filter query is cleared
  useEffect(() => {
    if (filterAndSearchQuery === "") {
      getAllBooks();
    }
    // When filterAndSearchQuery is not empty, results are fetched by handleSubmit
  }, [filterAndSearchQuery, getAllBooks]);

  // Handle search form submission
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!filterAndSearchQuery.trim()) {
      getAllBooks(); // Fetch all books if query is empty
    } else {
      // Fetch books based on the combined query
      try {
        const { data, error } = await supabase
          .from("thesis_tbl")
          .select("*")
          .textSearch("fts", filterAndSearchQuery, {
            type: "websearch",
            config: "english",
          });

        if (error) {
          throw error;
        }
        setBooks(data || []);
      } catch (error) {
        console.error("Error searching books:", error);
        setBooks([]); // Clear books on error
      }
    }
  };

  const handleBookClick = (bookId: string) => {
    onContentChange("bookDetail", bookId);
  };

  return (
    <div className="flex-1">
      <GlassmorphicCard className="mb-8 overflow-hidden rounded-xl p-6">
        <motion.h1
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="text-3xl font-bold text-[#0A379C] dark:text-blue-300"
        >
          Book Repository
        </motion.h1>
        <motion.p
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="mt-2 text-gray-600 dark:text-gray-300"
        >
          Explore our collection of theses, research papers, and academic
          publications
        </motion.p>
      </GlassmorphicCard>

      {/* Search Bar */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        className="mx-auto mt-8 w-full max-w-7xl px-4 lg:px-0"
      >
        <GlassmorphicCard className="overflow-hidden rounded-xl p-6">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <div className="relative flex-1">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={handleChange}
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
                className="rounded-lg bg-[#053fa8] px-5 py-3 font-medium text-white transition-colors hover:bg-[#053fa8]/90 focus:ring-2 focus:ring-[#053fa8]/50 focus:outline-none dark:bg-[#053fa8] dark:hover:bg-[#053fa8]/80"
              >
                Search
              </button>
            </div>

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

            {/* Active Filters Display */}
            {filterSentence && (
              <div className="mt-4 rounded-lg border border-blue-200 bg-blue-50/70 p-3 dark:border-blue-900 dark:bg-blue-900/20">
                <div className="flex items-center">
                  <span className="mr-2 text-sm font-medium text-blue-700 dark:text-blue-300">
                    Active Filters:
                  </span>
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    {filterSentence}
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      setFilterYear("");
                      setFilterCheckboxStatus(
                        Object.keys(filterCheckboxStatus).reduce(
                          (acc, key) => ({ ...acc, [key]: false }),
                          {},
                        ),
                      );
                    }}
                    className="ml-auto rounded-full bg-transparent p-1 text-blue-700 hover:bg-blue-100 dark:text-blue-300 dark:hover:bg-blue-800/30"
                    aria-label="Clear filters"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
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
        className="mx-auto mt-8 max-w-7xl px-4 lg:px-0"
      >
        <h2 className="mb-6 text-2xl font-bold text-blue-800 dark:text-blue-300">
          Research Collection
        </h2>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {books.length > 0 ? (
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
                          src={
                            book.coverImage || "/defaults/defaultBookCover.png"
                          }
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
                        Year: {book.yearOfSubmission}
                      </p>
                      <p className="mb-2 line-clamp-3 flex-grow text-xs text-gray-500 dark:text-gray-400">
                        {book.abstract}
                      </p>
                      <div className="mt-4 flex items-center justify-between">
                        <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                          <FaCalendarAlt />
                          <span>{book.yearOfSubmission}</span>
                        </div>
                        <button
                          onClick={() => handleBookClick(book.id)} // Updated onClick handler
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
                No books found. Try adjusting your search criteria.
              </p>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
