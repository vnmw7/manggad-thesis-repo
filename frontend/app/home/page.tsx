"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { useRouter, useSearchParams } from "next/navigation";
import { AnimatedGridPattern } from "@/components/magicui/animated-grid-pattern";
import Header from "../_components/Header";
import Footer from "../_components/Footer";
import SideNav from "../_components/SideNav";
import HomeContent from "./homeContent";
import ContactContent from "./contactContent";
import BookContent from "./bookContent";
import DashboardContent from "./dashboardContent";
import AuthorContent from "./authorContent";
import AddThesisSection from "@/components/spaSections/AddThesisSection";
import ViewEditThesisSection from "@/components/spaSections/ViewEditThesisSection";
import { BookDetailContent } from "./bookDetailContent";

export default function HomePage() {
  const { resolvedTheme } = useTheme();
  const router = useRouter();
  const searchParams = useSearchParams();
  const paramsString = searchParams.toString();
  const [externalSearchQuery, setExternalSearchQuery] = useState<string | null>(null);
  const [isUrlSyncDisabled, setIsUrlSyncDisabled] = useState(false);
  const [activeContent, setActiveContent] = useState<
    | "home"
    | "contact"
    | "book"
    | "dashboard"
    | "authors"
    | "add thesis"
    | "view thesis"
    | "bookDetail"
  >("home");
  const [selectedBookId, setSelectedBookId] = useState<string | null>(null);

  const handleContentChange = (
    content:
      | "home"
      | "contact"
      | "book"
      | "dashboard"
      | "authors"
      | "add thesis"
      | "view thesis"
      | "bookDetail",
    bookId?: string,
  ) => {
    if (content !== "book") {
      setIsUrlSyncDisabled(true);
      router.replace("/home");
    } else {
      setIsUrlSyncDisabled(false);
    }

    setActiveContent(content);
    if (content === "bookDetail" && bookId) {
      setSelectedBookId(bookId);
    } else {
      setSelectedBookId(null);
    }
  };

  useEffect(() => {
    console.log("Current theme:", resolvedTheme);
    console.log(
      "HTML dark class:",
      document.documentElement.classList.contains("dark"),
    );
  }, [resolvedTheme]);

  useEffect(() => {
    const params = new URLSearchParams(paramsString);
    const viewParam = params.get("view");
    const queryParam = params.get("query");

    if (!queryParam) {
      if (externalSearchQuery !== null) {
        setExternalSearchQuery(null);
      }

      if (isUrlSyncDisabled) {
        setIsUrlSyncDisabled(false);
      }

      return;
    }

    if (queryParam !== externalSearchQuery) {
      setExternalSearchQuery(queryParam);
    }

    if (!isUrlSyncDisabled && (viewParam === "book" || !viewParam) && activeContent !== "book" && activeContent !== "bookDetail") {
      setActiveContent("book");
      setSelectedBookId(null);
    }
  }, [paramsString, externalSearchQuery, activeContent, isUrlSyncDisabled]);

  return (
    <div className="flex min-h-screen w-full flex-col overflow-hidden bg-gradient-to-br from-blue-50/80 to-indigo-50/80 dark:from-gray-900 dark:to-gray-950">
      {/* Animated Grid Pattern Background - Now covering the entire page with fixed positioning */}
      <div className="pointer-events-none fixed inset-0 h-screen w-screen opacity-30 dark:opacity-40">
        <AnimatedGridPattern
          width={50}
          height={50}
          className="h-full w-full fill-black/15 text-black/25 dark:fill-white/10 dark:text-white/20"
          numSquares={100}
          maxOpacity={0.4}
          duration={5}
        />
      </div>

      <Header />

      {/* Main Content with Sidebar under the banner */}
      <div className="flex flex-1 flex-col lg:flex-row">
        <div className="lg:sticky lg:top-0 lg:self-start">
          <SideNav onContentChange={handleContentChange} />
        </div>

        <div className="flex-1 overflow-y-auto p-4 lg:mr-4">
          {activeContent === "home" && <HomeContent />}
          {activeContent === "contact" && <ContactContent />}
          {activeContent === "authors" && <AuthorContent />}
          {activeContent === "book" && (
            <BookContent
              key={externalSearchQuery ? `book-${externalSearchQuery}` : "book-default"}
              onContentChange={handleContentChange}
              initialSearchQuery={externalSearchQuery ?? ""}
            />
          )}
          {activeContent === "dashboard" && <DashboardContent />}
          {activeContent === "add thesis" && <AddThesisSection />}
          {activeContent === "view thesis" && <ViewEditThesisSection />}
          {activeContent === "bookDetail" && selectedBookId && (
            <BookDetailContent bookId={selectedBookId} />
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}

