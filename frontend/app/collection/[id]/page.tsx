"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "@/lib/supabase";
import Image from "next/image";
import {
  FaBook,
  FaCalendarAlt,
  FaUserGraduate,
  FaUniversity,
  FaFileAlt,
  FaTags,
  FaCopyright,
  FaShieldAlt,
  FaProjectDiagram,
  FaInfoCircle,
  FaFilePdf,
  FaPaperclip,
} from "react-icons/fa";

interface BookDetails {
  id: string;
  title: string;
  yearOfSubmission: number;
  coverImage: string;
  abstract: string;
  keywords: string;
  firstName?: string;
  middleName?: string;
  lastName?: string;
  department?: string;
  program?: string;
  degreeAwarded?: string | Date;
  degreeLevel?: string;
  copyright?: string;
  thirdPartyCopyright?: string;
  license?: string;
  supervisors?: string[];
  orcid?: string;
  notes?: string;
  thesis_document_url?: string;
  supplementary_files_urls?: string[];
}

const GlassmorphicCard = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={`dark:shadow-2xl/20 relative overflow-hidden rounded-xl border border-white/20 bg-white/70 p-6 shadow-xl backdrop-blur-sm transition-all dark:border-gray-800/30 dark:bg-gray-900/50 ${className}`}
    >
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-blue-100/20 to-indigo-100/5 opacity-30 dark:from-blue-900/10 dark:to-indigo-900/5"></div>
      <div className="relative z-10">{children}</div>
    </div>
  );
};

const DetailItem = ({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: React.ReactNode;
}) => (
  <div className="flex items-start space-x-3">
    <span className="mt-1 text-blue-500 dark:text-blue-400">{icon}</span>
    <div>
      <p className="font-semibold text-gray-700 dark:text-gray-300">{label}</p>
      <p className="text-gray-600 dark:text-gray-400">{value || "N/A"}</p>
    </div>
  </div>
);

