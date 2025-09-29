/*
System: Suno Automation
Module: Books Search API Route (Legacy)
Purpose: Backward compatibility wrapper for thesis search using old Books interface
*/

import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

// POST /api/books/search - Search books with filters
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { filterAndSearchQuery, year, departments, programs } = body;

    console.log("🔍 Starting book search with params:", {
      filterAndSearchQuery,
      year,
      departments,
      programs,
    });

    // Build the query for tblthesis with tblprofiles
    let query = supabase.from("tblthesis").select(`
      ths_id,
      ths_title,
      ths_abstract,
      ths_department,
      ths_submitted_date,
      ths_publication_date,
      ths_keywords,
      ths_file_url,
      ths_created_at,
      tblprofiles (
        prf_name,
        prf_email,
        prf_department,
        prf_degree_program,
        prf_image_url
      )
    `);

    // Apply text search filter
    if (filterAndSearchQuery) {
      const searchTerm = `%${filterAndSearchQuery}%`;
      // Search in thesis fields
      query = query.or(
        `ths_title.ilike.${searchTerm},ths_abstract.ilike.${searchTerm},ths_keywords.ilike.${searchTerm}`
      );
    }

    // Apply year filter
    if (year) {
      const startDate = new Date(year, 0, 1).toISOString().split('T')[0];
      const endDate = new Date(year, 11, 31).toISOString().split('T')[0];

      query = query
        .gte("ths_publication_date", startDate)
        .lte("ths_publication_date", endDate);
    }

    // Apply department filter
    if (departments && departments.length > 0) {
      query = query.in("ths_department", departments);
    }

    // Sort by publication date in descending order (newest first)
    query = query.order("ths_publication_date", { ascending: false, nullsFirst: false });

    const { data: rawThesis, error } = await query;

    if (error) {
      console.error("❌ Supabase error:", error);
      return NextResponse.json(
        {
          success: false,
          error: "Search failed",
          details: error.message,
        },
        { status: 500 },
      );
    }

    // Apply additional filters that require post-processing
    let filteredThesis = rawThesis || [];

    // Filter by author name if search query is provided
    if (filterAndSearchQuery && filteredThesis.length > 0) {
      const searchLower = filterAndSearchQuery.toLowerCase();
      filteredThesis = filteredThesis.filter((thesis: any) => {
        const authorName = thesis.tblprofiles?.prf_name?.toLowerCase() || "";
        return (
          thesis.ths_title?.toLowerCase().includes(searchLower) ||
          thesis.ths_abstract?.toLowerCase().includes(searchLower) ||
          thesis.ths_keywords?.toLowerCase().includes(searchLower) ||
          authorName.includes(searchLower)
        );
      });
    }

    // Filter by program (from profile data)
    if (programs && programs.length > 0) {
      filteredThesis = filteredThesis.filter((thesis: any) =>
        thesis.tblprofiles?.prf_degree_program &&
        programs.includes(thesis.tblprofiles.prf_degree_program)
      );
    }

    console.log("🔍 Search results:", filteredThesis.length, "thesis found");

    // Transform thesis data to match Book interface
    const books = filteredThesis.map((thesis: any) => {
      const publicationYear = thesis.ths_publication_date
        ? new Date(thesis.ths_publication_date).getFullYear()
        : thesis.ths_submitted_date
        ? new Date(thesis.ths_submitted_date).getFullYear()
        : new Date().getFullYear();

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
        authors: thesis.tblprofiles?.prf_name || "Unknown Author",
        advisors: ["N/A"],
        department: thesis.ths_department || thesis.tblprofiles?.prf_department || "",
        program: thesis.tblprofiles?.prf_degree_program || "",
        coverImage: thesis.tblprofiles?.prf_image_url || "/defaults/defaultBookCover.png",
        recommendations: 0,
        language: "English",
        created_at: thesis.ths_created_at,
      };
    });

    console.log(`✅ Successfully returned ${books.length} books`);
    return NextResponse.json({
      success: true,
      data: books,
      count: books.length,
      message: "Search completed successfully",
    });
  } catch (error) {
    console.error("💥 Unexpected error in book search:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Search failed",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}