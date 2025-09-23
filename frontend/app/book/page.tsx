/*
System: Suno Automation
Module: Book Main Page
Purpose: Display all books and handle navigation to book-related pages
*/

"use client";

import BookContent from "../home/bookContent";
import { useRouter } from "next/navigation";

export default function BookPage() {
  const router = useRouter();

  const handleContentChange = (content: string, bookId?: string) => {
    if (content === "bookDetail" && bookId) {
      router.push(`/book/${bookId}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-8">
        <BookContent onContentChange={handleContentChange} />
      </div>
    </div>
  );
}