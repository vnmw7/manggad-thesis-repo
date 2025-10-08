/*
System: Suno Automation
Module: Book Detail Page
Purpose: Display detailed information about a specific book/thesis
*/

"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";
import { FaArrowLeft, FaCalendarAlt, FaUser, FaGraduationCap, FaBook, FaTag } from "react-icons/fa";
import { getBookById, Book } from "@/lib/api";
import { cn } from "@/lib/utils";

const GlassmorphicCard = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <motion.div
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

export default function BookDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [book, setBook] = useState<Book | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBook = async () => {
      if (!params.id || typeof params.id !== "string") {
        setError("Invalid book ID");
        setIsLoading(false);
        return;
      }

      try {
        const result = await getBookById(params.id);
        if (!result.success) {
          if (result.error?.includes("not found") || result.error?.includes("404")) {
            setError(`Thesis/Book with ID "${params.id}" was not found. It may have been removed or the ID is incorrect.`);
          } else {
            throw new Error(result.error || "Failed to fetch book details");
          }
        } else {
          setBook(result.data || null);
        }
      } catch (err) {
        console.error("Error fetching book:", err);
        if (err instanceof Error) {
          if (err.message.includes("not found") || err.message.includes("404")) {
            setError(`Thesis/Book with ID "${params.id}" was not found. It may have been removed or the ID is incorrect.`);
          } else if (err.message.includes("Failed to fetch")) {
            setError("Unable to connect to the database. Please try again later.");
          } else {
            setError("Failed to load book details. Please try again.");
          }
        } else {
          setError("An unexpected error occurred. Please try again.");
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchBook();
  }, [params.id]);

  const handleBackClick = () => {
    router.back();
  };

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

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="container mx-auto px-4 py-8">
          <button
            onClick={handleBackClick}
            className="mb-6 flex items-center text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
          >
            <FaArrowLeft className="mr-2" />
            Go Back
          </button>
          <GlassmorphicCard className="text-center">
            <p className="text-red-600 dark:text-red-400">{error}</p>
          </GlassmorphicCard>
        </div>
      </div>
    );
  }

  if (!book) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="container mx-auto px-4 py-8">
          <button
            onClick={handleBackClick}
            className="mb-6 flex items-center text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
          >
            <FaArrowLeft className="mr-2" />
            Go Back
          </button>
          <GlassmorphicCard className="text-center">
            <div className="mb-4">
              <div className="mx-auto w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center mb-4">
                <FaBook className="text-gray-400 dark:text-gray-500 text-2xl" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                Thesis/Book Not Found
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                The thesis/book you&apos;re looking for doesn&apos;t exist or has been removed.
              </p>
              <div className="space-y-2">
                <button
                  onClick={() => router.push('/')}
                  className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <FaBook className="mr-2" />
                  Browse All Theses
                </button>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  If you believe this is an error, please contact support.
                </div>
              </div>
            </div>
          </GlassmorphicCard>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <button
          onClick={handleBackClick}
          className="mb-6 flex items-center text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
        >
          <FaArrowLeft className="mr-2" />
          Go Back
        </button>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
        >
          {/* Left Column - Book Cover and Basic Info */}
          <div className="lg:col-span-1">
            <GlassmorphicCard>
              <div className="relative h-80 w-full mb-4 overflow-hidden rounded-lg">
                <Image
                  src={book.coverImage || "/defaults/defaultBookCover.png"}
                  alt={book.title}
                  fill
                  className="object-cover"
                />
              </div>
              <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
                {book.title}
              </h2>

              {/* Authors */}
              {book.authors && (
                <div className="flex items-start mb-3">
                  <FaUser className="mr-2 mt-1 text-gray-500 dark:text-gray-400" />
                  <div>
                    <p className="text-sm font-semibold text-gray-600 dark:text-gray-300">
                      Author(s)
                    </p>
                    <p className="text-sm text-gray-700 dark:text-gray-200">
                      {Array.isArray(book.authors) ? book.authors.join(", ") : book.authors}
                    </p>
                  </div>
                </div>
              )}

              {/* Advisors */}
              {book.advisors && (
                <div className="flex items-start mb-3">
                  <FaGraduationCap className="mr-2 mt-1 text-gray-500 dark:text-gray-400" />
                  <div>
                    <p className="text-sm font-semibold text-gray-600 dark:text-gray-300">
                      Advisor(s)
                    </p>
                    <p className="text-sm text-gray-700 dark:text-gray-200">
                      {Array.isArray(book.advisors) ? book.advisors.join(", ") : book.advisors}
                    </p>
                  </div>
                </div>
              )}

              {/* Year */}
              <div className="flex items-start mb-3">
                <FaCalendarAlt className="mr-2 mt-1 text-gray-500 dark:text-gray-400" />
                <div>
                  <p className="text-sm font-semibold text-gray-600 dark:text-gray-300">
                    Year Awarded
                  </p>
                  <p className="text-sm text-gray-700 dark:text-gray-200">
                    {book.degreeAwarded}
                  </p>
                </div>
              </div>

              {/* Department */}
              {book.department && (
                <div className="flex items-start mb-3">
                  <FaBook className="mr-2 mt-1 text-gray-500 dark:text-gray-400" />
                  <div>
                    <p className="text-sm font-semibold text-gray-600 dark:text-gray-300">
                      Department
                    </p>
                    <p className="text-sm text-gray-700 dark:text-gray-200">
                      {book.department}
                    </p>
                  </div>
                </div>
              )}

              {/* Program */}
              {book.program && (
                <div className="flex items-start mb-3">
                  <FaGraduationCap className="mr-2 mt-1 text-gray-500 dark:text-gray-400" />
                  <div>
                    <p className="text-sm font-semibold text-gray-600 dark:text-gray-300">
                      Program
                    </p>
                    <p className="text-sm text-gray-700 dark:text-gray-200">
                      {book.program}
                    </p>
                  </div>
                </div>
              )}
            </GlassmorphicCard>
          </div>

          {/* Right Column - Abstract and Keywords */}
          <div className="lg:col-span-2 space-y-6">
            {/* Abstract */}
            <GlassmorphicCard>
              <h3 className="text-2xl font-bold mb-4 text-[#0A379C] dark:text-blue-300">
                Abstract
              </h3>
              <p className="text-gray-700 dark:text-gray-200 leading-relaxed">
                {book.abstract || "No abstract available."}
              </p>
            </GlassmorphicCard>

            {/* Keywords */}
            {book.keywords && (
              <GlassmorphicCard>
                <h3 className="text-xl font-bold mb-4 text-[#0A379C] dark:text-blue-300">
                  Keywords
                </h3>
                <div className="flex flex-wrap gap-2">
                  {(Array.isArray(book.keywords) ? book.keywords : [book.keywords]).map((keyword, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                    >
                      <FaTag className="mr-1 text-xs" />
                      {keyword}
                    </span>
                  ))}
                </div>
              </GlassmorphicCard>
            )}

            {/* Additional Information */}
            {book.language && (
              <GlassmorphicCard>
                <h3 className="text-xl font-bold mb-4 text-[#0A379C] dark:text-blue-300">
                  Additional Information
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-semibold text-gray-600 dark:text-gray-300">
                      Language
                    </p>
                    <p className="text-sm text-gray-700 dark:text-gray-200">
                      {book.language}
                    </p>
                  </div>
                  {book.recommendations !== undefined && (
                    <div>
                      <p className="text-sm font-semibold text-gray-600 dark:text-gray-300">
                        Recommendations
                      </p>
                      <p className="text-sm text-gray-700 dark:text-gray-200">
                        {book.recommendations}
                      </p>
                    </div>
                  )}
                </div>
              </GlassmorphicCard>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}