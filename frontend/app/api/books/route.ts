import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

// GET /api/books - Get all books
export async function GET() {
  console.log("📚 Starting GET /api/books request...");

  try {
    // Simple test first
    console.log("🔍 Testing basic Supabase connection...");

    const { data: books, error } = await supabase
      .from("thesis_tbl")
      .select(
        `
        id,
        title,
        abstract,
        yearOfSubmission,
        coverImage,
        recommendations,
        keywords,
        language,
        authors,
        advisors,
        department,
        program,
        created_at
      `,
      )
      .order("yearOfSubmission", { ascending: false });

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

    console.log(`✅ Successfully fetched ${books?.length || 0} books`);

    return NextResponse.json({
      success: true,
      data: books || [],
      count: books?.length || 0,
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
      language,
      keywords,
      yearOfSubmission,
      authors,
      advisors,
      coverImage,
      department,
      program,
    } = body;

    // Validate required fields
    if (!title || !abstract || !yearOfSubmission) {
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
          language,
          keywords,
          yearOfSubmission: parseInt(yearOfSubmission),
          authors: JSON.stringify(authors || []),
          advisors: JSON.stringify(advisors || []),
          coverImage,
          department,
          program,
          recommendations: 0,
          created_at: new Date().toISOString(),
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
