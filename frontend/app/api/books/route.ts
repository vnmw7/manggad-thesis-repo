import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

// GET /api/books - Get all books
export async function GET() {
  console.log("📚 Starting GET /api/books request...");

  try {
    // Simple test first
    console.log("🔍 Testing basic Supabase connection...");
    const { data: rawBooks, error } = await supabase
      .from("thesis_tbl")
      .select(
        `
        id,
        title,
        abstract,
        degreeAwarded,
        keywords,
        firstName,
        middleName,
        lastName,
        supervisors,
        department,
        program,
        created_at
      `,
      )
      .order("degreeAwarded", { ascending: false });

    if (error) {
      console.error("❌ Supabase error:", error);
      return NextResponse.json(
        {
          success: false,
          error: "Database query failed",
          details: error.message,
          code: error.code,
          hint: error.hint,
        },
        { status: 500 },
      );
    }

    // Transform the data to match frontend expectations
    const books =
      rawBooks?.map((book) => ({
        id: book.id,
        title: book.title,
        abstract: book.abstract,
        degreeAwarded: new Date(book.degreeAwarded).getFullYear(), // Extract year from date
        keywords: Array.isArray(book.keywords)
          ? book.keywords
          : [book.keywords || ""],
        authors: [book.firstName, book.middleName, book.lastName]
          .filter(Boolean)
          .join(" "),
        advisors: Array.isArray(book.supervisors)
          ? book.supervisors
          : [book.supervisors || "N/A"],
        department: book.department,
        program: book.program,
        coverImage: "/defaults/defaultBookCover.png", // Default cover image
        recommendations: 0, // Default value since column doesn't exist
        language: "English", // Default value since column doesn't exist
        created_at: book.created_at,
      })) || [];

    console.log(`✅ Successfully fetched ${books.length} books`);
    return NextResponse.json({
      success: true,
      data: books,
      count: books.length,
    });
  } catch (error) {
    console.error("💥 Unexpected error in GET /api/books:", error);

    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    const errorStack = error instanceof Error ? error.stack : "No stack trace";

    return NextResponse.json(
      {
        success: false,
        error: "Internal server error",
        details: errorMessage,
        stack: process.env.NODE_ENV === "development" ? errorStack : undefined,
      },
      { status: 500 },
    );
  }
}

// POST /api/books - Create a new book
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      title,
      abstract,
      keywords,
      firstName,
      middleName = "",
      lastName,
      degreeAwarded,
      department,
      program,
      degreeLevel = "Unspecified Degree Level",
      supervisors = ["N/A"],
      copyright = "Author holds copyright",
      thirdPartyCopyright = "no",
      license = "No License/All Rights Reserved",
      orcid = "",
      notes = "No notes.",
      thesis_document_url,
      supplementary_files_urls = [],
    } = body;

    // Validate required fields
    if (!title || !abstract || !firstName || !lastName || !degreeAwarded) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 },
      );
    }

    const { data: book, error } = await supabase
      .from("thesis_tbl")
      .insert([
        {
          title,
          abstract,
          firstName,
          middleName,
          lastName,
          department,
          program,
          degreeAwarded,
          keywords: Array.isArray(keywords)
            ? keywords
            : [keywords || "default"],
          degreeLevel,
          copyright,
          thirdPartyCopyright,
          license,
          supervisors: Array.isArray(supervisors)
            ? supervisors
            : [supervisors || "N/A"],
          orcid,
          notes,
          thesis_document_url,
          supplementary_files_urls: Array.isArray(supplementary_files_urls)
            ? supplementary_files_urls
            : [],
        },
      ])
      .select()
      .single();

    if (error) {
      console.error("Error creating book:", error);
      return NextResponse.json(
        { success: false, error: "Failed to create book" },
        { status: 500 },
      );
    }

    return NextResponse.json({
      success: true,
      data: book,
      message: "Book created successfully",
    });
  } catch (error) {
    console.error("Error in POST /api/books:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 },
    );
  }
}
