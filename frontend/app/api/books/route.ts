/*
System: Suno Automation
Module: Books API Route (Legacy)
Purpose: Backward compatibility wrapper for thesis data using old Books interface
*/

import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

// GET /api/books - Get all books
export async function GET() {
  console.log("📚 Starting GET /api/books request...");

  try {
    // Query from correct tables: tblthesis with tblprofiles
    console.log("🔍 Fetching thesis data from Supabase...");
    const { data: rawThesis, error } = await supabase
      .from("tblthesis")
      .select(`
        ths_id,
        ths_title,
        ths_abstract,
        ths_department,
        ths_submitted_date,
        ths_publication_date,
        ths_keywords,
        ths_file_url,
        ths_doi,
        ths_created_at,
        tblprofiles (
          prf_name,
          prf_email,
          prf_department,
          prf_degree_program,
          prf_image_url
        )
      `)
      .order("ths_publication_date", { ascending: false, nullsFirst: false });

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

    // Transform thesis data to match Book interface for backward compatibility
    const books =
      rawThesis?.map((thesis) => {
        const publicationYear = thesis.ths_publication_date
          ? new Date(thesis.ths_publication_date).getFullYear()
          : thesis.ths_submitted_date
          ? new Date(thesis.ths_submitted_date).getFullYear()
          : new Date().getFullYear();

        // Extract profile data (handle both object and array cases)
        const profile = Array.isArray(thesis.tblprofiles)
          ? thesis.tblprofiles[0]
          : thesis.tblprofiles;

        return {
          id: thesis.ths_id,
          title: thesis.ths_title,
          abstract: thesis.ths_abstract || "",
          degreeAwarded: publicationYear,
          keywords: thesis.ths_keywords
            ? (typeof thesis.ths_keywords === 'string'
              ? thesis.ths_keywords.split(', ')
              : Array.isArray(thesis.ths_keywords)
              ? thesis.ths_keywords
              : [])
            : [],
          authors: profile?.prf_name || "Unknown Author",
          advisors: ["N/A"], // Not stored in current schema
          department: thesis.ths_department || profile?.prf_department || "",
          program: profile?.prf_degree_program || "",
          coverImage: profile?.prf_image_url || "/defaults/defaultBookCover.png",
          recommendations: 0, // Not tracked in current schema
          language: "English", // Default value
          created_at: thesis.ths_created_at,
        };
      }) || [];

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

// POST /api/books - Create a new book (creates profile and thesis)
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
      email,
      affiliation,
      thesis_document_url,
    } = body;

    // Validate required fields
    if (!title || !firstName || !lastName) {
      return NextResponse.json(
        { success: false, error: "Missing required fields (title, firstName, lastName)" },
        { status: 400 },
      );
    }

    // First, create or find the profile
    const authorName = [firstName, middleName, lastName].filter(Boolean).join(" ");

    // Check if profile exists
    const { data: existingProfile } = await supabase
      .from("tblprofiles")
      .select("prf_id")
      .eq("prf_name", authorName)
      .single();

    let profileId;

    if (existingProfile) {
      profileId = existingProfile.prf_id;
    } else {
      // Create new profile
      const { data: newProfile, error: profileError } = await supabase
        .from("tblprofiles")
        .insert([
          {
            prf_name: authorName,
            prf_email: email,
            prf_affiliation: affiliation,
            prf_department: department,
            prf_degree_program: program,
          },
        ])
        .select()
        .single();

      if (profileError) {
        console.error("Error creating profile:", profileError);
        return NextResponse.json(
          { success: false, error: "Failed to create author profile", details: profileError.message },
          { status: 500 },
        );
      }

      profileId = newProfile.prf_id;
    }

    // Create thesis record
    const publicationDate = degreeAwarded
      ? new Date(degreeAwarded, 0, 1).toISOString().split('T')[0]
      : new Date().toISOString().split('T')[0];

    const { data: thesis, error: thesisError } = await supabase
      .from("tblthesis")
      .insert([
        {
          ths_prf_id: profileId,
          ths_title: title,
          ths_abstract: abstract,
          ths_department: department,
          ths_publication_date: publicationDate,
          ths_keywords: Array.isArray(keywords)
            ? keywords.join(", ")
            : keywords || "",
          ths_file_url: thesis_document_url,
        },
      ])
      .select()
      .single();

    if (thesisError) {
      console.error("Error creating thesis:", thesisError);
      return NextResponse.json(
        { success: false, error: "Failed to create thesis", details: thesisError.message },
        { status: 500 },
      );
    }

    // Return in Book format for compatibility
    const bookResponse = {
      id: thesis.ths_id,
      title: thesis.ths_title,
      abstract: thesis.ths_abstract,
      degreeAwarded: new Date(thesis.ths_publication_date).getFullYear(),
      keywords: thesis.ths_keywords ? thesis.ths_keywords.split(", ") : [],
      authors: authorName,
      advisors: ["N/A"],
      department: thesis.ths_department,
      program: program,
      coverImage: "/defaults/defaultBookCover.png",
      recommendations: 0,
      language: "English",
      created_at: thesis.ths_created_at,
    };

    return NextResponse.json({
      success: true,
      data: bookResponse,
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
