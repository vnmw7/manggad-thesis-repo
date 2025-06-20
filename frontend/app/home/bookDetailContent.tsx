"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  FaBook,
  FaFileAlt,
  FaTags,
  FaUniversity,
  FaUserGraduate,
  FaCalendarAlt,
  FaProjectDiagram,
  FaCopyright,
  FaShieldAlt,
  FaUserFriends,
  FaStickyNote,
  FaDownload,
  FaPaperclip,
  FaCopy,
  FaCheck,
} from "react-icons/fa";
import { getBookById } from "@/lib/api";
import { Button } from "@/app/_components/ui/button";

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

interface BookDetailContentProps {
  bookId: string;
}

export function BookDetailContent({ bookId }: BookDetailContentProps) {
  const [book, setBook] = useState<BookDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [citationCopied, setCitationCopied] = useState(false);

  // Function to generate APA citation
  const generateAPACitation = (book: BookDetails): string => {
    const author = [book.firstName, book.middleName, book.lastName]
      .filter(Boolean)
      .join(" ");

    const year = book.yearOfSubmission || new Date().getFullYear();
    const title = book.title;
    const degreeLevel = book.degreeLevel || "Thesis";
    const department = book.department || "";
    const university = "La Consolacion College Bacolod"; // Default university name

    // Format: Author, A. A. (Year). Title of thesis [Degree type]. University Name.
    let citation = "";

    if (author) {
      citation += `${author}. `;
    }

    citation += `(${year}). `;
    citation += `*${title}* `;
    citation += `[${degreeLevel}`;

    if (department) {
      citation += `, ${department}`;
    }

    citation += `]. ${university}.`;

    return citation;
  };

  // Function to copy citation to clipboard
  const copyCitation = async () => {
    if (!book) return;

    try {
      const citation = generateAPACitation(book);
      await navigator.clipboard.writeText(citation);
      setCitationCopied(true);

      // Reset the copied state after 2 seconds
      setTimeout(() => {
        setCitationCopied(false);
      }, 2000);
    } catch (err) {
      console.error("Failed to copy citation:", err);
      // Fallback for older browsers
      const textArea = document.createElement("textarea");
      textArea.value = generateAPACitation(book);
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      setCitationCopied(true);
      setTimeout(() => {
        setCitationCopied(false);
      }, 2000);
    }
  };

  useEffect(() => {
    if (bookId) {
      const fetchBookDetails = async () => {
        setLoading(true);
        setError(null);
        try {
          const result = await getBookById(bookId);

          if (!result.success) {
            throw new Error(result.error || "Failed to fetch book details");
          }

          // Transform the API response to BookDetails format
          // The API returns all database fields, but Book interface is incomplete
          const dbData = result.data as any; // Cast as any to access all database fields

          if (dbData) {
            const transformedBook: BookDetails = {
              id: dbData.id,
              title: dbData.title,
              yearOfSubmission: dbData.degreeAwarded
                ? typeof dbData.degreeAwarded === "string"
                  ? new Date(dbData.degreeAwarded).getFullYear()
                  : dbData.degreeAwarded
                : new Date().getFullYear(),
              coverImage: dbData.coverImage || "/defaults/defaultBookCover.png",
              abstract: dbData.abstract || "",
              keywords: Array.isArray(dbData.keywords)
                ? dbData.keywords.join(", ")
                : dbData.keywords || "",
              firstName: dbData.firstName,
              middleName: dbData.middleName,
              lastName: dbData.lastName,
              department: dbData.department,
              program: dbData.program,
              degreeAwarded: dbData.degreeAwarded,
              degreeLevel: dbData.degreeLevel,
              copyright: dbData.copyright,
              thirdPartyCopyright: dbData.thirdPartyCopyright,
              license: dbData.license,
              supervisors: Array.isArray(dbData.supervisors)
                ? dbData.supervisors
                : dbData.supervisors
                  ? [dbData.supervisors]
                  : undefined,
              orcid: dbData.orcid,
              notes: dbData.notes,
              thesis_document_url: dbData.thesis_document_url,
              supplementary_files_urls: dbData.supplementary_files_urls,
            };
            setBook(transformedBook);
          }
        } catch (err: any) {
          console.error("Error fetching book details:", err);
          setError(err.message || "Failed to fetch book details.");
        } finally {
          setLoading(false);
        }
      };
      fetchBookDetails();
    }
  }, [bookId]);

  if (loading) {
    return (
      <div className="flex min-h-[calc(100vh-200px)] items-center justify-center">
        {" "}
        {/* Adjusted height */}
        <p className="text-xl text-gray-700 dark:text-gray-300">
          Loading book details...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-[calc(100vh-200px)] items-center justify-center">
        {" "}
        {/* Adjusted height */}
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
      <div className="flex min-h-[calc(100vh-200px)] items-center justify-center">
        {" "}
        {/* Adjusted height */}
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
    <div
      className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8"
      data-test-id="book-detail-content"
    >
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
            {(book.firstName || book.lastName) && (
              <p className="mt-2 text-xl text-gray-600 dark:text-gray-400">
                By: {book.firstName} {book.middleName} {book.lastName}
              </p>
            )}
            <p className="mt-1 text-lg text-indigo-600 dark:text-indigo-400">
              Year: {book.yearOfSubmission}
            </p>
            {book.orcid && (
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-500">
                ORCID: {book.orcid}
              </p>
            )}
          </div>
        </div>
      </GlassmorphicCard>

      {/* APA Citation Section */}
      <GlassmorphicCard className="mb-8">
        <h2 className="mb-4 border-b border-gray-300/50 pb-3 text-2xl font-semibold text-blue-600 dark:text-blue-400">
          APA Citation
        </h2>
        <div className="rounded-lg bg-gray-50 p-4 dark:bg-gray-800/50">
          <p className="mb-4 text-sm leading-relaxed text-gray-700 dark:text-gray-300">
            {generateAPACitation(book)}
          </p>
          <Button
            onClick={copyCitation}
            variant="outline"
            size="sm"
            className="flex items-center space-x-2 transition-all duration-200"
            disabled={citationCopied}
          >
            {citationCopied ? (
              <>
                <FaCheck className="h-4 w-4 text-green-600" />
                <span>Copied!</span>
              </>
            ) : (
              <>
                <FaCopy className="h-4 w-4" />
                <span>Copy Citation</span>
              </>
            )}
          </Button>
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
            value={<span className="whitespace-pre-wrap">{book.abstract}</span>}
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
          <DetailItem
            icon={<FaCalendarAlt />}
            label="Degree Awarded"
            value={
              book.degreeAwarded
                ? new Date(book.degreeAwarded).toLocaleDateString()
                : "N/A"
            }
          />
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
          <DetailItem
            icon={<FaCopyright />}
            label="Third Party Copyright"
            value={book.thirdPartyCopyright}
          />
          <DetailItem
            icon={<FaShieldAlt />}
            label="License"
            value={book.license}
          />
          {book.supervisors && book.supervisors.length > 0 && (
            <DetailItem
              icon={<FaUserFriends />}
              label="Supervisors"
              value={book.supervisors.join(", ")}
            />
          )}
          <DetailItem
            icon={<FaStickyNote />}
            label="Notes"
            value={book.notes}
          />
          {book.thesis_document_url && (
            <DetailItem
              icon={<FaDownload />}
              label="Thesis Document"
              value={
                <a
                  href={book.thesis_document_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline dark:text-blue-400"
                >
                  Download/View Thesis
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

      {book.thesis_document_url &&
        book.thesis_document_url.toLowerCase().endsWith(".pdf") && (
          <GlassmorphicCard className="mt-8">
            <h2 className="mb-6 border-b border-gray-300/50 pb-3 text-2xl font-semibold text-blue-600 dark:text-blue-400">
              Thesis Preview
            </h2>
            <div className="aspect-[8.5/11] w-full">
              <iframe
                src={book.thesis_document_url}
                title="Thesis Document Preview"
                className="h-full w-full rounded-lg border border-gray-300/50"
                allowFullScreen
              />
            </div>{" "}
          </GlassmorphicCard>
        )}
    </div>
  );
}