export default function BookDetailPage() {
  const params = useParams();
  const id = params?.id as string;
  const [book, setBook] = useState<BookDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      const fetchBookDetails = async () => {
        setLoading(true);
        setError(null);
        try {
          const { data, error: supabaseError } = await supabase
            .from("thesis_tbl")
            .select("*")
            .eq("id", id)
            .single();

          if (supabaseError) {
            throw supabaseError;
          }
          setBook(data);
        } catch (err: any) {
          console.error("Error fetching book details:", err);
          setError(err.message || "Failed to fetch book details.");
        } finally {
          setLoading(false);
        }
      };
      fetchBookDetails();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-gray-900">
        <p className="text-xl text-gray-700 dark:text-gray-300">
          Loading book details...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-gray-900">
        <GlassmorphicCard className="text-center">
          <h2 className="text-2xl font-bold text-red-600 dark:text-red-400">
            Error
          </h2>
          <p className="mt-2 text-gray-700 dark:text-gray-300">{error}</p>
        </GlassmorphicCard>
      </div>
    );
  }

  if (!book) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-gray-900">
        <GlassmorphicCard className="text-center">
          <FaBook className="mx-auto h-20 w-20 text-gray-400 dark:text-gray-500" />
          <h2 className="mt-4 text-2xl font-bold text-gray-700 dark:text-gray-300">
            Book Not Found
          </h2>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            The book you are looking for does not exist or could not be loaded.
          </p>
        </GlassmorphicCard>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-indigo-50 to-purple-100 px-4 py-8 sm:px-6 lg:px-8 dark:from-gray-800 dark:via-gray-900 dark:to-black">
      <div className="mx-auto max-w-4xl">
        <GlassmorphicCard className="mb-8">
          <div className="flex flex-col items-center md:flex-row md:space-x-6">
            {book.coverImage && (
              <div className="relative mb-6 h-80 w-60 flex-shrink-0 overflow-hidden rounded-lg shadow-lg md:mb-0">
                <Image
                  src={book.coverImage}
                  alt={`Cover of ${book.title}`}
                  layout="fill"
                  objectFit="cover"
                  className="transition-transform duration-300 hover:scale-105"
                />
              </div>
            )}
            <div className="text-center md:text-left">
              <h1 className="text-3xl font-bold text-blue-700 sm:text-4xl dark:text-blue-300">
                {book.title}
              </h1>
              <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
                By: {book.firstName || ""} {book.middleName || ""}{" "}
                {book.lastName || "N/A"}
              </p>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-500">
                <FaCalendarAlt className="mr-1 inline" /> Submitted:{" "}
                {book.yearOfSubmission}
              </p>
            </div>
          </div>
        </GlassmorphicCard>

        <GlassmorphicCard>
          <h2 className="mb-6 border-b border-gray-300/50 pb-3 text-2xl font-semibold text-blue-600 dark:text-blue-400">
            Detailed Information
          </h2>
          <div className="grid grid-cols-1 gap-x-6 gap-y-8 md:grid-cols-2">
            <DetailItem
              icon={<FaFileAlt />}
              label="Abstract"
              value={<p className="whitespace-pre-wrap">{book.abstract}</p>}
            />
            <DetailItem
              icon={<FaTags />}
              label="Keywords"
              value={book.keywords || "N/A"}
            />
            <DetailItem
              icon={<FaUniversity />}
              label="Department"
              value={book.department}
            />
            <DetailItem
              icon={<FaUserGraduate />}
              label="Program"
              value={book.program}
            />
            {book.degreeAwarded &&
              (() => {
                // Attempt to parse degreeAwarded; if it's already a Date object, new Date() handles it.
                // If it's a string, it attempts to parse. Cast to allow Date constructor.
                const date = new Date(
                  book.degreeAwarded as string | Date | number,
                );
                // Check if the parsed date is valid.
                const displayValue = !isNaN(date.getTime())
                  ? date.toLocaleDateString() // Format if valid
                  : String(book.degreeAwarded); // Otherwise, display the original string value.
                return (
                  <DetailItem
                    icon={<FaCalendarAlt />}
                    label="Degree Awarded Date"
                    value={displayValue}
                  />
                );
              })()}
            <DetailItem
              icon={<FaProjectDiagram />}
              label="Degree Level"
              value={book.degreeLevel}
            />
            <DetailItem
              icon={<FaCopyright />}
              label="Copyright"
              value={book.copyright}
            />
            {book.thirdPartyCopyright && (
              <DetailItem
                icon={<FaShieldAlt />}
                label="Third-Party Copyright"
                value={book.thirdPartyCopyright}
              />
            )}
            <DetailItem
              icon={<FaShieldAlt />}
              label="License"
              value={book.license}
            />
            {book.supervisors && book.supervisors.length > 0 && (
              <DetailItem
                icon={<FaUserGraduate />}
                label="Supervisors"
                value={book.supervisors.join(", ")}
              />
            )}
            {book.orcid && (
              <DetailItem
                icon={<FaInfoCircle />}
                label="ORCID"
                value={book.orcid}
              />
            )}
            {book.notes && (
              <DetailItem
                icon={<FaInfoCircle />}
                label="Notes"
                value={book.notes}
              />
            )}

            {book.thesis_document_url && (
              <DetailItem
                icon={<FaFilePdf />}
                label="Thesis Document"
                value={
                  <a
                    href={book.thesis_document_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline dark:text-blue-400"
                  >
                    View PDF
                  </a>
                }
              />
            )}
            {book.supplementary_files_urls &&
              book.supplementary_files_urls.length > 0 && (
                <DetailItem
                  icon={<FaPaperclip />}
                  label="Supplementary Files"
                  value={
                    <ul className="list-disc pl-5">
                      {book.supplementary_files_urls.map((url, index) => (
                        <li key={index}>
                          <a
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-500 hover:underline dark:text-blue-400"
                          >
                            File {index + 1}
                          </a>
                        </li>
                      ))}
                    </ul>
                  }
                />
              )}
          </div>
        </GlassmorphicCard>
      </div>
    </div>
  );
}
